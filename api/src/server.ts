import env from './env'
import { Application } from './app'

const application = new Application()
application.app.listen(env.PORT, async () => {
  console.log('Port %s', env.PORT)
})

export default application
