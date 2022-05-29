<template>
	<div class="overflow-y-auto">
		<NuxtLink
			v-for="{ id, name, lastMsg } in joinedChats"
			:key="id"
			:to="'/chat/' + id"
			class="flex flex-col px-4 py-2 hover:bg-gray-800"
			:class="{ 'bg-gray-800': id === currentChat }"
		>
			<div class="font-bold">{{ name }}</div>
			<div>{{ lastMsg }}</div>
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

const store = useStore();
const { joinedChats, currentChat } = storeToRefs(store);
</script>

<style scoped lang="scss"></style>
