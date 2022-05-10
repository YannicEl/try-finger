<template>
	<div class="grid grid-cols-3 gap-1" :class="width">
		<div class="circle" :class="color"></div>
		<div class="circle" :class="color"></div>
		<div class="circle" :class="color"></div>
	</div>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		width?: string;
		color?: string;
	}>(),
	{ width: 'w-12', color: 'bg-blue-600' }
);

const { width, color } = toRefs(props);
</script>

<style scoped lang="scss">
.circle {
	@apply w-full rounded-full aspect-square;
	animation: pulse 600ms infinite;

	&:nth-child(2) {
		animation-delay: 200ms;
		transform: scale(0.7);
	}

	&:nth-child(3) {
		animation-delay: 400ms;
		transform: scale(0.7);
	}
}

@keyframes pulse {
	0% {
		transform: scale(0.7);
	}
	50% {
		transform: scale(1);
	}
	100% {
		transform: scale(0.7);
	}
}
</style>
