<template>
	<div class="relative">
		<input type="text" :name="name" :id="name" v-model="value" @input="search" />

		<div ref="resultDropdown" class="absolute top-12 w-full">
			<div v-for="result in searchResults" :key="result.uid"
				class="bg-white hover:bg-gray-100 transition-colors text-black p-2 cursor-pointer"
				@click="onInput(result)">
				{{ result.name }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { SearchResult } from '~~/composables/useInstantSearch';

const props = defineProps<{
	name: string;
}>();

const { name } = toRefs(props);


const emit = defineEmits<{
	(event: 'update:modelValue', value: SearchResult): void;
}>();

const value = ref<string>('');
const resultDropdown = ref<HTMLDivElement | null>(null);

const { query, searchResults } = useInstantSearch();

const search = (e: InputEvent) => {
	const value = (e.target as HTMLInputElement).value;

	if (!value) return;

	query(value);
};

const resetSearch = (): void => {
	searchResults.value = [];
};

const onInput = (result: SearchResult) => {
	value.value = result.name;
	resetSearch();
	emit('update:modelValue', result);
};

onClickOutside(resultDropdown, () => resetSearch());
</script>
