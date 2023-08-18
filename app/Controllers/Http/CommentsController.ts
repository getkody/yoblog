import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Route from '@ioc:Adonis/Core/Route'
import Comment from 'App/Models/Comment'
import Post from 'App/Models/Post'

export default class CommentsController {
    public async index({ bouncer, auth, view }: HttpContextContract) {
        await bouncer.with('CommentPolicy').authorize('viewList')

        const comments = await this.all(auth.user)

        return view.render('components.index', {
            title: 'Comments',
            routeNamePrefix: 'comments',
            rows: comments,
            fields: [
                {
                    label: 'Post',
                    field: 'postId',
                    onValue: (comment: Comment) => '<a href="' + Route.makeUrl('posts.show', {id: comment.post.id}) + '">' + comment.post.title + '</a>',
                },
                {label: 'Name', field: 'name'},
                {label: 'Content', field: 'content'},
            ],
        })
    }

    public async create({ bouncer, view }: HttpContextContract) {
        await bouncer.with('CommentPolicy').authorize('create')
        
        return view.render('comments/edit', {
            action: Route.makeUrl('comments.store'),
            posts: await Post.all(),
            comment: {
                postId: '',
                name: '',
                content: '',
            }
        })
    }

    public async store({ bouncer, request, session, response }: HttpContextContract) {
        await bouncer.with('CommentPolicy').authorize('create')
        
        const commentSchema = schema.create({
            postId: schema.number([
                rules.exists({ table: 'posts', column: 'id' })
            ]),
            name: schema.string({}, [
            ]),
            content: schema.string({}, [
            ]),
        })

        const data = await request.validate({ schema: commentSchema })

        const comment = new Comment()

        comment.fill(data)

        await comment.save()

        session.flash('messages', ['Saved successfully.'])

        if (request.input('redirectBack') ?? false) {
            return response.redirect().back()
        } else {
            return response.redirect().toRoute('comments.index')
        }
    }

    public async show({ bouncer, auth, params, view, response }: HttpContextContract) {
        const comment = await this.find(params.id, auth.user)

        if (!comment) {
            return response.notFound()
        }

        await bouncer.with('CommentPolicy').authorize('view', comment)

        await comment.load('post')

        return view.render('comments/show',  {comment: comment})
    }

    public async edit({ bouncer, auth, params, view, response }: HttpContextContract) {
        const comment = await this.find(params.id, auth.user)

        if (!comment) {
            return response.notFound()
        }

        await bouncer.with('CommentPolicy').authorize('update', comment)

        await comment.load('post')

        return view.render('comments/edit',  {
            action: Route.makeUrl('comments.update', {id: comment.id}, {qs: {
                _method: 'PUT'
            }}),
            posts: await Post.all(),
            comment: comment
        })
    }

    public async update({ bouncer, auth, params, request, session, response}: HttpContextContract) {
        const comment = await this.find(params.id, auth.user)

        if (!comment) {
            return response.notFound()
        }

        await bouncer.with('CommentPolicy').authorize('update', comment)

        const commentSchema = schema.create({
            postId: schema.number([
                rules.exists({ table: 'posts', column: 'id' })
            ]),
            name: schema.string({}, [
            ]),
            content: schema.string({}, [
            ]),
        })

        const data = await request.validate({ schema: commentSchema })

        await comment.merge({
            postId: data.postId,
            name: data.name,
            content: data.content,
        }).save()

        session.flash('messages', ['Saved successfully.'])

        return response.redirect().back()
    }

    public async destroy({ bouncer, auth, params, session, response}: HttpContextContract) {
        const comment = await this.find(params.id, auth.user)

        if (!comment) {
            return response.notFound()
        }

        await bouncer.with('CommentPolicy').authorize('delete', comment)

        await comment.delete()

        session.flash('messages', ['Deleted successfully.'])

        return response.redirect().back()
    }

    private async find(id, auth_user)
    {
        return await Comment
            .query() 
            .whereHas('post', (q) => {
                if (auth_user && !auth_user.admin) {
                    q.where('userId', auth_user.id)
                }
            })
            .preload('post')
            .where('id', id)
            .first()
    }

    private async all(auth_user)
    {
        return await Comment
        .query() 
        .whereHas('post', (q) => {
            if (auth_user && !auth_user.admin) {
                q.where('userId', auth_user.id)
            }
        })
        .preload('post')
    }
}