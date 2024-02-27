import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3000,
            proxy: {
              '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
              },
            }, 
            strictPort: true,
            watch: {
              ignored: ["**/src-tauri/**"],
            },
          },
  base: '/bmstu-frontend/',
  plugins: [react()],
})
