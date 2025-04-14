import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    '/projects': 'http://localhost:3000',
      '/upload-project': 'http://localhost:3000',
  }
})