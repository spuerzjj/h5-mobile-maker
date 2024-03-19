<template>
	<div
		class="mx-auto mt-5 bg-white w-[400px] min-h-[800px]"
		@dragenter.prevent="handleDragEnter"
		@dragover.prevent="handleDragOver"
		@drop.prevent="handleDrop"
	>
		<template v-if="state.components.length > 0">
			<Card
				v-for="(item, index) in state.components"
				:key="item.id"
				:draggable="item.id === selectedCompId"
				@click="handleClickCard(item, index)"
				@dragstart="onCardDragStart($event, index)"
				@drag="onCardDrag"
				@dragend="onCardDragEnd"
				@dragenter="onCardDragEnter($event, index)"
				@clickUp="handleClickUp(index)"
				@clickDown="handleClickDown(index)"
				@clickDelete="handleClickDelete(index)"
				:isSelected="item.id === selectedCompId"
				:comp="item"
			></Card>
		</template>

		<div
			id="dragDom"
			class="fixed pointer-events-none"
			:style="{ left: dragDomStyle.left + 'px', top: dragDomStyle.top + 'px' }"
		></div>
	</div>
</template>

<script setup>
import { ref, onMounted, toRaw } from 'vue'
import state from '../store'
import Card from '../../components/Card.vue'
import { ComponentMap } from 'maker-components' // 组件的数据格式
import { generateId } from '@/utils/index.js'

// 父节点的document
let parent = null

let isDraging = false
let dragIndex = -1
let dragDomStyle = ref({})
let selectedCompId = ref(null)

function handleClickUp(index) {
	if (index > 0) {
		;[state.components[index - 1], state.components[index]] = [
			state.components[index],
			state.components[index - 1]
		]
	}
}

function handleClickDown(index) {
	if (index < state.components.length - 1) {
		;[state.components[index], state.components[index + 1]] = [
			state.components[index + 1],
			state.components[index]
		]
	}
}

function handleClickDelete(index) {
	state.components.splice(index, 1)
}

function handleClickCard(item, index) {
	selectedCompId.value = item.id
	// 通知显示配置面板
	parent.postMessage({ message: 'selectComponent', data: toRaw(item) })
}

// 开始拖拽card
function onCardDragStart(e, index) {
	isDraging = true
	dragIndex = index
	//   var img = new Image()
	//   img.src = 'example.gif'

	//   e.dataTransfer.setDragImage(node, 10, 10)
	//   e.dataTransfer.dropEffect = 'copy'
	setTimeout(() => {
		let domRect = e.target.getBoundingClientRect()
		dragDomStyle.value.left = domRect.left
		dragDomStyle.value.startLeft = domRect.left
		dragDomStyle.value.startX = e.screenX
		dragDomStyle.value.top = domRect.top
		dragDomStyle.value.startTop = domRect.top
		dragDomStyle.value.startY = e.screenY

		let cloneNode = e.target.cloneNode(true)
		cloneNode.style.height = e.target.offsetHeight + 'px'
		cloneNode.style.width = e.target.offsetWidth + 'px'
		document.getElementById('dragDom').appendChild(cloneNode)
	}, 0)
}

function onCardDrag(e) {
	e.preventDefault()
	dragDomStyle.value.left =
		dragDomStyle.value.startLeft + (e.screenX - dragDomStyle.value.startX)
	dragDomStyle.value.top =
		dragDomStyle.value.startTop + (e.screenY - dragDomStyle.value.startY)
}

function onCardDragEnd(e) {
	document.getElementById('dragDom').innerHTML = ''
}

// 拖拽进入card区域，交换位置
function onCardDragEnter(e, index) {
	e.preventDefault()
	// 拖拽到原位置时不触发
	if (dragIndex !== index) {
		// const source = state.components[dragIndex]
		// state.components.splice(dragIndex, 1)
		// state.components.splice(index, 0, source)
		// 交换位置
		;[state.components[dragIndex], state.components[index]] = [
			state.components[index],
			state.components[dragIndex]
		]
		// 更新节点位置
		dragIndex = index
	}
}

// 从工具类拖入元素
function handleDragEnter(e) {
	if (isDraging) return

	e.preventDefault()
	// 创建伪card
	state.components.push({ id: null })
	dragIndex = state.components.length - 1
	isDraging = true
}

function handleDragOver(e) {
	e.preventDefault()
	e.dataTransfer.dropEffect = 'move'
}

function handleDrop(e) {
	//   e.preventDefault()
	isDraging = false
	if (dragIndex >= 0 && !state.components[dragIndex].id) {
		const key = e.dataTransfer.getData('compName')
		const cData = { ...ComponentMap[key] }
		cData.id = generateId()
		state.components[dragIndex] = cData
	}
}

function initMessage() {
	window.addEventListener('message', event => {
		parent = event.source
		const { message, data } = event.data
		if (message === 'dragend') {
			isDraging = false
			// 去除假card
			if (dragIndex >= 0 && !state.components[dragIndex].id) {
				state.components.splice(dragIndex, 1)
			}
		}

		if (message === 'configChange') {
			state.components.forEach((comp, index) => {
				if (comp.id === data.id) {
					state.components[index] = data
				}
			})
		}
	})
}

onMounted(() => {
	initMessage()
})
</script>

<style scoped>
.moveing {
	opacity: 1;
}
</style>
