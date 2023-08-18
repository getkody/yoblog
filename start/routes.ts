/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Post from 'App/Models/Post'
import { marked } from 'marked';

// ********************************************************************************
// Be sure to look at `requirements.md` to undestand what this application should do.
// ********************************************************************************

Route.get('/', async ({ view }) => {
    const posts = await Post.query()
        .where('public', '=', true)
        .orderBy('createdAt', 'desc')
        .preload('user')
    
    const lastest_post = posts[0]
    const [, ...older_posts] = posts

    return view.render('index', {
        markdown: marked,
        latest_post: lastest_post,
        older_posts: older_posts,
    })
}).as('root')

Route.get('/sign-up', 'AuthController.signUp').as('auth.sign-up')

Route.post('/sign-up', 'AuthController.signUpPost').as('auth.sign-up.post')

Route.get('/login', 'AuthController.login').as('auth.login')

Route.post('/login', 'AuthController.loginPost').as('auth.login.post')

Route.group(() => {
    Route.post('/logout', 'AuthController.logout').as('auth.logout')

    Route.get('/dashboard', 'AuthController.dashboard').as('auth.dashboard')

    Route.get('/profile', 'AuthController.profile').as('auth.profile')

    Route.post('/profile', 'AuthController.profilePost').as('auth.profile.post')

    Route.resource('/users', 'UsersController').except(['show']).as('users')

    Route.resource('/posts', 'PostsController').except(['show']).as('posts')

    Route.resource('/comments', 'CommentsController').except(['store']).as('comments')
}).middleware(['auth', 'active'])

Route.resource('/users', 'UsersController').only(['show']).as('users')
Route.resource('/posts', 'PostsController').only(['show']).as('posts')
Route.resource('/comments', 'CommentsController').only(['store']).as('comments')