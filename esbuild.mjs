import { build } from 'esbuild'

build({
  entryPoints: ['src/index.js'],
  outdir: 'dist',
  bundle: true,
  minify: true,
  sourcemap: true,
  format: 'esm',
  target: ['esnext']
}).catch((err) => {
  console.error(`esbuild error: ${err}`)
  process.exit(1)
})
