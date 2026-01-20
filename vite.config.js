import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Essential for Docker/Dokploy access
    port: 5173,      // Matches your Dokploy domain port
    strictPort: true, // Prevents port switching if 5173 is busy
    watch: {
      usePolling: true, // Better file detection on Mac
      interval: 100     // Check every 100ms
    }
  }
})
