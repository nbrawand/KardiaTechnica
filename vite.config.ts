import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // served from the custom domain root (https://kardiatechnica.com/)
  base: '/',
  plugins: [react()],
})
