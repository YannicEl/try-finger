<template>
	<div class="flex gap-4 flex-col p-4">
		<div>Chat: {{ chat?.name }}</div>

		<div class="flex-1 overflow-y-auto">
			<div v-for="{ id, message } in messages" :key="id">
				{{ message }}
			</div>
		</div>

		<div class="flex 1">
			<label for="templates">
				<span>Templates</span>
				<select v-model="template" id="template">
					<option v-for="template in templatesList">
						{{ template }}
					</option>
				</select>
			</label>

			<label for="words">
				<span>Words</span>
				<select v-model="word" id="word">
					<option v-for="word in wordsList">
						{{ word }}
					</option>
				</select>
			</label>

			<button @click="sendTemplate" primary btn>snedd</button>
		</div>

		<div class="flex h-12">
			<input
				type="text"
				name="message"
				id="message"
				class="flex-1"
				v-model.trim="message"
			/>

			<button primary btn @click="send">sned</button>

			<button primary btn @click="modal.open">open modal</button>
		</div>

		<Modal ref="modal" backdrop-class="bg-black/25">
			<div class="w-40 h-40 bg-red-500 text-2xl">Poggers</div>
		</Modal>
	</div>
</template>

<script setup lang="ts">
import { orderBy } from 'firebase/firestore';
import { templates as templatesList, people as wordsList } from '~~/composables/messages';
import Modal from '~~/components/Modal.vue';

const chatId = <string>useRoute().params.id;

const dbMessages = useDbMessage(chatId);

const template = ref('');
const word = ref('');

const message = ref('');
const messages = dbMessages.listRef([orderBy('createdAt')]);

const chat = useDbChat().getRef(chatId);

const modal = ref<InstanceType<typeof Modal>>(null);

onKeyStroke('Enter', () => send());

const send = async () => {
	dbMessages.add({
		message: message.value,
		sender: useStore().uid,
	});

	message.value = '';
};

const sendTemplate = async () => {
	dbMessages.add({
		message: replaceTemplate(template.value, word.value),
		sender: useStore().uid,
	});
};

const replaceTemplate = (template: string, word: string) => {
	return template.replace('****', word);
};
</script>
