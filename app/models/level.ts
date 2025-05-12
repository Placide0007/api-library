import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Book from './book.js'

export default class Level extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare name: string

  @manyToMany(() => Book, {
    localKey: 'id',
    pivotForeignKey: 'level_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'book_id',
    pivotTable: 'book_level',
  })
  declare books: ManyToMany<typeof Book>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
