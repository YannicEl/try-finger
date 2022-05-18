<template>
	<NuxtLayout>
		<div class="grid place-items-center">
			<SpinnerDots />
			<button @click="add">add</button>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
const add = async () => {
	const { get, updateName } = useDbUser();

	const user = await get('7X5hTSQ9v3Z5aBE0W0x6');

	console.log(user);

	if (!user) return;

	const res = await updateName(user?.id, `${Date.now()}`);
};
</script>

<style lang="scss"></style>
