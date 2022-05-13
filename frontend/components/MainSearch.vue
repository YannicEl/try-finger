<template>
	<input type="text" v-model.trim="query" placeholder="Search" />
</template>

<script setup lang="ts">
const query = ref('');
</script>

<style scoped lang="scss"></style>
