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

		<form v-if="isSelectingWord" class="p-12 h-[70vh] flex flex-col border">
			<input
				type="text"
				id="search"
				v-model="searchTerm"
				@input="search"
				autocomplete="off"
			/>
			<ul>
				<li
					btn
					primary
					class="cursor-pointer"
					v-for="res in searchResults"
					@click="selectWordFromSearch(res)"
				>
					{{ Object.keys(res)[0] }} >> {{ Object.values(res)[0][0] }}
				</li>
			</ul>

			<div class="flex max-h-full">
				<ul class="overflow-y-auto flex-1">
					<li
						btn
						primary
						class="cursor-pointer my-2"
						v-for="(word, key) in wordsList"
						@click="selectCategory(key)"
					>
						{{ key }}
					</li>
				</ul>
				<ul class="overflow-y-auto flex-1 ml-4">
					<li
						btn
						primary
						class="cursor-pointer my-2"
						v-for="(word, key) in wordsList[selectedCategory]"
						@click="selectWord(word)"
					>
						{{ word }}
					</li>
				</ul>
			</div>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import { templates as templatesList, words as wordsList } from '~~/composables/messages';
import Modal from '~~/components/Modal.vue';

interface SearchResult {
	[key: string]: string[];
}

const props = defineProps<{
	chatId: string;
}>();

const { chatId } = toRefs(props);
const dbMessage = useDbMessage(chatId.value);

const modal = ref<InstanceType<typeof Modal> | null>(null);
const searchTerm = ref('');
const searchResults = ref();

const template = ref('');

const selectedWord = ref('');
const isSelectingWord = ref(false);
const selectedCategory = ref('');

const search = (e: InputEvent) => {
	const searchTerm = (e.target as HTMLInputElement).value;

	if (!searchTerm) {
		searchResults.value = [];
		return;
	}

	searchResults.value = Object.entries(wordsList)
		.map(([key, value]) => {
			const filtered = value.filter((e) => e.indexOf(searchTerm) !== -1);

			return filtered.length ? { [key]: filtered } : null;
		})
		.filter((el) => !!el);
};

const selectCategory = (key: string) => {
	selectedCategory.value = key;
};

const selectWord = (word: string) => {
	selectedWord.value = word;
	isSelectingWord.value = false;
};

const selectWordFromSearch = (res: SearchResult) => {
	console.log(res);
	searchResults.value = [];
	selectWord(Object.values(res)[0][0]);
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
	selectedCategory.value = '';
	template.value = '';
};

defineExpose({
	open,
	close,
});
</script>

<style scoped lang="scss"></style>
