import { notify, getFileExtensions, manifestPlugin } from './helpers.mjs'

const fileTypes = getFileExtensions('src/files')
const loader = fileTypes.reduce((acc, fileType) => {
  acc[fileType] = 'copy'
  return acc
}, {})
const fileGlob = fileTypes.map((fileType) => `src/files/**/*${fileType}`)

export default {
  entryPoints: fileGlob,
  entryNames: 'files/[dir]/[name].[hash]',
  outdir: 'dist',
  loader,
  bundle: true,
  metafile: true,
  plugins: [manifestPlugin({ append: true }), notify({ type: 'files', color: 'yellow' })],
}
