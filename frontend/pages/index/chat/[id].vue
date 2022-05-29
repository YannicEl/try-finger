<template>
	<div class="flex gap-4 flex-col p-4">
		<div>Chat: {{ chat?.name }}</div>

		<div class="flex-1 overflow-y-auto">
			<div v-for="{ id, message } in messages" :key="id">
				{{ message }}
			</div>
		</div>

		<div class="flex h-12">
			<button primary btn @click="modal?.open">open modal</button>
		</div>

		<MessagePopup ref="modal" :chatId="chatId"></MessagePopup>
	</div>
</template>

<script setup lang="ts">
import { orderBy } from 'firebase/firestore';
import MessagePopup from '~~/components/MessagePopup.vue';

const chatId = <string>useRoute().params.id;

const dbMessages = useDbMessage(chatId);
const messages = dbMessages.listRef([orderBy('createdAt')]);

const chat = useDbChat().getRef(chatId);

const modal = ref<InstanceType<typeof MessagePopup> | null>(null);
</script>
