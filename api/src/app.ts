import i18n from 'i18n'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, Request, Response, Router } from 'express'
import { readdirSync } from 'fs'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import env from './env'
import { StatusCodes } from 'http-status-codes'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

export class Application {
  public app: Express
  public readonly rootDir: string
  public readonly routesDir: string

  constructor(testing: boolean = false) {
    dotenv.config()
    this.rootDir = __dirname
    this.routesDir = path.join(this.rootDir, 'app', 'main', 'routes')

    this.setupDotEnv(testing)
    this.setupI18n()

    if (!testing) {
      this.app = express()
      this.setupMiddlewares()
      this.setupRoutes()
      this.setupSwagger()
    }
  }

  private setupDotEnv(testing: boolean = false): void {
    env.ENV = testing ? 'test' : process.env.NODE_ENV ?? 'production'
    env.PORT = process.env.APP_PORT
    env.database.DEFAULT = {
      DRIVER: process.env.DB_DRIVER,
      HOST: process.env.DB_HOST,
      PORT: process.env.DB_PORT,
      USERNAME: process.env.DB_USERNAME,
      PASSWORD: process.env.DB_PASSWORD,
      NAME: process.env.DB_NAME
    }
    env.database.TEST = {
      DRIVER: process.env.DB_TEST_DRIVER,
      HOST: process.env.DB_TEST_HOST,
      PORT: process.env.DB_TEST_PORT,
      USERNAME: process.env.DB_TEST_USERNAME,
      PASSWORD: process.env.DB_TEST_PASSWORD,
      NAME: process.env.DB_TEST_NAME
    }
  }

  private setupMiddlewares(): void {
    this.app.use(bodyParser.json())
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use((error, req, res, next) => {
      if (error instanceof SyntaxError) {
        res.status(StatusCodes.OK).json({
          msg: i18n.__('BAD_REQUEST')
        })
      } else {
        next()
      }
    })
  }

  private setupRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.send(`API is alive in ${process.env.NODE_ENV} environment`)
    })    
    const router = Router()
    this.app.use(env.ROUTE_ROOT, router)
    readdirSync(this.routesDir).map(async file => {
      if (!file.includes('.test.') && !file.includes('.spec.')) {
        (await import(path.join(this.routesDir, file))).default(router)
      }
    })
  }

  private setupSwagger(): void {
    const options = {
      definition: {
        info: {
          title: 'Task Manager API',
          version: '0.0.1'
        }
      },
      apis: ['./app/main/routes/*']
    }

    const swaggerSpec = swaggerJSDoc(options)
    this.app.use('/api-reference', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  }

  private setupI18n(): void {
    i18n.configure({
      locales: env.i18n.LOCALES,
      directory: path.join(this.rootDir, 'locales'),
      defaultLocale: env.i18n.DEFAULT_LOCALE
    })
  }
}
