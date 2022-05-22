<template>
	<div class="px-4 py-3 flex gap-4">
		<button class="flex flex-col justify-center gap-1.25 h-full w-7" @click="addItem">
			<span class="bg-white w-full rounded-full h-3px"></span>
			<span class="bg-white w-full rounded-full h-3px"></span>
			<span class="bg-white w-full rounded-full h-3px"></span>
		</button>

		<button @click="logout">logout</button>

		<MainSearch class="flex-1" />
	</div>
</template>

<script setup lang="ts">
const { addItem } = useStore();
const { logout } = useAuth();
</script>

<style scoped lang="scss"></style>
