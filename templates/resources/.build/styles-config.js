const { sassPlugin } = require('esbuild-sass-plugin');
const postcss = require('postcss');
const postcssUrl = require('postcss-url');
const postcssNested = require('postcss-nested');
const postcssScss = require('postcss-scss');
const cssnano = require('cssnano');
const { notify, manifestPlugin } = require('./helpers');

const postcssConfig = {
  plugins: [
    postcssUrl({
      url: 'inline',
      basePath: 'src/files',
    }),
    postcssNested(),
    cssnano({ preset: 'default' }),
  ],
};

module.exports = {
  entryPoints: ['src/styles/packs/**/*.scss'],
  entryNames: 'styles/[dir]/[name].[hash]',
  outdir: 'dist',
  bundle: true,
  minify: true,
  plugins: [sassPlugin({
    async transform(source) {
      const result = await postcss(postcssConfig.plugins).process(source, { from: 'undefined', syntax: postcssScss });
      return result.css;
    },
    loadPaths: ['src/styles', 'node_modules'],
  }), manifestPlugin({ append: true }), notify("styles")],
  metafile: true,
};
