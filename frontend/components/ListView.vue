<template>
	<div class="overflow-y-auto">
		<div
			v-for="{ title, text } in listItems"
			:key="title"
			class="flex flex-col px-4 py-2"
		>
			<div class="font-bold">{{ title }}</div>
			<div>{{ text }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const { listItems } = useStore();
</script>

<style scoped lang="scss"></style>
