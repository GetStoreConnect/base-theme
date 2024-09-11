const { notify, getFileExtensions, manifestPlugin } = require('./helpers');

const fileTypes = getFileExtensions('src/files');
const loader = fileTypes.reduce((acc, fileType) => { acc[fileType] = 'copy'; return acc; }, {});
const fileGlob = fileTypes.map(fileType => `src/files/**/*${fileType}`);

module.exports = {
  entryPoints: fileGlob,
  entryNames: 'files/[dir]/[name].[hash]',
  outdir: 'dist',
  loader: loader,
  bundle: true,
  metafile: true,
  plugins: [manifestPlugin({ append: true }), notify("files")],
};
