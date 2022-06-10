import { LogLevels } from '../log-levels.js'

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

/* Format a message with timestamp and log priority */
function formatMessage(message: string, logLevel: LogLevels): string {
  const d = new Date()
  const timestamp = `${months[d.getMonth()]} ${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`
  return `[${timestamp}] [${logLevel}] ${message}`
}

/* Log a message to the server console */
export function log(message: string, logLevel: LogLevels): void {
  const m = formatMessage(message, logLevel)

  switch (logLevel) {
  case LogLevels.Info:
    console.log(m)
    break
  case LogLevels.Warning:
    console.warn(m)
    break
  case LogLevels.Error:
    console.error(m)
    break
  case LogLevels.Debug:
    console.debug(m)
    break
  }
}