import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode, }) => {

  const env = loadEnv(mode, process.cwd(), 'VITE_CONFIG_BASE')

  return {
    base: env.VITE_CONFIG_BASE,
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/selticket-[name].js`,
          chunkFileNames: `assets/selticket-[name].js`,
          assetFileNames: `assets/selticket-[name].[ext]`
        }
      }
    }
  }
  
})
