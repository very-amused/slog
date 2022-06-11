# Slog
TS/JS client to server logging.

## Installation
```
yarn add -D @very-amused/slog
```

## Setup
All configuration for Slog's server is done in `slog.config.js` in your project directory. This file is expected to be an ES module, with the config as its default export. The config object should be typed using jsdoc as seen below.
```js
// slog.config.js

/** @type {import('@very-amused/slog').ServerOptions}*/
export default {
  certsDir: `${process.env.HOME}/.mycerts/example.tld`
}
```

Slog's server will only run over HTTPS, and it requires a certificate directory containing a `fullchain.pem` and `privkey.pem` file, containing a TLS certificate chain and private key respectively. This directory is specified using the `certsDir` option in `slog.config.js`.

## Usage
1. Start Slog's server.
```sh
yarn slog
```
2. Create an Slog client instance in the clientside script you wish to send logs from.
3. Use the available `log`, `warn`, `error`, or `debug` methods on the Slog instance to send logs to the server.
```ts
import { SlogClient } from '@very-amused/slog'

/* Slog recommends using Typescript, which will validate the format of client URLs at compile time.
No runtime validation is performed at the moment. */
const slog = new SlogClient(`https://example.tld:${SlogClient.DefaultPort}`)

// Any object can be logged (.toString() is used internally), but console CSS is not supported
slog.log('Important info')
slog.error({ message: 'something went wrong', code: 1 })
```
4. Logs are displayed on the Slog server console.
