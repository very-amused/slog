export enum LogLevels {
  Info = 'INFO',
  Warning = 'WARNING',
  Error = 'ERROR',
  Debug = 'DEBUG'
}

export const LogLevelHeader = 'x-slog-loglevel' // Node's server normalizes headers to lowercase
export const DefaultPort = 4040