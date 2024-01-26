import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoginController } from '../factories/controllers/auth/login'

export default (router: Router): void => {
  router.post('/auth/login', adaptRoute(makeLoginController()))
}
