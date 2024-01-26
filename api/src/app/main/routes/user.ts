import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCreateUserController } from '../factories/controllers/user/create-user'
import { makeAuthMiddleware } from '../factories/middlewares/auth'

export default (router: Router): void => {
  router.post('/users', 
    adaptMiddleware(makeAuthMiddleware(), true),
    adaptRoute(makeCreateUserController()))
}
''