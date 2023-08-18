import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
	public async viewList(user: User) {
		return user.admin
	}

	public async view() {
		return true
	}

	public async create(user: User) {
		return user.admin
	}

	public async update(user: User, user_resource: User) {
		return user.admin || user.id == user_resource.id
	}

	public async delete(user: User, user_resource: User) {
		return user.admin || user.id == user_resource.id
	}
}