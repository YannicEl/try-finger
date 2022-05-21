<template>
	<NuxtLayout>
		<p>{{ $route.params.id }}temptemp</p>
	</NuxtLayout>
</template>


<script setup lang="ts">
console.log(useRoute().params)
</script>