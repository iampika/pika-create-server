import 'dotenv/config'

import { log } from 'console'

import createApp from './app'
import { PORT } from './config'

const mount = async (): Promise<void> => {
  const app = createApp()

  app.listen(PORT)

  log(`\n🚀 Server ready at http://localhost:${PORT}\n`)
}

mount()
