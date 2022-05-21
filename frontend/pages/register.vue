<template>
	<div class="flex-1 grid place-items-center bg-hex-12110f px-4">
		<form form @submit.prevent="submit" class="grid gap-4 place-items-center">
			<div class="text-hex-d4d4d3 text-shadow-lg font-bold text-4xl tracking-widest">
				Register
			</div>

			<label for="username">
				<span>Username</span>
				<input type="text" name="username" id="username" v-model.trim="form.username" />
			</label>

			<label for="email">
				<span>Email</span>
				<input type="email" name="email" id="email" v-model.trim="form.email" />
			</label>

			<label for="password">
				<span>Password</span>
				<input
					type="password"
					name="password"
					id="password"
					v-model.trim="form.password"
				/>
			</label>

			<div class="flex flex-col md:flex-row gap-4 w-full">
				<button
					btn
					secondary
					type="button"
					class="w-full order-2 md:order-1"
					@click="loginAsGuest"
				>
					Continue as guest
				</button>

				<button btn primary class="w-full order-1">Create an Account</button>
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
