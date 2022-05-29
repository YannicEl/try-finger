<template>
	<form class="p-12 h-[70vh] flex flex-col border">
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
</template>

<script setup lang="ts">
import { words as wordsList } from '~~/composables/messages';
const searchTerm = ref('');
const searchResults = ref();
const selectedCategory = ref('');

interface SearchResult {
	[key: string]: string[];
}

const selectCategory = (key: string) => {
	selectedCategory.value = key;
};

const selectWord = (word: string) => {
	emit('select-word', word);
};

const selectWordFromSearch = (res: SearchResult) => {
	searchResults.value = [];
	selectWord(Object.values(res)[0][0]);
};

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

const emit = defineEmits<{
	(e: 'select-word', value: string): void;
}>();
</script>
