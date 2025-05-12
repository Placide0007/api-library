import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sub_categories'

  async up() {
    this.schema.table(this.tableName, (table) => {
      table.integer('category_id').unsigned().notNullable()
      table.foreign('category_id').references('id').inTable('categories').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropForeign('category_id')
      table.dropColumn('category_id')
    })
  }
}
