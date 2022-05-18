<template>
	<div
		class="h-full 2xl:h-[95%] w-full 2xl:max-w-[1400px] rounded overflow-hidden bg-white shadow flex"
	>
		<!-- left column -->
		<Resizable class="w-120 border-r border-gray-200 flex flex-col">
			<Menu class="border-b border-gray-200 h-16" />

			<ListView class="flex-1" />
		</Resizable>

		<!-- right column -->
		<div class="flex-1 grid">
			<NuxtPage />
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
