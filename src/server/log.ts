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

/** @internal Color code string from number */
function ccode(n: number): string {
  return `\x1b[${n}m`
}

/** @internal Terminal foreground (text) color escape codes */
const ColorCodes = {
  Reset: ccode(0),

  Red: ccode(31),
  Green: ccode(32),
  Yellow: ccode(33),
  Blue: ccode(34),
  Magenta: ccode(35),
  Cyan: ccode(36),
  White: ccode(37)
}

/** @internal Shorthand function for zero-padding strings */
function pad(n: number, len = 2): string {
  return n.toString().padStart(len, '0')
}

/** @internal Format a message with timestamp and log priority */
function formatMessage(message: string, logLevel: LogLevels): string {
  const d = new Date()
  const timestamp = `${months[d.getMonth()]} ${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}:${pad(d.getMilliseconds(), 3)}`

  // Color-code output based on log level
  let code = ''
  switch (logLevel) {
  case LogLevels.Info: // No color
    break
  case LogLevels.Warning:
    code = ColorCodes.Yellow
    break
  case LogLevels.Error:
    code = ColorCodes.Red
    break
  case LogLevels.Debug:
    code = ColorCodes.Blue
    break
  }

  return `${code}[${timestamp}] [${logLevel}] ${message}${ColorCodes.Reset}`
}

/* Log a message to the server console */
export function log(message: string, logLevel: LogLevels): void {
  const m = formatMessage(message, logLevel)

  // TODO: colorize output based on log level
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