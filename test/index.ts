import { server } from '../src/server/server.js'
import { config } from '../src/server/config.js'
import { DefaultPort } from '../src/data.js'
import t from 'ava'
const test = t.serial

{
  const port = config.port || DefaultPort
  test(`Start server on port ${port}`, (t) => {
    t.notThrows(() => {
      server.listen(port)
    })
  })
}

test('Stop server', (t) => {
  t.notThrows(() => {
    server.close()
  })
})