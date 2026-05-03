import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    cloudflare(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      devOptions: { enabled: true },
      manifest: {
        name: 'honst',
        short_name: 'honst',
        description: 'honstは、ワードを指定して各ネット書店/電子書籍ストアの検索・リアル書店の在庫検索のリンクを一覧できるアプリです。',
        theme_color: '#fff8e4',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
