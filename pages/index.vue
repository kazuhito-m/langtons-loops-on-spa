<template>
  <v-container>
    <v-card class="mx-auto">
      <v-container>
        <v-row dense no-gutters>
          <v-col>
            <v-card-text>
              リサイクルタイム:
              <div>9.999秒</div>
            </v-card-text>
            <v-card-text>
              描画率(表示回数/計算回数):
              <div>99% (9999/9999)</div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="error" outlined>RESET</v-btn>
              <v-btn color="primary" outlined>START</v-btn>
              <v-btn color="secondary" outlined>STOP</v-btn>
            </v-card-actions>
          </v-col>
          <v-col>
            <canvas ref="matrixCanvas" width="800" height="800"></canvas>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script setup lang="ts"></script>

<style scoped>
canvas {
  border: 1px solid;
  border-color: white;
}
</style>
