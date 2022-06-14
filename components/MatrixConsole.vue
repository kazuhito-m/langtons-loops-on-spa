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
            <div v-if="!isStatusOfReseted()">
              {{ drawingRate }}% ({{ displayCount }}/{{ calculateCount }})
            </div>
            <div v-if="isStatusOfReseted()">-</div>
          </v-card-text>
          <v-card-text>
            <v-container fluid>
              <v-row dense no-gutters>
                <v-col>
                  <v-text-field
                    v-model="worldOneSideSize"
                    :disabled="isRunning || !isStatusOfReseted()"
                    @keypress="numberOnlyKeyPressFilter"
                    label="世界の大きさ(CanvasSize)※RESETで反映"
                    :rules="[validateCanvasOneSideSizeOf]"
                    counter="3"
                    maxlength="3"
                    variant="outlined"
                    leng
                    dense
                  />
                </v-col>
              </v-row>
              <v-row dense no-gutters>
                <v-col cols="6">
                  <v-select
                    v-model="limitCountBehavior"
                    :items="limitCountBehaviors"
                    item-title="name"
                    item-value="id"
                    :disabled="isRunning"
                    label="計算上限"
                    return-object
                    variant="outlined"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="maxExecuteCount"
                    :disabled="isRunning || isInfiniteOfLimitCount()"
                    @keypress="numberOnlyKeyPressFilter"
                    label="上限回数"
                    counter="6"
                    maxlength="6"
                    variant="outlined"
                    leng
                    dense
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <div class="text-caption">拡大率 : {{ zoomParcent }} %</div>
                  <v-slider
                    v-model="zoomParcent"
                    thumb-label
                    min="100"
                    max="300"
                    step="1"
                  ></v-slider>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" outlined @click="onClickReset">RESET</v-btn>
            <v-btn
              :color="isDisableStart() ? 'disable' : 'primary'"
              outlined
              v-if="!isRunning"
              :disabled="isDisableStart()"
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
          <LivesCanvas
            ref="livesCanvas"
            :setting="canvasSetting"
            :langtonsLoops="langtonsLoops"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LangtonsLoops } from "../src/domain/langtonsloops/LangtonsLoops";
import { LimitCountBehavior } from "./matrixconsole/LimitCountBehavior";
import { LivesCanvasSetting } from "./livescanvas/LivesCanvasSetting";

const PERCENTAGE = 100;

const cycleTime = ref("-");
const totalTime = ref("-");
const drawingRate = ref(0);
const displayCount = ref(0);
const calculateCount = ref(0);
const totalElpasedMs = ref(0);

const worldOneSideSize = ref(512);
const maxExecuteCount = ref(10000);

const livesCanvas = ref(null);

const zoomParcent = ref(PERCENTAGE);
const canvasSetting: LivesCanvasSetting = {
  zoom: 1,
};

const langtonsLoops = LangtonsLoops.of(worldOneSideSize.value);

const isRunning = ref(false);

watch(displayCount, renderDrawingRate);
watch(totalElpasedMs, renderCycleTime);
watch(zoomParcent, renderLives);

const onMounted = () => resetLangtonsLoops();

const onClickReset = (): void => resetLangtonsLoops();
const onClickStart = (): void => doLangtonsLoops();
const onClickStop = (): void => stopLangtonsLoops();

const limitCountBehavior = ref(LimitCountBehavior.DEFAULT);
const limitCountBehaviors = LimitCountBehavior.all();
const isInfiniteOfLimitCount = () => limitCountBehavior.value.isInfinite();

function doLangtonsLoops() {
  isRunning.value = true;

  if (isStatusOfReseted()) resetLangtonsLoops();

  renderLives();
  displayCount.value++;

  const calculateLoopTimer = setInterval(() => {
    withMeasure(() => {
      langtonsLoops.update();
      calculateCount.value++;
    });

    if (isOverLimit()) {
      isRunning.value = false;
      alert("指定した計算回数に達しました。終了します。");
    }
    if (!isRunning.value) clearInterval(calculateLoopTimer);
  }, 1);

  const rendaringLoopTimer = setInterval(() => {
    renderLives();
    displayCount.value++;
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
  langtonsLoops.langtonsLoops(worldOneSideSize.value);
  renderLives();
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
  canvasSetting.zoom = zoomParcent.value / PERCENTAGE;

  if (drawingLock) return;
  drawingLock = true;

  livesCanvas.value.rendering();

  drawingLock = false;
}

const isOverLimit = () =>
  !isInfiniteOfLimitCount() && calculateCount.value >= maxExecuteCount.value;

const isDisableStart = () =>
  isOverLimit() || validateCanvasOneSideSizeOf(worldOneSideSize.value) !== true;

function formatNumberOf(value: number, fractionDigits = 0) {
  return Number(value.toFixed(fractionDigits)).toLocaleString();
}

function numberOnlyKeyPressFilter(event: KeyboardEvent): boolean {
  if ("0123456789".includes(event.key)) return true;

  event.stopImmediatePropagation();
  event.preventDefault();
  return false;
}

const validateCanvasOneSideSizeOf = (value: any): any => {
  if (!value) return "入力してください。";
  if (isNaN(value)) return "数値を入力してください。";
  const size = value as number;
  if (size < LangtonsLoops.MIN_SIZE || size > LangtonsLoops.MAX_SIZE)
    return `${LangtonsLoops.MIN_SIZE} から ${LangtonsLoops.MAX_SIZE} の範囲で入力してください。`;
  return true;
};

const isStatusOfReseted = () => displayCount.value <= 0;
</script>

<style scoped>
canvas {
  border: 1px solid;
  border-color: white;
  background-color: black;
}
</style>
