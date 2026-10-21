import { notify, manifestPlugin, cssHandler } from './helpers.mjs'

export default {
  entryPoints: ['src/scripts/packs/**/*.js'],
  entryNames: 'scripts/[dir]/[name].[hash]',
  outdir: 'dist',
  bundle: true,
  minify: process.argv.includes('--minify'),
  metafile: true,
  sourcemap: process.env.NODE_ENV !== 'production',
  plugins: [
    cssHandler,
    manifestPlugin({ append: true }),
    notify({ type: 'scripts', color: 'magenta' }),
  ],
}
