import { log } from 'console'
import http from 'http'

import { PORT } from './config'

const httpServer = http.createServer((_req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  })

  res.write('<h1>Hello World</h1>')

  res.end()
})

httpServer.listen(PORT)

log(`\n🚀 Server ready at http://localhost:${PORT}\n`)
