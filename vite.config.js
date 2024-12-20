import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	css: {
		postcss: "./postcss.config.js", // 確保這行存在
	},
	server: {
		proxy: {
			"/auth": "http://localhost:8080", // Go server 的地址
			"/api": "http://localhost:8080", // Go server 的地址
		},
	},
});
