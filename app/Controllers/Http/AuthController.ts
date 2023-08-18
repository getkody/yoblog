import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import Post from 'App/Models/Post'
import Comment from 'App/Models/Comment'

export default class AuthController {

    public async signUp({ view }: HttpContextContract) {
        return view.render('users/edit', {
            action: Route.makeUrl('auth.sign-up.post'),
            user: {
                firstName: '',
                lastName: '',
                email: '',
            }
        })
    }

    public async signUpPost({ auth, request, response }: HttpContextContract) {
        const userSchema = schema.create({
            firstName: schema.string({ trim: true }, [
                rules.minLength(2)
            ]),
            lastName: schema.string({ trim: true }, [
                rules.minLength(2)
            ]),
            email: schema.string({ trim: true }, [
                rules.email(),
            ]),
            password: schema.string({}, [
                rules.confirmed(),
                rules.minLength(4)
            ]),
        })

        const data = await request.validate({ schema: userSchema })

        const user = new User()

        user.fill(data)

        await user.save()

        await auth.login(user)

        return response.redirect().toRoute('auth.dashboard')
    }

    public async login({ view }: HttpContextContract) {
        return view.render('auth/login')
    }

    public async loginPost({ auth, request, session, response }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')
      
        try {
            await auth.use('web').attempt(email, password)

            return response.redirect().toRoute('auth.dashboard')
        } catch {
            session.flash('errors', ['Your email, or password is incorrect.'])

            return response.redirect().back()
        }
    }

    public async logout({ auth, response }: HttpContextContract) {
        await auth.use('web').logout()
        
        response.redirect().toRoute('auth.login')
    }

    public async dashboard({ auth, view, response }: HttpContextContract) {
        if (!auth.user) {
            return response.notFound()
        }

        let usersCount: number, postsCount: number, commentsCount: number

        if (auth.user.admin) {
            usersCount = (
                await User
                    .query()
                    .count('*')
                    .first()
            )?.$extras.count

            postsCount = (
                await Post
                    .query()
                    .count('*')
                    .first()
                )?.$extras.count

            commentsCount = (
                await Comment
                    .query()
                    .count('*')
                    .first()
            )?.$extras.count    
        } else {
            usersCount = 0

            postsCount = (await Post
                .query()
                .where('userId', auth.user.id)
                .count('*')
                .first()
            )?.$extras.count

            commentsCount = (await Comment
                .query() 
                .whereHas('post', (q) => {
                    if (auth.user) {
                        q.where('userId', auth.user.id)
                    }
                })
                .count('*')
                .first()
            )?.$extras.count
        }

        return view.render('auth/dashboard', {
            usersCount: usersCount,
            postsCount: postsCount,
            commentsCount: commentsCount,
        })
    }

    public async profile({ auth, view }: HttpContextContract) {
        return view.render('users/edit', {
            action: Route.makeUrl('auth.profile.post'),
            user: auth.user
        })
    }

    public async profilePost({ auth, request, session, response }: HttpContextContract) {
        const userSchema = schema.create({
            firstName: schema.string({ trim: true }, [
                rules.minLength(2),
            ]),
            lastName: schema.string({ trim: true }, [
                rules.minLength(2),
            ]),
            email: schema.string({ trim: true }, [
                rules.email(),
                rules.unique({
                    table: 'users',
                    column: 'email',
                    caseInsensitive: true,
                    whereNot: {
                        id: auth.user?.id
                    },
                }),
            ]),
            password: schema.string.optional({}, [
                rules.confirmed(),
                rules.minLength(4),
            ]),
            bio: schema.string.nullable(),
        })
    
        const data = await request.validate({ schema: userSchema })

        await auth.user?.merge({
            lastName: data.lastName,
            firstName: data.firstName,
            email: data.email,
            password: data.password !== null ? data.password : auth.user.password,
            bio: data.bio,
        }).save()

        session.flash('messages', ['Saved successfully.'])

        return response.redirect().back()
    }
}