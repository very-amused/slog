import typescript from '@rollup/plugin-typescript'

const tsconfig = 'tsconfig.json'
const serverExternal = ['https', 'fs', 'node:path']

/** @type {import('rollup').RollupOptions} */
export default [
  {
    input: 'src/server/index.ts',
    output: {
      dir: 'build/server',
      format: 'es',
      intro: '#!/usr/bin/env node' // Needed to make the server directly executable, so `yarn slog` can start the installated server
    },
    plugins: [
      typescript({
        tsconfig,
        declaration: false,
        outDir: 'build/server'
      })
    ],
    external: serverExternal
  },
  {
    input: 'src/client/index.ts',
    output: {
      dir: 'build/client',
      format: 'es'
    },
    plugins: [
      typescript({
        tsconfig,
        declaration: false,
        outDir: 'build/client'
      })
    ]
  }
]