<template>
	<select :name="name" :id="name" @change="onChange">
		<option v-for="template in templatesList">
			{{ template }}
		</option>
	</select>
</template>

<script setup lang="ts">
import { templates as templatesList } from '~~/composables/messages';

const { name } = defineProps<{ name: string }>();

const emit = defineEmits<{
	(event: 'update:modelValue', value: string): void;
}>();

const onChange = (result: Event) => {
	emit('update:modelValue', (result.target as HTMLSelectElement).value);
};
</script>
