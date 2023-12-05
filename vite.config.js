import liquid from '@vituum/vite-plugin-liquid'

export default {
  plugins: [
    liquid({
      root: './templates'
    })
  ],
  build: {
    rollupOptions: {
      input: {
        products: '/assets/pages/products.js',
      },
    }
  }
}
