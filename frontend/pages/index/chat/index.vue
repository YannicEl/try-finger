<template>
	<div class="grid place-items-center flex-1">
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
					<InstantSearch name="chatMember" id="chatMember" v-model="chatMember" />
				</label>

				<button type="button" btn primary @click="addMember">Add</button>
			</div>

			<div v-for="{ uid, name } in form.chatMembers" :key="uid">
				{{ name }}
			</div>

			<button btn primary>Start Chat</button>
		</form>
	</div>
</template>

<script setup lang="ts">
const chatMember = ref<{ uid: string; name: string } | null>(null);

const form = ref<{
	chatName: string;
	chatMembers: { uid: string; name: string }[];
}>({
	chatName: '',
	chatMembers: [],
});

const addMember = () => {
	console.log(chatMember.value);

	if (!chatMember.value) return;

	form.value.chatMembers.push(chatMember.value);
	chatMember.value = null;
};

const submit = async () => {
	console.log(form.value);

	const { chatName, chatMembers } = form.value;
	if (!chatName || !chatMembers.length) return;

	const { uid } = useStore();

	const chatDb = useDbChat();
	const chatRef = await chatDb.add({
		name: chatName,
		members: [...chatMembers.map((e) => e.uid), uid],
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
