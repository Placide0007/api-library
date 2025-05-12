import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'book_sub_category'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('book_id').unsigned().references('id').inTable('books').onDelete('CASCADE')
      table
        .integer('sub_category_id')
        .unsigned()
        .references('id')
        .inTable('sub_categories')
        .onDelete('CASCADE')

      table.primary(['book_id', 'sub_category_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
