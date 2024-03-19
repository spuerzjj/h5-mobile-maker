import { ref, reactive } from 'vue'

export default reactive({
	id: '',

	setting: {
		title: '',
		desc: '',
		backgroudColor: '',
		category: ''
	},

	components: []
})

export const ToolItemCount = reactive({
	TitleText: 0,
	Image: 0,
	Carousel: 0
})
