<template>
	<div class="flex-1 grid place-items-center bg-hex-12110f">
		<form @submit.prevent="submit" class="grid gap-4 place-items-center max-w-xl w-full">
			<div class="text-hex-d4d4d3 text-shadow-lg font-bold text-4xl tracking-widest">
				Login
			</div>

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

			<div class="flex gap-4 w-full">
				<button btn secondary type="button" class="w-full" @click="loginAsGuest">
					Continue as guest
				</button>

				<button btn primary class="w-full">Login</button>
			</div>

			<NuxtLink btn secondary to="register">Don't have an account?</NuxtLink>
		</form>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: false,
});

const form = {
	email: '',
	password: '',
};

const submit = async () => {
	const { email, password } = form;
	if (!email || !password) return;

	const auth = useAuth();
	await auth.login(email, password);
};

const loginAsGuest = async () => {
	const auth = useAuth();
	auth.loginAsGuest();
};
</script>

<style scoped lang="scss"></style>
