import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Category from './category.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import SubCategory from './sub_category.js'
import Level from './level.js'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description?: string

  @column()
  declare path: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Category, {
    localKey: 'id',
    pivotForeignKey: 'book_id',
    pivotTable: 'book_category',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'category_id',
  })
  declare categories: ManyToMany<typeof Category>

  @manyToMany(() => SubCategory, {
    localKey: 'id',
    relatedKey: 'id',
    pivotTable: 'book_sub_category',
    pivotForeignKey: 'book_id',
    pivotRelatedForeignKey: 'sub_category_id',
  })
  declare subCategories: ManyToMany<typeof SubCategory>

  @manyToMany(() => Level, {
    localKey: 'id',
    pivotTable: 'book_level',
    pivotForeignKey: 'book_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'level_id',
  })
  declare levels: ManyToMany<typeof Level>
}
