import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/My_First_Project/",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8787",
        changeOrigin: true
      }
    }
  }
});
