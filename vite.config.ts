import { fileURLToPath, URL } from "url";
import { VitePWA } from "vite-plugin-pwa";
import postcssRtl from "postcss-rtlcss";
import tailwidCss from "tailwindcss";
import * as path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
        type: "module",
      },
      manifest: {
        background_color: "#ffffff",
        name: "Auto Parts",
        description: "Auto Parts Management Web App",
        theme_color: "#3761E9",
        short_name: "APM",
        icons: [
          {
            src: "/logo-192_x_192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/logo-512_x_512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: [
      { find: "~", replacement: path.resolve(__dirname, "src") },
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "~config", replacement: path.resolve(__dirname, "./app.config.ts") },
    ],
  },
  css: {
    postcss: {
      plugins: [postcssRtl(), tailwidCss()] as any,
    },
  },
});
