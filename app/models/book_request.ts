import { DateTime } from 'luxon'
import { BaseModel, column , belongsTo} from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class BookRequest extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title:string

  @column()
  declare status: 'pending' | 'approved' | 'rejected'

  @column()
  declare description:string 

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  
  @belongsTo(() => User)
  declare User: BelongsTo<typeof User>
}