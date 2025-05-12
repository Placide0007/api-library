import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'book_level'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('book_id').unsigned().references('id').inTable('books').onDelete('CASCADE')
      table.integer('level_id').unsigned().references('id').inTable('levels').onDelete('CASCADE')

      table.primary(['book_id', 'level_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
