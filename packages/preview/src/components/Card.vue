<template>
	<div class="box-border w-full cursor-pointer relative">
		<div class="pointer-events-none">
			<component
				:is="setupComponent[comp.componentName]"
				:data="comp"
			></component>
		</div>

		<div
			v-show="isSelected"
			class="border-blue-400 border-2 absolute top-0 left-0 w-full h-full"
		></div>
		<!-- 右侧小工具 -->
		<div
			v-show="isSelected"
			class="absolute w-10 h-24 -right-10 top-0 flex flex-col justify-between items-center"
		>
			<button
				class="size-7 bg-slate-400 rounded flex items-center justify-center"
				@click="emit('clickUp')"
			>
				<img src="@/assets/btn_up.svg" class="size-5" />
			</button>

			<button
				class="size-7 bg-slate-400 rounded flex items-center justify-center"
				@click="emit('clickDown')"
			>
				<img src="@/assets/btn_down.svg" class="size-5" />
			</button>

			<button
				class="size-7 bg-slate-400 rounded flex items-center justify-center"
				@click="emit('clickDelete')"
			>
				<img src="@/assets/btn_delete.svg" class="size-5" />
			</button>
		</div>
	</div>
</template>

<script setup>
import { defineEmits } from 'vue'
import { TitleText, ImageBox } from 'maker-components'
// import TitleText from './TitleText/index.vue'
const props = defineProps({
	comp: Object,
	isSelected: {
		type: Boolean,
		default: false
	}
})

const setupComponent = {
	TitleText,
	ImageBox
}

const emit = defineEmits(['clickUp', 'clickDown', 'clickDelete'])
</script>

<style scoped></style>
