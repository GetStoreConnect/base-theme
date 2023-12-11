import TEST_DATA from './data.json'
import liquid from '@vituum/vite-plugin-liquid'

export default {
  plugins: [
    liquid({
      root: './templates',
      globals: TEST_DATA,
    }
  )],
  build: {
    rollupOptions: {
      input: {
        theme: '/stylesheets/theme.css',
        products: '/javascripts/products.js',
      },
    }
  }
}
