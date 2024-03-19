<template>
	<div :style="data.styles" class="p-4">{{ data.value }}</div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps(['data'])
</script>

<style scoped></style>
