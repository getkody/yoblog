import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import { marked } from 'marked';

export default class UsersController {
    public async index({ bouncer, view }: HttpContextContract) {
        await bouncer.with('UserPolicy').authorize('viewList')

        const users = await User.all()

        return view.render('components.index', {
            title: 'Users',
            routeNamePrefix: 'users',
            rows: users,
            fields: [
                {label: 'Active', field: 'active'},
                {label: 'Admin', field: 'admin'},
                {label: 'First Name', field: 'firstName'},
                {label: 'Last Name', field: 'lastName'},
                {label: 'Email', field: 'email'},
            ],
        })
    }

    public async create({ bouncer, view }: HttpContextContract) {
        await bouncer.with('UserPolicy').authorize('create')

        return view.render('users/edit', {
            action: Route.makeUrl('users.store'),
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                password_confirmation: '',
                bio: '',
            }
        })
    }

    public async store({ bouncer, request, session, response }: HttpContextContract) {
        await bouncer.with('UserPolicy').authorize('create')

        const userSchema = schema.create({
            active: schema.boolean(),
            admin: schema.boolean(),
            firstName: schema.string({ trim: true }, [
                rules.minLength(2)
            ]),
            lastName: schema.string({ trim: true }, [
                rules.minLength(2)
            ]),
            email: schema.string({ trim: true }, [
                rules.email(),
                rules.unique({
                table: 'users',
                column: 'email',
                caseInsensitive: true,
                }),
            ]),
            password: schema.string({}, [
                rules.confirmed(),
                rules.minLength(4)
            ]),
            bio: schema.string.nullable(),
        })

        const data = await request.validate({ schema: userSchema })

        const user = new User()

        user.fill(data)

        await user.save()

        session.flash('messages', ['Saved successfully.'])

        return response.redirect().toRoute('users.index')
    }

    public async show({ bouncer, params, view, response }: HttpContextContract) {
        const user = await User.find(params.id)

        if (!user) {
            return response.notFound()
        }

        await bouncer.with('UserPolicy').authorize('view')
        
        return view.render('users/show',  {
            markdown: marked,
            user: user
        })
    }

    public async edit({ bouncer, params, view, response }: HttpContextContract) {
        const user = await User.find(params.id)

        if (!user) {
            return response.notFound()
        }

        await bouncer.with('UserPolicy').authorize('update', user)

        return view.render('users/edit',  {
            action: Route.makeUrl('users.update', {id: user.id}, {qs: {
                _method: 'PUT'
            }}),
            user: user
        })
    }

    public async update({ bouncer, params, request, session, response}: HttpContextContract) {
        const user = await User.find(params.id)

        if (!user) {
            return response.notFound()
        }

        await bouncer.with('UserPolicy').authorize('update', user)

        const userSchema = schema.create({
            active: schema.boolean(),
            admin: schema.boolean(),
            firstName: schema.string({ trim: true }, [
                rules.minLength(2)
            ]),
            lastName: schema.string({ trim: true }, [
                rules.minLength(2)
            ]),
            email: schema.string({ trim: true }, [
                rules.email(),
                rules.unique({
                table: 'users',
                column: 'email',
                caseInsensitive: true,
                whereNot: {
                    id: params.id
                },
                }),
            ]),
            password: schema.string.nullable({}, [
                rules.confirmed(),
                rules.minLength(4),
            ]),
            bio: schema.string.nullable(),
        })

        const data = await request.validate({ schema: userSchema })

        await user.merge({
            active: data.active,
            admin: data.admin,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password !== null ? data.password : user.password,
        }).save()

        session.flash('messages', ['Saved successfully.'])

        return response.redirect().back()
    }

    public async destroy({ bouncer, params, session, response}: HttpContextContract) {
        const user = await User.find(params.id)

        if (!user) {
            return response.notFound()
        }

        await bouncer.with('UserPolicy').authorize('delete', user)

        await user.delete()

        session.flash('messages', ['Deleted successfully.'])

        return response.redirect().back()
    }
}