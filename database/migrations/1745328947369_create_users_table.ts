import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('username').primary()
      table.string('lastname').notNullable()
      table.string('firstname').notNullable()
      table.integer('codage').nullable().unique()
      table.enum('role', ['admin', 'professor', 'student']).notNullable().defaultTo('student')
      table.string('password').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}