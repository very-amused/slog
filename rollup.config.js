import typescript from '@rollup/plugin-typescript'
import alias from '@rollup/plugin-alias'

const tsconfig = 'tsconfig.json'
const relativeConfigPath = '../../config.js'
const serverExternal = ['https', 'fs', relativeConfigPath]

export default [
  {
    input: 'src/server/index.ts',
    output: {
      dir: 'build/server',
      format: 'es'
    },
    plugins: [
      typescript({
        tsconfig,
        declaration: false,
        outDir: 'build/server'
      }),
      alias({
        entries: [
          { find: '@config', replacement: relativeConfigPath }
        ]
      })
    ],
    external: serverExternal
  }
]