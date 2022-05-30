<template>
	<div v-if="chat" class="flex gap-4 flex-col p-4">
		<div>Chat: {{ chat?.name }}</div>

		<div class="flex-1 overflow-y-auto">
			<div v-for="{ id, message, createdAt } in chat.messages" :key="id">
				{{ message }} {{ createdAt.toLocaleTimeString() }}
			</div>
		</div>

		<div class="flex h-12">
			<button primary btn @click="modal?.open">open modal</button>
		</div>

		<MessagePopup ref="modal" :chatId="chat.id"></MessagePopup>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import MessagePopup from '~~/components/MessagePopup/MessagePopup.vue';

const modal = ref<InstanceType<typeof MessagePopup> | null>(null);

const store = useStore();
const { getChat: chat } = storeToRefs(store);
</script>
