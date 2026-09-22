import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  envPrefix: ["VITE_", "ECOM"],
  plugins: [react()],
  server: {
    host: true,
  },
  optimizeDeps: {
    include: ["framer-motion"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router")
            ) {
              return "vendor-react";
            }
            if (id.includes("swiper")) {
              return "vendor-swiper";
            }
            return "vendor-libs";
          }
        },
      },
    },
  },
});
