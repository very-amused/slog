import { LogLevels } from '../data.js'

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

function pad(n: number, len = 2): string {
  return n.toString().padStart(len, '0')
}

/* @internal Format a message with timestamp and log priority */
function formatMessage(message: string, logLevel: LogLevels): string {
  const d = new Date()
  const timestamp = `${months[d.getMonth()]} ${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}:${pad(d.getMilliseconds(), 3)}`
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