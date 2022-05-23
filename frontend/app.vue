<template>
	<div
		class="h-full 2xl:h-[95%] w-full 2xl:max-w-[1400px] rounded overflow-hidden bg-hex-12110f shadow flex"
	>
		<NuxtPage />
	</div>
</template>

<script setup lang="ts">
import { User, add } from '@try-finger/lib';

const user: User = { name: '1' };

console.log(user);

const sum = add(1, 2);

console.log(sum);
</script>

<style scoped lang="scss"></style>
