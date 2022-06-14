<template>
  <canvas ref="mainCanvas" width="512" height="512"></canvas>
</template>

<script setup lang="ts">
import { LangtonsLoops } from "~/src/domain/langtonsloops/LangtonsLoops";
import { LivesCanvasSetting } from "./livescanvas/LivesCanvasSetting";
import { Rect } from "./livescanvas/Rect";

const mainCanvas = ref<HTMLCanvasElement>();

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

  let debugValueCount = 0;

  const rects: Rect[] = [];

  for (let y = 0; y < matrix.length; y++) {
    const line = matrix[y];

    let rect: Rect | null = null;

    for (let x = 0; x < line.length; x++) {
      const value = line[x];

      if (value === 0) {
        if (rect !== null) {
          rects.push(rect);
          rect = null;
        }
      } else {
        debugValueCount++;

        if (rect === null) {
          rect = Rect.dotOf(x, y, ratio, value);
        } else {
          if (rect.colorType === value) {
            rect = rect.expandSideways();
          } else {
            rects.push(rect);
            rect = Rect.dotOf(x, y, ratio, value);
          }
        }
      }
    }

    if (rect !== null) rects.push(rect);
  }

  console.log("rect:" + rects.length + ", valueCount:" + debugValueCount);

  context.clearRect(0, 0, totalSize, totalSize);
  context.beginPath();
  for (const rect of rects) {
    context.fillStyle = rect.color();
    context.fillRect(rect.calcX(), rect.calcY(), rect.calcW(), rect.calcH());
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
