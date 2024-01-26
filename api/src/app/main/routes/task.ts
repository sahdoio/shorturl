import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCreateTaskController } from '../factories/controllers/task/create-task'
import { makeDeleteTaskController } from '../factories/controllers/task/delete-task'
import { makeListTasksController } from '../factories/controllers/task/list-tasks'
import { makeUpdateTaskController } from '../factories/controllers/task/update-task'
import { makeAuthMiddleware } from '../factories/middlewares/auth'

export default (router: Router): void => {
  router.post('/tasks',
    adaptMiddleware(makeAuthMiddleware(), true),
    adaptRoute(makeCreateTaskController()))
  router.get('/tasks',
    adaptMiddleware(makeAuthMiddleware(), true),
    adaptRoute(makeListTasksController()))
  router.delete('/tasks/:taskId',
    adaptMiddleware(makeAuthMiddleware(), true),
    adaptRoute(makeDeleteTaskController()))
  router.patch('/tasks/:taskId',
    adaptMiddleware(makeAuthMiddleware(), true),
    adaptRoute(makeUpdateTaskController()))
}