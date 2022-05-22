<template>
	<NuxtLayout>
		<div class="flex gap-4 flex-col w-full p-4">
			<div>
				{{ chat }}
			</div>

			<div class="flex-1 overflow-y-auto">
				<div v-for="{ id, message } in messages" :key="id">
					{{ message }}
				</div>
			</div>

			<div class="flex h-12">
				<input
					type="text"
					name="message"
					id="message"
					class="flex-1"
					v-model.trim="message"
				/>

				<button @click="send" primary btn>sned</button>
			</div>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
import { orderBy } from 'firebase/firestore';

definePageMeta({
	middleware: ['auth'],
});

const chatId = <string>useRoute().params.id;

const dbMessages = useDbMessage(chatId);

const message = ref('');
const messages = dbMessages.listRef([orderBy('createdAt')]);

const chat = useDbChat().getRef(chatId);

onKeyStroke('Enter', () => send());

const send = async () => {
	dbMessages.add({
		message: message.value,
		sender: useStore().uid!,
	});

	message.value = '';
};
</script>
