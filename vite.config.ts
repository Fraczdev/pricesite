import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/pricesite/', // Set base for GitHub Pages
  plugins: [react()],
})
