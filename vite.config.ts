import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // served from https://nbrawand.github.io/kardiatechnica/
  base: '/kardiatechnica/',
  plugins: [react()],
})
