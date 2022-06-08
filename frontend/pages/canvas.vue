<template>
    <canvas ref="canvasElm"></canvas>
</template>

<style scoped lang="scss">
canvas {
    width: 100%;
    height: 100%;
}
</style>

<script setup lang="ts">
const canvasElm = ref<HTMLCanvasElement | null>(null)
const colors = ["blue", "red", "green"];

onMounted(() => {
    const canvas = canvasElm.value;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    requestAnimationFrame((now) => render(ctx))
})

const render = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // draw "background"
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);


    requestAnimationFrame((now) => render(ctx))
}
</script>