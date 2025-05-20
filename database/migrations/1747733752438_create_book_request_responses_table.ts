import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'book_request_responses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('message').notNullable()
      table.enum('status', ['pending' , 'approved' , 'rejected']).notNullable().defaultTo('pending');
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}