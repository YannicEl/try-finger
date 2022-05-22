<template>
	<div class="flex flex-1">
		<!-- left column -->
		<Resizable class="w-120 border-r border-gray-200 flex flex-col">
			<Menu class="border-b border-gray-200 h-16" />

			<ListView class="flex-1" />
		</Resizable>

		<!-- right column -->
		<div class="flex flex-1">
			<NuxtPage />
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: ['auth'],
});
</script>

<style scoped lang="scss"></style>
