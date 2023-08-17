import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('active').defaultTo(true)
      table.boolean('admin').defaultTo(false)
      table.string('first_name')
      table.string('last_name')
      table.string('email')
      table.string('password')
      table.text('bio').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.unique(['email'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}