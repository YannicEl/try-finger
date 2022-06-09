<template>
	<Teleport to="body">
		<Transition name="fade">
			<div class="fixed inset-0 z-1000" :class="backdropClass" v-if="isOpen">
				<!-- backdrop -->
				<div class="absolute inset-0 pointer-events-auto" @click="close()"></div>

				<div class="absolute inset-0 pointer-events-none grid place-items-center">
					<!-- place modal in the center of the screen -->
					<div
						class="ui-fade pointer-events-auto overflow-hidden max-w-screen-lg max-w-xl w-full bg-dark"
					>
						<slot></slot>
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script lang="ts" setup>
const { backdropClass } = defineProps<{ backdropClass: string }>();

const emit = defineEmits<{
	(event: 'close'): void;
}>();

const isOpen = ref<boolean>(false);

const close = () => {
	isOpen.value = false;
	emit('close');
};

const open = () => {
	isOpen.value = true;
};

onKeyStroke(['Escape'], (e) => {
	e.preventDefault();
	close();
});

defineExpose({
	open,
	close,
	isOpen,
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
	@apply transition-all;
}

.fade-enter-from,
.fade-leave-to {
	@apply opacity-1 transform translate-y-[10px];
}
</style>
