<template>
	<div class="flv">
		<div class="h5maker_form_item">
			<div class="label">图片链接</div>
			<input
				:id="Math.random()"
				type="file"
				accept="image/*"
				@input="handleImgChange"
			/>

			<div class="h5maker_input_box">
				<input
					type="text"
					class="h5maker_input"
					:value="modelValue.value"
					@input="changeValue($event, 'value')"
				/>
			</div>
		</div>

		<div class="h5maker_form_item">
			<div class="label">宽度</div>
			<div class="h5maker_input_box">
				<input
					type="text"
					class="h5maker_input"
					:value="modelValue.styles.width"
					@input="changeValue($event, 'styles.width')"
				/>
			</div>
		</div>
		<div class="h5maker_form_item">
			<div class="label">高度</div>
			<div class="h5maker_input_box">
				<input
					type="text"
					class="h5maker_input"
					:value="modelValue.styles.height"
					@input="changeValue($event, 'styles.height')"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps, ref, defineEmits, toRaw, watch } from 'vue'
const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps(['modelValue'])

let tempVal = toRaw(props.modelValue)

function handleImgChange(e) {
	const fileList = e.target.files // 获取文件列表
	const firstFile = fileList[0]
	const imageUrl = URL.createObjectURL(firstFile)
	e.target.value = ''
	tempVal.value = imageUrl
	emit('update:modelValue', { ...tempVal })
	emit('change', tempVal)
}

watch(
	props,
	(newValue, oldValue) => {
		tempVal = toRaw(props.modelValue)
	},
	{ deep: true }
)

function changeValue(e, keys) {
	const keyList = keys.split('.')
	let lastKeyIndex = keyList.length - 1 // 最后一个键的索引
	let lastKey = keyList[lastKeyIndex] // 最后一个键
	let targetObject = keyList.slice(0, lastKeyIndex).reduce((obj, key) => {
		if (!obj[key]) obj[key] = {} // 如果键不存在，则创建一个新的对象
		return obj[key] // 返回下一层级的对象
	}, tempVal)

	targetObject[lastKey] = e.target.value
	emit('update:modelValue', { ...tempVal })
	emit('change', tempVal)
}
</script>

<style scoped>
.h5maker_input_box {
	height: 32px;
	background-color: #fff;
	display: flex;
	align-items: center;
	position: relative;
	box-sizing: border-box;
	border: 1px solid #dcdee0;
	border-radius: 2px;
	transition:
		border 0.2s ease-in-out,
		box-shadow 0.2s ease-in-out;
	overflow: hidden;
	align-items: center;
	margin-top: 10px;
}

.h5maker_input {
	color: #323233;
	display: inline-block;
	-ms-flex: 1;
	flex: 1;
	min-width: 80px;
	height: 100%;
	box-sizing: border-box;
	padding: 0 10px;
	margin: 0;
	font-size: 14px;
	box-shadow: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	outline: none;
	border: 0;
}
</style>
