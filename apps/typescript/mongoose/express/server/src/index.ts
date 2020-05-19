import 'dotenv/config'

import { log } from 'console'

import createApp from './app'
import {
  connectDatabase,
  PORT,
} from './config'

const mount = async (): Promise<void> => {
  try {
    await connectDatabase()

    const app = await createApp()

    app.listen(PORT)

    log(`\n🚀 Server ready at http://localhost:${PORT}\n`)
  } catch (err) {
    log(`\n❌ ${err.message}\n`)
  }
}

mount()
