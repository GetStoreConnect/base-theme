const { notify, manifestPlugin, cssHandler } = require('./helpers');

module.exports = {
  entryPoints: ['src/scripts/packs/**/*.js'],
  entryNames: 'scripts/[dir]/[name].[hash]',
  outdir: 'dist',
  bundle: true,
  minify: true,
  metafile: true,
  plugins: [cssHandler, manifestPlugin({ append: true }), notify("scripts")],
};
