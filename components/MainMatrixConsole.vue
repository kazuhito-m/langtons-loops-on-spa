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
            <div>
              {{ drawingRate }}% ({{ displayCount }}/{{ calculateCount }})
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              :color="started ? 'disable' : 'error'"
              outlined
              :disabled="started"
              @click="onClickReset"
            >
              RESET
            </v-btn>
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
            :width="canvasWidth"
            :height="canvasHegith"
          ></canvas>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
const recycleTimeSec = ref(0);
const drawingRate = ref(0);
const displayCount = ref(0);
const calculateCount = ref(0);

const canvasWidth = ref(300);
const canvasHegith = ref(300);

const started = ref(false);

const onClickReset = (): void => {
  alert("Restクリックイベントよ。");
};

const onClickStart = (): void => {
  started.value = true;
};

const onClickStop = (): void => {
  started.value = false;
};
</script>

<style scoped>
canvas {
  border: 1px solid;
  border-color: white;
}
</style>
