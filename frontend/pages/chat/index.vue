<template>
	<NuxtLayout>
		<div class="grid place-items-center">
			<form form @submit.prevent="submit" class="max-w-xl w-full">
				<div class="text-hex-d4d4d3 text-shadow-lg font-bold text-4xl tracking-widest">
					Add Chat
				</div>

				<label for="chatName">
					<span>Name</span>
					<input type="text" name="chatName" id="chatName" v-model.trim="form.chatName" />
				</label>

				<div class="flex flex-row">
					<label for="chatMember">
						<span>Members</span>
						<input
							type="text"
							name="chatMember"
							id="chatMember"
							v-model.trim="chatMember"
						/>
					</label>

					<button type="button" btn primary @click="addMember">Add</button>
				</div>

				<div v-for="name in form.chatMembers" :key="name">
					{{ name }}
				</div>

				<button btn primary>Start Chat</button>
			</form>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
	middleware: ['auth'],
});

const chatMember = ref('');

const form = ref<{
	chatName: string;
	chatMembers: string[];
}>({
	chatName: '',
	chatMembers: [],
});

const addMember = () => {
	console.log(chatMember, form.value);

	if (!chatMember) return;

	form.value.chatMembers.push(chatMember.value);
	chatMember.value = '';
};

const submit = async () => {
	const uid = 'JxrDqFR8wGRCJ1qvkuBFe58cvaQ2';

	const { chatName, chatMembers } = form.value;
	if (!chatName || !chatMembers.length) return;

	const chatDb = useDbChat();
	const chatRef = await chatDb.add({
		name: chatName,
		members: [...chatMembers, uid],
	});

	const dbJoinedChats = useDbJoinedChats(uid);
	dbJoinedChats.set(chatRef.id, {
		name: chatName,
		lastMsg: 'empty or wqhatvever',
	});

	navigateTo(`/chat/${chatRef.id}`);
};
</script>

<style scoped lang="scss"></style>
