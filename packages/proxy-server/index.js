const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

// 代理配置
app.use(
	'/editor',
	createProxyMiddleware({
		target: 'http://localhost:5173',
		changeOrigin: true,
		ws: true
	})
)
app.use(
	'/preview',
	createProxyMiddleware({
		target: 'http://localhost:5174',
		changeOrigin: true,
		ws: true
	})
)

// 启动代理服务器
app.listen(8080, () => {
	console.log('Server is running on http://localhost:8080/editor/')
})
