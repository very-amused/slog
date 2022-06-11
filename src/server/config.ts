// Dynamically import $cwd/slog.config.js
import * as path from 'node:path'
import type { ServerConfig } from '../../slog.config.d'
export const config: ServerConfig = (await import(path.resolve(process.cwd(), 'slog.config.js'))).default