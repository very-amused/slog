import { createServer, type ServerOptions } from 'https'
import { readFileSync, readdirSync } from 'fs'
import { LogLevels, LogLevelHeader } from '../data.js'
import { log } from './log.js'

// Must contain *cert.pem and *privkey.pem
const certsDir = process.env['SLOG_CERTS_DIR'] || '~/.certs'

let key: Buffer|null = null,
  cert: Buffer|null = null

// Use the first files in $SLOG_CERTS_DIR that end in privkey.pem and cert.pem for TLS
for (const file of readdirSync(certsDir)) {
  if (file.endsWith('privkey.pem') && key === null) {
    key = readFileSync(file)
  } else if (file.endsWith('cert.pem') && cert === null) {
    cert = readFileSync(file)
  }
}
if (key === null || cert === null) {
  throw new ReferenceError(`Unable to find *privkey.pem and *cert.pem in ${certsDir}`)
}

const options: ServerOptions = {
  key,
  cert
}


createServer(options, async (req, res) => {
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
})

