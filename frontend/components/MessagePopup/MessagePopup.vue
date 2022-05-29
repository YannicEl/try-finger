<template>
	<Modal ref="modal" backdrop-class="bg-black/25" @close="close(true)">
		<form form v-if="!isSelectingWord" class="p-12 max-h-9/10 border">
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
				<button primary btn type="button" id="words" @click="isSelectingWord = true">
					{{ selectedWord || 'Select' }}
				</button>
			</label>

			<button primary btn type="button" id="send" @click="sendMessage">Send</button>
		</form>

		<WordSelector v-if="isSelectingWord" @select-word="selectWord"></WordSelector>
	</Modal>
</template>

<script setup lang="ts">
import { templates as templatesList } from '~~/composables/messages';
import Modal from '~~/components/Modal.vue';
import WordSelector from '~~/components/MessagePopup/WordSelector.vue';

const props = defineProps<{
	chatId: string;
}>();

const { chatId } = toRefs(props);
const dbMessage = useDbMessage(chatId.value);

const modal = ref<InstanceType<typeof Modal> | null>(null);

const template = ref('');

const selectedWord = ref('');
const isSelectingWord = ref(false);

const selectWord = (word: string) => {
	selectedWord.value = word;
	isSelectingWord.value = false;
};

const sendMessage = async () => {
	const { uid } = useStore();

	dbMessage.add({
		message: replaceTemplate(template.value, selectedWord.value),
		sender: uid,
	});

	close();
};

const replaceTemplate = (template: string, word: string) => {
	return template.replace('****', word);
};

const open = () => {
	modal.value?.open();
};

const close = (fromEvent = false) => {
	if (!fromEvent) modal.value?.close();
	reset();
};

const reset = () => {
	isSelectingWord.value = false;
	selectedWord.value = '';
	template.value = '';
};

defineExpose({
	open,
	close,
});
</script>

<style scoped lang="scss"></style>
