import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // served from https://nbrawand.github.io/KardiaTechnica/
  // (case must match the repo name exactly — Pages paths are case-sensitive)
  base: '/KardiaTechnica/',
  plugins: [react()],
})
