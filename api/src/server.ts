import env from './env'
import { Application } from './app'
import { JobManager } from './app/main/jobs/JobManager'

const application = new Application()
const jobManager = new JobManager()
application.app.listen(env.PORT, async () => {
  console.log('Port %s', env.PORT)
  jobManager.run()
})

export default application
