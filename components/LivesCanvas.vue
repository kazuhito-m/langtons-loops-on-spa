<template>
  <canvas ref="mainCanvas" width="512" height="512"></canvas>
</template>

<script setup lang="ts">
import { LivesCanvasSetting } from "./livescanvas/LivesCanvasSetting";
import { CellTypes } from "./matrixconsole/CellTypes";

const mainCanvas = ref<HTMLCanvasElement>();

const cellTypes = new CellTypes();

type Props = {
  setting: LivesCanvasSetting;
};
const { setting } = defineProps<Props>();

function renderCanvasWithResizeOf(
  matrix: number[][]
): CanvasRenderingContext2D {
  console.log("zoom:",setting.zoom);

  const canvas = mainCanvas.value;
  const oneSideSize = matrix.length * setting.zoom;
  if (canvas.height !== oneSideSize) {
    canvas.width = oneSideSize;
    canvas.height = oneSideSize;
  }
  const context: CanvasRenderingContext2D = canvas.getContext("2d");

  renderCanvasOf(matrix, context);

  return context;
}

function renderCanvasOf(
  matrix: number[][],
  context: CanvasRenderingContext2D
): void {
  const ratio = setting.zoom;
  const totalSize = matrix.length * ratio;
  context.clearRect(0, 0, totalSize, totalSize);
  context.beginPath();
  for (let y = 0; y < matrix.length; y++) {
    const line = matrix[y];
    for (let x = 0; x < line.length; x++) {
      const value = line[x];
      if (value === 0) continue;
      context.fillStyle = cellTypes.colorOf(value);
      context.fillRect(x * ratio, y * ratio, ratio, ratio);
    }
  }
}
defineExpose({
  renderCanvasWithResizeOf,
});
</script>

<style scoped>
canvas {
  border: 1px solid;
  border-color: white;
  background-color: black;
}
</style>
