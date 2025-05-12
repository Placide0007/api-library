import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Category from './category.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

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
}
