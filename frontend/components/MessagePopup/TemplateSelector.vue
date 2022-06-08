<template>
	<select :name="name" :id="name" @change="onChange">
		<option v-for="template in templatesList">
			{{ template }}
		</option>
	</select>
</template>

<script setup lang="ts">
import { templates as templatesList } from '~~/composables/messages';

const props = defineProps<{
	name: string;
}>();

const emit = defineEmits<{
	(event: 'update:modelValue', value: string): void;
}>();

const onChange = (result: string) => {
	emit('update:modelValue', result.target.value);
};
</script>
