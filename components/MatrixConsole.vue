<template>
  <v-card class="mx-auto">
    <v-container>
      <v-row dense no-gutters>
        <v-col>
          <v-card-text>
            リサイクルタイム:
            <div>
              {{ cycleTime }} 秒 (開始からの総実行時間: {{ totalTime }} 秒)
            </div>
          </v-card-text>
          <v-card-text>
            描画率(表示回数/計算回数):
            <div v-if="displayCount > 0">
              {{ drawingRate }}% ({{ displayCount }}/{{ calculateCount }})
            </div>
            <div v-if="displayCount <= 0">-</div>
          </v-card-text>
          <v-card-text>
            <v-container fluid>
              <v-row dense no-gutters>
                <v-col cols="6">
                  <v-select
                    v-model="limitCountBehavior"
                    :items="limitCountBehaviors"
                    item-title="name"
                    item-value="id"
                    label="計算上限"
                    return-object
                    variant="outlined"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="maxExecuteCount"
                    :disabled="isInfiniteOfLimitCount()"
                    label="上限回数"
                    counter="6"
                    maxlength="6"
                    variant="outlined"
                    leng
                    dense
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" outlined @click="onClickReset">RESET</v-btn>
            <v-btn
              color="primary"
              outlined
              v-if="!isRunning"
              @click="onClickStart"
            >
              START
            </v-btn>
            <v-btn
              color="secondary"
              outlined
              v-if="isRunning"
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
import { LimitCountBehavior } from "./matrixconsole/LimitCountBehavior";

const cycleTime = ref("-");
const totalTime = ref("-");
const drawingRate = ref(0);
const displayCount = ref(0);
const calculateCount = ref(0);
const totalElpasedMs = ref(0);

const canvasOneSideSize = ref(512);
const maxExecuteCount = ref(10000);

const matrixCanvas = ref<HTMLCanvasElement>(null);

const langtonsLoops = LangtonsLoops.of(canvasOneSideSize.value);
const cellTypes = new CellTypes();

const isRunning = ref(false);

watch(displayCount, renderDrawingRate);
watch(totalElpasedMs, renderCycleTime);

const onClickReset = (): void => resetLangtonsLoops();
const onClickStart = (): void => doLangtonsLoops();
const onClickStop = (): void => stopLangtonsLoops();

const limitCountBehavior = ref(LimitCountBehavior.DEFAULT);
const limitCountBehaviors = LimitCountBehavior.all();
const isInfiniteOfLimitCount = () => limitCountBehavior.value.isInfinite();

function doLangtonsLoops() {
  isRunning.value = true;

  initialRenderCanvasOf(langtonsLoops.lives);

  const calculateLoopTimer = setInterval(() => {
    withMeasure(() => {
      langtonsLoops.update();
      calculateCount.value++;
    });

    if (calculateCount.value >= maxExecuteCount.value) {
      isRunning.value = false;
      alert("指定した計算回数に達しました。終了します。");
    }
    if (!isRunning.value) clearInterval(calculateLoopTimer);
  }, 1);

  const rendaringLoopTimer = setInterval(() => {
    renderLives();
    if (!isRunning.value) clearInterval(rendaringLoopTimer);
  }, 200);
}

function stopLangtonsLoops() {
  isRunning.value = false;
}

function resetLangtonsLoops() {
  drawingRate.value = 0;
  calculateCount.value = 1;
  displayCount.value = 0;
  totalElpasedMs.value = 0;
  langtonsLoops.langtonsLoops(canvasOneSideSize.value);
  initialRenderCanvasOf(langtonsLoops.lives);
}

function initialRenderCanvasOf(matrix: number[][]): CanvasRenderingContext2D {
  const canvas = matrixCanvas.value;
  if (canvas.height !== matrix.length) {
    canvas.width = matrix[0].length;
    canvas.height = matrix.length;
  }
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

function withMeasure(actions: () => void): void {
  const startTime = Date.now();

  actions();

  const endTime = Date.now();
  const elapsedMs = endTime - startTime;

  totalElpasedMs.value += elapsedMs;
}

function renderCycleTime(): void {
  const cycleTimeSeconds = totalElpasedMs.value / calculateCount.value / 1000;
  cycleTime.value = formatNumberOf(cycleTimeSeconds, 3);
  totalTime.value = formatNumberOf(totalElpasedMs.value / 1000, 3);
}

function renderDrawingRate(): void {
  const rate = (displayCount.value / calculateCount.value) * 100;
  drawingRate.value = Number(rate.toFixed(0));
}

let drawingLock = false;

function renderLives(): void {
  if (drawingLock) return;
  drawingLock = true;

  initialRenderCanvasOf(langtonsLoops.lives);

  displayCount.value++;
  drawingLock = false;
}

function formatNumberOf(value: number, fractionDigits = 0) {
  return Number(value.toFixed(fractionDigits)).toLocaleString();
}
</script>

<style scoped>
canvas {
  border: 1px solid;
  border-color: white;
}
</style>
