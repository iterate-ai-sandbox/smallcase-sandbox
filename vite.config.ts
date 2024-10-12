import { iterateVitePLugin } from "@iterate-ai/viteplugin";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    iterateVitePLugin("https://dev-api.iterate-ai.com/api/v0/source-maps"),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
  },
});
