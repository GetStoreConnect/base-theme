import CURRENT_STORE from './store.json'
import PRODUCT_A from './product-a.json'
import THEME from './theme.json'

import { viteStaticCopy } from 'vite-plugin-static-copy'
import zipPack from 'vite-plugin-zip-pack'
import liquid from '@vituum/vite-plugin-liquid'
import vituum from 'vituum'

export default {
  // build: {
  //   rollupOptions: {
  //     input: {
  //       products: 'src/pages/products/products.js',
  //       checkout: 'src/pages/checkout/checkout.js',
  //     },
  //     output: {
  //       entryFileNames: 'scripts/[name].js',
  //     },
  //   },
  // },
  plugins: [
    vituum(),
    liquid({
      root: 'src',
      theme: THEME,
      current_store: CURRENT_STORE,
      products: [PRODUCT_A],
    }),
    viteStaticCopy({
      targets: [
        {
          src: [
            'src/pages/products/products.liquid',
            'src/pages/checkout/checkout.liquid',
          ],
          dest: 'templates',
        },
        {
          src: 'src/components/templates.liquid',
          rename: 'components.liquid',
          dest: 'templates',
        },
        {
          src: 'src/translations/*.csv',
          dest: 'translations',
        },
      ],
    }),
    zipPack({
      outDir: 'dist',
      outFileName: 'StoreConnectTheme.zip',
    }),
  ],
}
