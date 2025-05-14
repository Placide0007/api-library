import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Book from './book.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import SubCategory from './sub_category.js'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare name: string

  @manyToMany(() => Book, {
    localKey: 'id',
    relatedKey: 'id',
    pivotTable: 'book_category',
    pivotForeignKey: 'category_id',
    pivotRelatedForeignKey: 'book_id',
  })
  declare books: ManyToMany<typeof Book>

  @hasMany(() => SubCategory, {
    localKey: 'id',
    foreignKey: 'category_id',
  })
  declare subCategories: HasMany<typeof SubCategory>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
