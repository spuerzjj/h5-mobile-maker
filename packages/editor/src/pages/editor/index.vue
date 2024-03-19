<template>
	<div class="grid gap-0 grid-cols-[200px_minmax(400px,_1fr)_400px]">
		<div class="pt-8 px-4">
			<div class="mb-3 text-base font-black border-b-2 pb-2">常用组件</div>

			<div
				class="grid gap-3 grid-cols-2 grid-rows-none content-start cursor-pointer select-none"
			>
				<div
					v-for="item in ToolsList"
					:key="item.componentName"
					class="flex flex-col items-center p-2 box-border border-2 border-white hover:border-sky-500 hover:border-2"
					draggable="true"
					@dragstart="onDragstart($event, item.componentName)"
					@drag="onDrag"
					@dragend="onDragend"
				>
					<img :src="item.iconUrl" class="size-8" draggable="false" />
					<span class="text-sm">{{ item.name }}</span>
				</div>
			</div>
		</div>
		<div class="edit_main">
			<iframe
				id="edit_preview_iframe"
				src="/preview/"
				class="edit_iframe"
			></iframe>
		</div>

		<div class="pt-8 px-4">
			<div class="mb-3 text-base font-black border-b-2 pb-2">组件配置</div>

			<component
				:is="configComponents[compData.componentName]"
				v-model="compData"
				@change="handleConfigChange"
			></component>
		</div>
	</div>
</template>

<script setup>
import { onMounted, defineComponent, ref, reactive, toRaw } from 'vue'
import { ToolsList } from './data' // 组件的数据格式
import { TitleTextConfig, ImageBoxConfig } from 'maker-components'

let childIFrame = null

function onDragstart(e, key) {
	e.dataTransfer.setData('compName', key)
}
function onDrag(e) {
	//   console.log(e)
}
function onDragend(e) {
	//   console.log(e)
	childIFrame.postMessage({ message: 'dragend', data: null })
}

// postMessage通道
onMounted(() => {
	childIFrame = document.getElementById('edit_preview_iframe').contentWindow
	window.addEventListener('message', event => {
		const { message, data } = event.data

		// 选中组件，显示配置框
		if (message === 'selectComponent') {
			console.log(data.id)
			compData.value = data
		}
	})
})

const configComponents = {
	TitleText: TitleTextConfig,
	ImageBox: ImageBoxConfig
}

const compData = ref({})

const handleConfigChange = val => {
	childIFrame.postMessage({
		message: 'configChange',
		data: val
	})
}
</script>

<style scoped>
.edit_main {
	background-color: #f7f8fa;
	height: 100vh;
}

.edit_iframe {
	width: 100%;
	height: 100vh;
	border: none;
}
</style>
