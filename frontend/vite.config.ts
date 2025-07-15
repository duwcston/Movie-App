import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/api/": "https://movie-app-backend-ufe6.onrender.com",
      "/uploads/": "https://movie-app-backend-ufe6.onrender.com",
    }
  }
})
