<template>
	<div :style="{ width: width + 'px' }">
		<div
			class="absolute -right-2 top-0 bottom-0 w-4 cursor-col-resize z-10"
			@mousedown="mousedown"
		></div>

		<slot></slot>
	</div>
</template>

<script setup lang="ts">
const width = useCookie<number>('leftColumnWidth', {
	// 10 years
	maxAge: 10 * 60 * 60 * 24 * 365,
	default: () => 400,
});

const mousedown = () => {
	window.addEventListener('mousemove', resize);
	window.addEventListener('mouseup', mouseup);
};

const mouseup = () => {
	window.removeEventListener('mousemove', resize);
	window.removeEventListener('mouseup', mouseup);
};

const resize = (e: MouseEvent) => {
	e.preventDefault();

	width.value += e.movementX;
	width.value = Math.max(300, width.value);
	width.value = Math.min(1000, width.value);
};
</script>

<style scoped lang="scss"></style>
