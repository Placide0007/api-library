import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column , hasMany} from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import BookRequest from './book_request.js'
import BookRequestResponse from './book_request_response.js'


const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare username: string

  @column()
  declare lastname:string

  @column()
  declare firstname:string

  @column()
  declare codage: number

  @column()
  declare role: 'student' | 'admin' | 'professor'

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @hasMany(() => BookRequest)
  declare BookRequest: HasMany<typeof BookRequest>

  @hasMany(() => BookRequestResponse)
  declare BookRequestResponse: HasMany<typeof BookRequestResponse>

}




  


