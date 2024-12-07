import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from 'node:url'
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
export default defineConfig({
  server: {
    host: true,
    https: false,
    port: 5173,
    proxy: {
      // "/api": {
      //   target: "http://chino.vipgz4.91tunnel.com/api",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // },
      // "/schedule": {
      //   target: "http://chino.39nat.com/schedule",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/schedule/, ""),
      // },
      // "/ipJson.jsp": {//IP获取接口跨域
      //   target: "http://whois.pconline.com.cn/ipJson.jsp",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/ipJson.jsp/, ""),
      // },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  plugins: [
    vue(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      dts: true,
      imports: ["vue", "vue-router", "pinia"],
    }),
	Components({
		dts: true,
		dirs: ['src/components'],
		extensions: ['vue', 'jsx', 'tsx', 'ts', 'js'],
		resolvers: [
		],
	})
  ]
});
