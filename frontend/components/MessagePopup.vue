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

        <form v-if="isSelectingWord" class="bg-blue-500 p-12 h-[70vh] flex">
            <ul class="flex-1">
                <li class="cursor-pointer" v-for="(word, key) in wordsList" @click="selectCategory(key)">
                    {{ key }}
                </li>
            </ul>
            <ul class="overflow-y-auto flex-1">
                <li class="cursor-pointer" v-for="(word, key) in wordsList[selectedCategory]" @click="selectWord(word)">
                    {{ word }}
                </li>
            </ul>
        </form>
    </Modal>
</template>

<script setup lang="ts">
import { templates as templatesList, words as wordsList } from '~~/composables/messages';
import Modal from '~~/components/Modal.vue';
const modal = ref<InstanceType<typeof Modal>>(null);

const template = ref('');

const isSelectingWord = ref(false);
const selectedCategory = ref('');
const selectedWord = ref('');

const selectCategory = (key: string) => {
    selectedCategory.value = key;
}

const selectWord = (word: string) => {
    selectedWord.value = word;
    isSelectingWord.value = false;
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