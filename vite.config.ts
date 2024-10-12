import path from "path"
import react from "@vitejs/plugin-react"
import { iterateVitePLugin } from '@iterate-ai/viteplugin';
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), iterateVitePLugin('https://s1lgzjst-8000.inc1.devtunnels.ms')],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true
  }
})
