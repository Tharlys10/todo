import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import User from './User'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public user_id: string

  @hasOne(() => User)
  public user: HasOne<typeof User>

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public finished: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(model: Task) {
    model.id = uuid()
  }
}
