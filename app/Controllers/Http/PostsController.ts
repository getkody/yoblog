import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Route from '@ioc:Adonis/Core/Route'
import Post from 'App/Models/Post'
import User from 'App/Models/User'
import Drive from '@ioc:Adonis/Core/Drive'
import { marked } from 'marked';

export default class PostsController {
    public async index({ bouncer, auth, view }: HttpContextContract) {
        await bouncer.with('PostPolicy').authorize('viewList')

        const posts = await this.all(auth.user)

        return view.render('components.index', {
            title: 'Posts',
            routeNamePrefix: 'posts',
            rows: posts,
            fields: [
                auth.user?.admin ? {
                    label: 'User',
                    field: 'userId',
                    onValue: (post: Post) => '<a href="' + Route.makeUrl('users.show', {id: post.user.id}) + '">' + post.user.name() + '</a>',
                } : null,
                {label: 'Public', field: 'public'},
                {label: 'Title', field: 'title'},
                {
                    label: 'Image',
                    field: 'image',
                    onValue: (post: Post) => `<img src="/uploads/${post.image}" class="img-fluid" style="max-height: 100px;"/>`
                },
                {
                    label: 'Content',
                    field: 'content',
                    onValue: (post: Post) => marked(post.content?.substring(0, 200) + '...', {ghf: true})
                },
            ],
        })
    }

    public async create({ bouncer, view }: HttpContextContract) {
        await bouncer.with('PostPolicy').authorize('create')

        return view.render('posts/edit', {
            action: Route.makeUrl('posts.store'),
            users: await User.all(),
            post: {
                userId: '',
                public: '',
                title: '',
                image: '',
                content: '',
            }
        })
    }

    public async store({ bouncer, auth, request, session, response }: HttpContextContract) {
        await bouncer.with('PostPolicy').authorize('create')

        const postSchema = schema.create({
            userId: auth.user?.admin ? schema.number([
                rules.exists({ table: 'users', column: 'id' })
            ]) : schema.number.optional(),
            public: schema.boolean(),
            title: schema.string({}, [
                rules.minLength(4),
            ]),
            image: schema.file.optional({}, [
            ]),
            content: schema.string.nullable({}, [
            ]),
        })

        const data = await request.validate({ schema: postSchema })

        const post = new Post()

        post.fill({
            userId: auth.user?.admin ? data.userId : auth.user?.id,
            public: data.public,
            title: data.title,
            image: data.image?.clientName ?? null,
            content: data.content,
        })

        await post.save()

        if (data.image && !(await Drive.exists(data.image.clientName))) {
            await data.image.moveToDisk('./', {name: data.image.clientName})
        }

        session.flash('messages', ['Saved successfully.'])

        return response.redirect().toRoute('posts.index')
    }

    public async show({ bouncer, params, view, response }: HttpContextContract) {
        const post = await Post.query().preload('user').where('id', params.id).first()

        if (!post) {
            return response.notFound()
        }

        await bouncer.with('PostPolicy').authorize('view')

        await post.load('comments')

        return view.render('posts/show',  {
            markdown: marked,
            post: post,
            comment_action: Route.makeUrl('comments.store'),
        })
    }

    public async edit({ bouncer, auth, params, view, response }: HttpContextContract) {
        const post = await this.find(params.id, auth.user)

        if (!post) {
          return response.notFound()
        }

        await bouncer.with('PostPolicy').authorize('update', post)

        return view.render('posts/edit',  {
            users: await User.all(),
            action: Route.makeUrl('posts.update', {id: post.id}, {qs: {
                _method: 'PUT'
            }}),
            post: post
        })
    }

    public async update({ bouncer, auth, params, request, session, response}: HttpContextContract) {
        const post = await this.find(params.id, auth.user)

        if (!post) {
          return response.notFound()
        }
  
        await bouncer.with('PostPolicy').authorize('update', post)
        
        const postSchema = schema.create({
            userId: auth.user?.admin ? schema.number([
                rules.exists({ table: 'users', column: 'id' })
            ]) : schema.number.optional(),
            public: schema.boolean(),
            title: schema.string({}, [
                rules.minLength(4),
            ]),
            image: schema.file.optional({}, [
            ]),
            delete_image: schema.string.optional({}, [
                rules.equalTo('on')
            ]),
            content: schema.string.nullable({}, [
            ]),
        })

        const data = await request.validate({ schema: postSchema })

        await post.merge({
            userId: auth.user?.admin ? data.userId : auth.user?.id,
            public: data.public,
            title: data.title,
            image: data.image ? data.image.clientName : post.image,
            content: data.content,
        }).save()

        if (data.image && !(await Drive.exists(data.image.clientName))) {
            await data.image.moveToDisk('./', {name: data.image.clientName})
        }

        if (request.input('delete_image')) {
            if (post.image !== null && await Drive.exists(post.image)) {
                await Drive.delete(post.image)

                post.image = null

                await post.save()
            }
        }

        session.flash('messages', ['Saved successfully.'])

        return response.redirect().back()
    }

    public async destroy({ bouncer, auth, params, session, response}: HttpContextContract) {
        const post = await this.find(params.id, auth.user)

        if (!post) {
            return response.notFound()
        }

        await bouncer.with('PostPolicy').authorize('delete', post)

        await post.delete()

        if (post.image) {
            if (await Drive.exists(post.image)) {
            await Drive.delete(post.image)
            }
        }

        session.flash('messages', ['Deleted successfully.'])

        return response.redirect().back()
    }

    private async find(id, auth_user)
    {
        return await Post
            .query()
            .where((q) => {
                if (auth_user && !auth_user.admin) {
                    q.where('userId', auth_user.id)
                    
                }
            })
            .where('id', id)
            .preload('user')
            .first()
    }

    private async all(auth_user)
    {
        return await Post
            .query()
            .where((q) => {
                if (auth_user && !auth_user.admin) {
                    q.where('userId', auth_user.id)
                }
            })
            .preload('user')
    }
}