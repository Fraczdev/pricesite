import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/pricesite/',
  plugins: [react()],
  build: {
    outDir: 'docs', // Output build to docs/ for GitHub Pages from main branch
    emptyOutDir: true
  }
})