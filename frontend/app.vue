<template>
	<div class="w-screen h-screen">
		<div
			class="holder grid place-items-center bg-gradient-to-br from-green-500 to-blue-500"
		>
			<audio ref="audio" src="E_L_D_E_N_R_I_N_G_O_S_T_O_H_N_E_S_P_A_C_E_S.mp3"></audio>
			<button @click="play" class="flex">
				play
				<div class="i-mdi-play text-3xl bg-black"></div>
			</button>
			<NuxtPage />
		</div>
	</div>
</template>

<script setup lang="ts">
const audio = ref<HTMLAudioElement>();

const play = () => {
	audio.value.play();
};
</script>
