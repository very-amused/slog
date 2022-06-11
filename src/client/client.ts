import { LogLevels, LogLevelHeader, DefaultPort } from '../data.js'


/* An Slog client instance, used to send logs to a destination server. */
export class SlogClient {
  readonly serverURL: string
  /* The default port used for Slog communication. */
  static readonly DefaultPort = DefaultPort 

  /**
   * @param serverURL The destination server URL. Must use HTTPS and provide a domain and port.
   */
  constructor(serverURL: `https://${string}:${string}`) {
    this.serverURL = serverURL
  }

  /* Send a log message to the registered Slog server */
  private async sendLog(message: string, logLevel: LogLevels): Promise<void> {
    try {
      const res = await fetch(this.serverURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          [LogLevelHeader]: logLevel
        },
        body: message
      })
      if (res.status !== 200) {
        console.error(`[SLOG] Error sending log to server (server URL: ${this.serverURL}, response status: ${res.status})`)
      }
    } catch (err) {
      console.error(`[SLOG] Error sending log to server (server URL: ${this.serverURL}, error: ${err})`)
      return
    }
  }

  async log(message: string): Promise<void> {
    return this.sendLog(message, LogLevels.Info)
  }

  async warn(message: string): Promise<void> {
    return this.sendLog(message, LogLevels.Warning)
  }

  async error(message: string): Promise<void> {
    return this.sendLog(message, LogLevels.Error)
  }

  async debug(message: string): Promise<void> {
    return this.sendLog(message, LogLevels.Debug)
  }
}