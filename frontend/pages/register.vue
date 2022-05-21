<template>
	<div class="flex-1 grid place-items-center bg-hex-12110f">
		<form @submit.prevent="submit" class="grid gap-4 place-items-center">
			<div class="text-hex-d4d4d3 text-shadow-lg font-bold text-4xl tracking-widest">
				Register
			</div>

			<label for="username">
				<span>username</span>
				<input type="text" name="username" id="username" v-model.trim="form.username" />
			</label>

			<label for="email">
				<span>email</span>
				<input type="email" name="email" id="email" v-model.trim="form.email" />
			</label>

			<label for="password">
				<span>password</span>
				<input
					type="password"
					name="password"
					id="password"
					v-model.trim="form.password"
				/>
			</label>

			<div class="flex">
				<button btn secondary type="button" @click="loginAsGuest">
					Continue as guest
				</button>

				<button btn primary>Create an Account</button>
			</div>

			<NuxtLink btn secondary to="login">Already have an account?</NuxtLink>
		</form>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: false,
});

const form = {
	username: '',
	email: '',
	password: '',
};

const submit = async () => {
	const { username, email, password } = form;
	if (!username || !email || !password) return;

	const auth = useAuth();
	await auth.register(username, email, password);
};

const loginAsGuest = async () => {
	const auth = useAuth();
	auth.loginAsGuest();
};
</script>

<style scoped lang="scss"></style>
