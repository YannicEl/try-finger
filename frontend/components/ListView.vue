<template>
	<div class="overflow-y-auto">
		<div @click="log">log</div>
		<NuxtLink
			v-for="{ id, name, lastMsg } in chats"
			:key="id"
			:to="'/chat/' + id"
			class="flex flex-col px-4 py-2 hover:bg-gray-100"
		>
			<div class="font-bold">{{ name }}</div>
			<div>{{ lastMsg }}</div>
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
import { JoinedChats } from '~~/types/joinedChats';

let chats = ref<JoinedChats[]>([]);

if (process.client) {
	const uid = 'JxrDqFR8wGRCJ1qvkuBFe58cvaQ2';
	const { listRef } = useDbJoinedChats(uid);

	chats = listRef();
}

const log = () => {
	console.log(chats.value);
};
</script>

<style scoped lang="scss"></style>
