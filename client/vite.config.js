import { defineConfig, } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig({
  plugins: [
      react(),
      VitePWA({
        manifest: {
          
          name: 'Opinion - Opinion App',
          short_name: 'Opinion',
          id: '/',
          start_url: '.',
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#000000',
          
          icons: [
            {
              src: 'images/quote-3.ico',
              sizes: 'any',
              type: 'image/x-icon',
            },
            {
              src: 'images/quote-2.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'images/quote-2.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: "maskable"
            },
            {
              src: 'images/quote-2.png',
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
