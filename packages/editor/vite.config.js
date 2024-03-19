import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/editor/',
	resolve: {
		alias: {
			// 设置别名
			'@': path.resolve(__dirname, './src')
		}
	},
	server: {
		port: 5173
	},
	plugins: [vue()]
})
