<template>
  <canvas ref="mainCanvas" width="512" height="512"></canvas>
</template>

<script setup lang="ts">
import { LangtonsLoops } from "~/src/domain/langtonsloops/LangtonsLoops";
import { LivesCanvasSetting } from "./livescanvas/LivesCanvasSetting";
import { CellTypes } from "./livescanvas/CellTypes";

const mainCanvas = ref<HTMLCanvasElement>();

const cellTypes = new CellTypes();

type Props = {
  langtonsLoops: LangtonsLoops;
  setting: LivesCanvasSetting;
};
const { langtonsLoops, setting } = defineProps<Props>();

function rendering(): CanvasRenderingContext2D {
  const leves = langtonsLoops.lives;
  const canvas = mainCanvas.value;
  const oneSideSize = leves.length * setting.zoom;
  if (canvas.height !== oneSideSize) {
    canvas.width = oneSideSize;
    canvas.height = oneSideSize;
  }
  const context: CanvasRenderingContext2D = canvas.getContext("2d");

  renderCanvasOf(leves, context);

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
  rendering,
});
</script>

<style scoped>
canvas {
  border: 1px solid;
  border-color: white;
  background-color: black;
}
</style>
