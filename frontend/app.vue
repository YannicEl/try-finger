<template>
	<div
		class="h-full 2xl:h-[95%] w-full 2xl:max-w-[1400px] rounded overflow-hidden bg-white shadow flex"
	>
		<div
			class="border-r border-gray-200 flex flex-col relative"
			:style="{ width: width + 'px' }"
		>
			<div
				class="absolute -right-2 top-0 bottom-0 w-4 cursor-col-resize"
				@mousedown="mousedown"
			></div>

			<Menu class="border-b border-gray-200 h-16" />

			<ListView class="flex-1" />
		</div>

		<div class="flex-1 grid">
			<NuxtPage />
		</div>
	</div>
</template>

<script setup lang="ts">
const width = useCookie<number>('width', {
	maxAge: 60 * 60 * 24 * 365,
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
