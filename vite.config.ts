import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ command }) => ({
  plugins: [vue()],
  base: command === 'build' ? '/h5-candidate/' : '/',
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
  server: {
    host: '0.0.0.0',
    port: 5174,
    allowedHosts: true,
    proxy: {
      '/api': { target: 'http://127.0.0.1:3000', changeOrigin: true }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-core': ['vue', 'vue-router', 'pinia'],
          'vant': ['vant'],
          'area-data': ['@vant/area-data']
        }
      }
    }
  }
}))
