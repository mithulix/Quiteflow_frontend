import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//       '@components': path.resolve(__dirname, './src/components')
//     }
//   }
// })


// vite.config.js
export default defineConfig({
  css: {
    postcss: './postcss.config.cjs'
  }
})