import 'dotenv/config'

import { log } from 'console'

import createApp from './app'
import {
  connectDatabase,
  PORT,
} from './config'

const mount = async (): Promise<void> => {
  try {
    const db = await connectDatabase()

    const app = await createApp(db)

    app.listen(PORT)

    log(`\n🚀 Server ready at http://localhost:${PORT}\n`)
  } catch (err) {
    log('❌', err.message)
  }
}

mount()
