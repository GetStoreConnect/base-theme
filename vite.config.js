import { viteStaticCopy } from 'vite-plugin-static-copy'
import zipPack from 'vite-plugin-zip-pack'

export default {
  build: {
    rollupOptions: {
      input: {
        products: 'src/pages/products/products.js',
        checkout: 'src/pages/checkout/checkout.js',
      },
      output: {
        entryFileNames: 'scripts/[name].js',
      },
    },
  },
  plugins: [
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
