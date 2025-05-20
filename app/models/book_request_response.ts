import { DateTime } from 'luxon'
import { BaseModel, column , belongsTo , hasMany} from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import BookRequest from './book_request.js'
import User from './user.js'

export default class BookRequestResponse extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare message:string

  @column()  
  declare status: 'pending' | 'approved' | 'rejected'
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => BookRequest)
  declare BookRequest: BelongsTo<typeof BookRequest>

  @belongsTo(() => User)
  declare User: BelongsTo<typeof User>



}