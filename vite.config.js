/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  css: {
    // Beispiel für PostCSS- oder SCSS-Konfiguration
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/variables.scss";', 
      },
    },
  },
})
