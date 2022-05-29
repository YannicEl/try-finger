<template>
	<div class="flex flex-1">
		<NuxtPage />
	</div>
</template>

<script setup lang="ts">
const route = useRoute();
const store = useStore();

watchEffect(() => {
	store.currentChat = route.params?.id as string;
});
</script>

<style scoped lang="scss"></style>
