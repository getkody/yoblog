import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Comment from 'App/Models/Comment'

export default class CommentPolicy extends BasePolicy {
	public async viewList() {
		return true
	}

	public async view(user: User, comment: Comment) {
		return user.admin || user.id == comment.post.userId
	}

	public async create() {
		return true
	}

	public async update(user: User, comment: Comment) {
		return user.admin || user.id == comment.post.userId
	}

	public async delete(user: User, comment: Comment) {
		return user.admin || user.id == comment.post.userId
	}
}