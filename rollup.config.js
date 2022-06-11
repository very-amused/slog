import typescript from '@rollup/plugin-typescript'

const tsconfig = 'tsconfig.json'
const serverExternal = ['https', 'fs', 'node:path']

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
      })
    ],
    external: serverExternal
  }
]