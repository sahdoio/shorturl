import { Sequelize } from 'sequelize-typescript'
import Config from '../../../config/config'
import env from '../../../env'
import { ISequelizeORM } from '../../data/protocols/utils/sequelize'

export class SequelizeORM implements ISequelizeORM {
  private static instance: SequelizeORM

  public source: string = Config.DATABASE.SOURCE.DEFAULT
  public client: Sequelize

  private constructor() { }

  public static getInstance(source: string = Config.DATABASE.SOURCE.DEFAULT): SequelizeORM {
    if (!SequelizeORM.instance) {
      SequelizeORM.instance = new SequelizeORM()
      if (source) {
        SequelizeORM.instance.source = source
      }
      SequelizeORM.instance.client = new Sequelize({
        database: env.database[source].NAME,
        dialect: 'postgres',
        username: env.database[source].USERNAME,
        password: env.database[source].PASSWORD,
        host: env.database[source].HOST,
        port: parseInt(env.database[source].PORT),
        models: [__dirname + '/../database/entities'],
        repositoryMode: true,
        logging: false,
        query: { raw: true }
      })
    }
    return SequelizeORM.instance
  }

  public async testConnection(): Promise<void> {
    if (!SequelizeORM.instance) {
      await SequelizeORM.getInstance()
    }
    try {
      await SequelizeORM.instance.client.authenticate();
      console.log('[SequelizeORM][testConnection] Connection has been established successfully.')
    } catch (error) {
      console.error('[SequelizeORM][testConnection] Unable to connect to the database:', error)
    }
  }

  public async getClient(): Promise<Sequelize> {
    const instance = SequelizeORM.getInstance(this.source)
    return instance.client
  }
}
