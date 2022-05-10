<template>
	<div class="container grid place-items-center">
		<div class="text-5xl font-semibold text-white">Try Finger</div>
		<div class="mt-4 text-2xl font-semibold text-white italic">But Hole</div>

		<form @submit.prevent="submit" class="flex flex-col">
			<div class="mt-4 text-lg text-white">𝒖𝒔𝒆𝒓𝒏𝒂𝒎𝒆 𝒇𝒐𝒓 𝒎𝒚 𝒆𝒍𝒅𝒆𝒏 𝒍𝒐𝒓𝒅</div>
			<input type="text" v-model.trim="username" placeholder="𝖙𝖆𝖗𝖓𝖎𝖘𝖍𝖊𝖉" />

			<div class="mt-4 text-lg text-white">𝒄𝒉𝒂𝒕𝒓𝒐𝒐𝒎 𝒕𝒉𝒚 𝒘𝒉𝒊𝒔𝒉 𝒕𝒐 𝒋𝒐𝒊𝒏</div>
			<input type="text" v-model.trim="chatroom" placeholder="eu-west" />

			<button
				class="mt-4 p-4 hover:rounded-md bg-gray-500 hover:bg-gray-600 transition-all text-white"
				:disabled="loading"
			>
				Register
			</button>
		</form>
	</div>
</template>

<script setup lang="ts">
const username = ref();
const chatroom = ref('eu-west');
const loading = ref(false);

const submit = async () => {
	if (!username.value || !chatroom.value) return;

	loading.value = true;

	const dbUser = useDbUser();
	const dbRoom = useDbRoom();

	const userRef = await dbUser.add({ name: username.value });
	await dbRoom.add({
		name: chatroom.value,
		members: [userRef.id],
	});

	console.log('thy joined');

	loading.value = false;
};
</script>

<style scoped lang="scss"></style>
