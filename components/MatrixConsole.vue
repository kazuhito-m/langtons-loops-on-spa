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
          </v-card-actions>
        </v-col>
        <v-col>
          <canvas
            ref="matrixCanvas"
            :width="canvasOneSideSize"
            :height="canvasOneSideSize"
          ></canvas>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LangtonsLoops } from "../src/domain/langtonsloops/LangtonsLoops";
import { CellTypes } from "./matrixconsole/CellTypes";

const recycleTimeSec = ref(0);
const drawingRate = ref(0);
const displayCount = ref(0);
const calculateCount = ref(0);

const canvasOneSideSize = ref(512);
const maxExecuteCount = ref(5000);

const matrixCanvas = ref<HTMLCanvasElement>(null);

const langtonsLoops = LangtonsLoops.of(canvasOneSideSize.value);
const cellTypes = new CellTypes();

const started = ref(false);
let count = 0;

const onClickReset = (): void => resetLangtonsLoops();

const onClickStart = (): void => doLangtonsLoops();

const onClickStop = (): void => stopLangtonsLoops();

function doLangtonsLoops() {
  started.value = true;

  const context = initialRenderCanvasOf(langtonsLoops.lives);

  const timer = setInterval(() => {
    langtonsLoops.update();

    renderCanvasOf(langtonsLoops.lives, context);

    if (count % 100 === 0) console.log("実行回数:", count);
    if (count++ > maxExecuteCount.value) {
      alert("指定した計算回数に達しました。終了します。");
      clearInterval(timer);
    }
    if (!started.value) clearInterval(timer);
  }, 1);
}

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
      context.fillStyle = cellTypes.colorOf(value);
      context.fillRect(x, y, 1, 1);
    }
  }
}

function stopLangtonsLoops() {
  started.value = false;
}

function resetLangtonsLoops() {
  count = 0;
  langtonsLoops.langtonsLoops(canvasOneSideSize.value);
}
</script>

<style scoped>
canvas {
  border: 1px solid;
  border-color: white;
}
</style>
