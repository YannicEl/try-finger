<template>
	<Modal ref="modal" backdrop-class="bg-black/25" @close="close(true)">
		<form class="ui-border ui-fade p-4" form @submit.prevent="submit">
			<label for="template">
				<span>Template</span>
				<TemplateSelector name="template" v-model="form.template" />
			</label>

			<label for="word">
				<span>Word</span>
				<WordSelector v-model="form.word" />
			</label>

			<button primary btn>Send</button>
		</form>
	</Modal>
</template>

<script setup lang="ts">
import Modal from '~~/components/Modal.vue';

const props = defineProps<{
	chatId: string;
}>();
const { chatId } = toRefs(props);

const modal = ref<InstanceType<typeof Modal> | null>(null);

const form = ref<{
	template: string;
	word: string;
}>({
	template: '',
	word: '',
});

const submit = () => {
	const { uid } = useStore();

	console.log(form.value);

	const { template, word } = form.value;

	if (!template || !word) return;

	const dbMessage = useDbMessage(chatId.value);

	dbMessage.add({
		message: replaceTemplate(template, word),
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
	form.value.template = '';
	form.value.word = '';
};

defineExpose({
	open,
	close,
});
</script>

<style scoped lang="scss"></style>
