import { createServer } from 'https'
import { readFileSync } from 'fs'
import { LogLevels, LogLevelHeader } from '../data.js'
import { log } from './log.js'
import { config } from './config.js'

// Load TLS certificate and key
const cert = readFileSync(`${config.certsDir}/fullchain.pem`)
const key = readFileSync(`${config.certsDir}/privkey.pem`)
if (key == null || cert == null) {
  throw new ReferenceError(`Unable to find privkey.pem and fullchain.pem in ${config.certsDir}`)
}

export const server = createServer({ key, cert }, async (req, res) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    // TODO: configurable CORS options
    res.setHeader('Access-Control-Allow-Origin', req.headers['origin'] || '*')
    res.setHeader('Access-Control-Allow-Headers', LogLevelHeader)
    res.setHeader('Access-Control-Allow-Methods', 'POST')
    res.writeHead(200)
    res.end()
    return
  }

  // Validate request method and content type
  if (req.method !== 'POST') {
    res.writeHead(405)
    res.end()
    return
  }
  if (req.headers['content-type'] !== 'text/plain') {
    res.writeHead(415)
    res.end()
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
  res.end()
})
