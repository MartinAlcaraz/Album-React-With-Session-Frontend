import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

    
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Album-fotos-frontend/",  // para gh-pages
  build: {
    outDir: 'dist'
  }
  
  // build: {
  //   outDir: path.join( __dirname,'../backend/public')
  // }

})

