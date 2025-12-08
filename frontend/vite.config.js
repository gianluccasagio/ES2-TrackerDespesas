import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: { // Adicione esta seção
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})