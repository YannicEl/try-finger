<template>
	<div class="flex-1 grid place-items-center bg-hex-12110f">
		<form @submit.prevent="submit" class="grid gap-4 place-items-center">
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

			<div class="flex">
				<button
					type="button"
					class="py-2 px-8 border border-white rounded-sm shadow-md shadow-white/30"
					@click="loginAsGuest"
				>
					Continue as guest
				</button>

				<button
					class="py-2 px-8 border border-white rounded-sm shadow-md shadow-white/30"
				>
					Login
				</button>
			</div>

			<NuxtLink to="register">Don't have an account?</NuxtLink>
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
	const auth = useAuth();

	console.log('form submitted');

	console.log(form);

	const { email, password } = form;
	await auth.login(email, password);
};

const loginAsGuest = async () => {
	const auth = useAuth();
	auth.loginAsGuest();
};
</script>

<style scoped lang="scss"></style>
