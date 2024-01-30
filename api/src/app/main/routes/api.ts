import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeShortenUrlController } from '../factories/controllers/url/shorten-url'
import { makeTopTrendingController } from '../factories/controllers/trending/top-trending'
import { makeGetUrlController } from '../factories/controllers/url/get-url'


export default (router: Router): void => {
  router.post('/shorten', adaptRoute(makeShortenUrlController()))
  router.get('/top-trending', adaptRoute(makeTopTrendingController()))
  router.get('/get-url/:hash', adaptRoute(makeGetUrlController()))
}

