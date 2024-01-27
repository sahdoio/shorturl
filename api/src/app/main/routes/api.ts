import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeShortenUrlController } from '../factories/controllers/task/shorten-url'


export default (router: Router): void => {
  router.post('/shorten', adaptRoute(makeShortenUrlController()))
}

