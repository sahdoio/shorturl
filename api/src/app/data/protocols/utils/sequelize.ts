import { Sequelize } from "sequelize-typescript"

export interface ISequelizeORM {
    testConnection: () => Promise<void>
    getClient: () => Promise<Sequelize>
}
  