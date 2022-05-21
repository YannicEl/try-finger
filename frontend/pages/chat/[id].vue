<template>
	<NuxtLayout>
		<div class="flex-1 h-full">
			<div v-for="{ id, message } in messages" :key="id">
				{{ message }}
			</div>
		</div>

		<div class="flex">
			<input type="text" name="message" id="message" v-model.trim="message" />

			<button @click="send" primary btn>sned</button>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
import { orderBy } from 'firebase/firestore';

const dbMessages = useDbMessage(<string>useRoute().params.id);

const message = ref('');
const messages = dbMessages.listRef([orderBy('createdAt')]);

const send = async () => {
	await dbMessages.add({
		message: message.value,
	});

	message.value = '';
};
</script>
