import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import Category from './category.js'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Book from './book.js'

export default class SubCategory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => Category, {
    foreignKey: 'category_id',
  })
  declare cateroy: BelongsTo<typeof Category>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Book, {
    localKey: 'id',
    pivotForeignKey: 'sub_category_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'book_id',
    pivotTable: 'book_sub_category',
  })
  declare books: ManyToMany<typeof Book>
}
