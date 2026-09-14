import { sassPlugin } from 'esbuild-sass-plugin'
import postcss from 'postcss'
import postcssUrl from 'postcss-url'
import postcssNested from 'postcss-nested'
import postcssScss from 'postcss-scss'
import cssnano from 'cssnano'
import { notify, manifestPlugin } from './helpers.mjs'

const postcssConfig = {
  plugins: [
    postcssUrl({
      url: 'inline',
      basePath: 'src/files',
    }),
    postcssNested(),
    cssnano({ preset: 'default' }),
  ],
}

export default {
  entryPoints: ['src/styles/packs/**/*.scss'],
  entryNames: 'styles/[dir]/[name].[hash]',
  outdir: 'dist',
  bundle: true,
  metafile: true,
  minify: process.argv.includes('--minify'),
  sourcemap: process.env.NODE_ENV !== 'production',
  plugins: [
    sassPlugin({
      // TODO: Migrate from @import to @use/@forward module system.
      // Currently, files rely on @import making variables/functions globally
      // available (e.g., breadcrumb.scss uses color(), spacing(), mixins without
      // importing them - they're available because core.scss imported them earlier).
      // With @use, each file must explicitly declare its dependencies with namespaces.
      // The if-function deprecation can't be fixed until this migration is done
      // because meta.if() requires @use namespaces to work.
      silenceDeprecations: ['import', 'if-function'],
      async transform(source) {
        const result = await postcss(postcssConfig.plugins).process(source, {
          from: 'undefined',
          syntax: postcssScss,
        })
        return result.css
      },
      loadPaths: ['src/styles', 'node_modules'],
    }),
    manifestPlugin({ append: true }),
    notify({ type: 'styles', color: 'blue' }),
  ],
}
