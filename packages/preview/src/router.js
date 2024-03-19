import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/preview',
			name: 'index',
			component: () => import('./pages/preview/index.vue')
		}
	]
})
