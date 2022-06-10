<template>
  <v-card class="mx-auto">
    <v-container>
      <v-row dense no-gutters>
        <v-col>
          <v-card-text>
            リサイクルタイム:
            <div>{{ recycleTimeSec }} 秒</div>
          </v-card-text>
          <v-card-text>
            描画率(表示回数/計算回数):
            <div v-if="calculateCount > 0">
              {{ drawingRate }}% ({{ displayCount }}/{{ calculateCount }})
            </div>
            <div v-if="calculateCount <= 0">-</div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" outlined @click="onClickReset">RESET</v-btn>
            <v-btn
              color="primary"
              outlined
              v-if="!started"
              @click="onClickStart"
            >
              START
            </v-btn>
            <v-btn
              color="secondary"
              outlined
              v-if="started"
              @click="onClickStop"
            >
              STOP
            </v-btn>
            <v-btn color="red" outlined @click="onClickTest"> TEST </v-btn>
          </v-card-actions>
        </v-col>
        <v-col>
          <canvas
            ref="matrixCanvas"
            :width="canvasWidth"
            :height="canvasHeight"
          ></canvas>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { nextTick } from "vue";
import { LangtonsLoops } from "../src/domain/langtonsloops/LangtonsLoops";

const recycleTimeSec = ref(0);
const drawingRate = ref(0);
const displayCount = ref(0);
const calculateCount = ref(0);

const canvasWidth = ref(512);
const canvasHeight = ref(512);

const started = ref(false);

const matrixCanvas = ref<HTMLCanvasElement>(null);

const onClickReset = (): void => alert("Restクリックイベントよ。");

const onClickStart = (): void => {
  started.value = true;
  nextTick(() => {
    setTimeout(() => {
      for (let i = 0; i < 100000; i++) {
        console.log(i);
        if (!started.value) break;
      }
      started.value = false;
    }, 10);
  });
};

const onClickStop = (): void => {
  started.value = false;
};

const onClickTest = (): void => {
  const langtonsLoops = new LangtonsLoops();
  langtonsLoops.langtonsLoops(300);
  const context = initialRenderCanvasOf(langtonsLoops.lives);
  for (let i = 0; i < 250; i++) {
    langtonsLoops.update();
    renderCanvasOf(langtonsLoops.lives, context);
  }
};

function initialRenderCanvasOf(matrix: number[][]): CanvasRenderingContext2D {
  const canvas = matrixCanvas.value;
  canvas.width = matrix[0].length;
  canvas.height = matrix.length;
  const context: CanvasRenderingContext2D = canvas.getContext("2d");

  renderCanvasOf(matrix, context);

  return context;
}

function renderCanvasOf(
  matrix: number[][],
  context: CanvasRenderingContext2D
): void {
  context.clearRect(0, 0, matrix[0].length, matrix.length);
  context.beginPath();
  for (let y = 0; y < matrix.length; y++) {
    const line = matrix[y];
    for (let x = 0; x < line.length; x++) {
      const value = line[x];
      if (value === 0) continue;
      context.fillStyle = "white";
      context.fillRect(x, y, 1, 1);
    }
  }
}
</script>

<style scoped>
canvas {
  border: 1px solid;
  border-color: white;
}
</style>
