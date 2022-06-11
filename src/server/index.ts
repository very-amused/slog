import { config } from './config.js'
import { DefaultPort, LogLevels } from '../data.js'
import { server } from './server.js'
import { log } from './log.js'

// Port for the server to listen on
const port = config.port || DefaultPort

// Start the server
server.listen(port, () => {
  log(`Slog server listening on port ${port}`, LogLevels.Info)
})
