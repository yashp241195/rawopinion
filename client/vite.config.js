import { defineConfig, } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig({
  plugins: [
      react(),
      VitePWA({
        manifest: {
          
          name: 'Workoso - Work App',
          short_name: 'Workoso',
          id: '/',
          start_url: '.',
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#000000',
          
          icons: [
            {
              src: 'images/date.ico',
              sizes: 'any',
              type: 'image/x-icon',
            },
            {
              src: 'images/date.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'images/date.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: "maskable"
            },
            {
              src: 'images/date.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: "any maskable"
            },
          ],
        },
        
        devOptions: {
          enabled: true
        },
        workbox: {
          cleanupOutdatedCaches: true
        },
        registerType: 'autoUpdate',
        base: '/',
      }),
    ],
    
})
