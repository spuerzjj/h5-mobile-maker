<template>
	<!-- <div :style="data.styles" class="p-4">{{ data.value }}</div> -->

	<img v-if="data.value" :src="data.value" :style="data.styles" class="p-4" />
	<div v-else>请选择图片</div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps(['data'])
</script>

<style scoped></style>
