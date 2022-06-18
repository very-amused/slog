export declare type ServerConfig = {
  hostname: string
  certsDir: string
  port?: number
  useColor?: boolean
}

declare const config: ServerConfig

export default config