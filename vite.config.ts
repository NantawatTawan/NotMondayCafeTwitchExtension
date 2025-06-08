import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: "./",
  build: {
    rollupOptions: {
      input: {
        mobile: path.resolve(__dirname, "mobile.html"),
        video: path.resolve(__dirname, "video_overlay.html"),
      },
    },
  },
});
