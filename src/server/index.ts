import { createServer } from 'https'
import { readFileSync } from 'fs'
import { LogLevels, LogLevelHeader, DefaultPort } from '../data.js'
import { log } from './log.js'
// Dynamically import $cwd/slog.config.js
import * as path from 'node:path'
import type ServerConfig from '../../slog.config'
const config: typeof ServerConfig = (await import(path.resolve(process.cwd(), 'slog.config.js'))).default

// Port for the server to listen on
const port = config.port || DefaultPort

// Load TLS certificate and key
const cert = readFileSync(`${config.certsDir}/fullchain.pem`)
const key = readFileSync(`${config.certsDir}/privkey.pem`)
if (key == null || cert == null) {
  throw new ReferenceError(`Unable to find privkey.pem and fullchain.pem in ${config.certsDir}`)
}

createServer({ key, cert }, async (req, res) => {
  // Validate request method and content type
  if (req.method !== 'POST') {
    res.writeHead(405)
    return
  }
  if (req.headers['content-type'] !== 'text/plain') {
    res.writeHead(415)
    return
  }

  // Read log level
  const logLevel: LogLevels = req.headers[LogLevelHeader] as LogLevels || LogLevels.Info
  // TODO: validate log level header
  
  // Load request body
  const buffers = []
  for await (const buf of req) {
    buffers.push(buf)
  }
  const body = Buffer.concat(buffers).toString()

  // Log the message to the server console
  log(body, logLevel)
  res.writeHead(200)
}).listen(port, () => {
  log(`Slog server listening on port ${port}`, LogLevels.Info)
})
