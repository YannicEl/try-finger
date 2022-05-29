<template>
    <Modal ref="modal" backdrop-class="bg-black/25">
        <form form v-if="!isSelectingWord" class="bg-red-500 p-12 max-h-9/10">
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

            <button primary btn type="button" id="send" @click="sendMessage">
                Send
            </button>
        </form>

        <form v-if="isSelectingWord" class="bg-blue-500 p-12 h-[70vh] flex flex-col">
            <input type="text" id="search" v-model="searchTerm" @input="search" autocomplete="off" />
            <ul>
                <li class="cursor-pointer" v-for="res in searchResults" @click="selectWordFromSearch(res)">
                    {{ Object.entries(res)[0][0] }} > {{ Object.entries(res)[0][1][0] }}
                </li>
            </ul>

            <div class="flex">
                <ul class="flex-1">
                    <li class="cursor-pointer" v-for="(word, key) in wordsList" @click="selectCategory(key)">
                        {{ key }}
                    </li>
                </ul>
                <ul class="overflow-y-auto flex-1">
                    <li class="cursor-pointer" v-for="(word, key) in wordsList[selectedCategory]"
                        @click="selectWord(word)">
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
    [key: string]: string[]
}

const modal = ref<InstanceType<typeof Modal>>(null);

const searchTerm = ref('')
const searchResults = ref();

const search = (e: InputEvent) => {
    const searchTerm = (e.target as HTMLInputElement).value;

    if (!searchTerm) {
        searchResults.value = [];
        return;
    }

    searchResults.value = Object.entries(wordsList).map(([key, value]) => {
        const filtered = value.filter((e) => e.indexOf(searchTerm) !== -1)

        return filtered.length ? { [key]: filtered } : null;
    }).filter((el) => !!el);
}

const template = ref('');

const selectedWord = ref('');
const isSelectingWord = ref(false);
const selectedCategory = ref('');


const selectCategory = (key: string) => {
    selectedCategory.value = key;
}

const selectWord = (word: string) => {
    selectedWord.value = word;
    isSelectingWord.value = false;
}

const selectWordFromSearch = (res: SearchResult) => {
    console.log(res);
    searchResults.value = [];
    selectWord(Object.entries(res)[0][1][0]);
}

const sendMessage = () => {
    console.log(replaceTemplate(template.value, selectedWord.value))
}

const replaceTemplate = (template: string, word: string) => {
    return template.replace('****', word);
};

const open = () => {
    modal.value.open();
}

const close = () => {
    modal.value.close();
}

defineExpose({
    open,
    close,
});
</script>

<style scoped lang="scss">
</style>