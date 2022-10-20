<template>
  <div class="o">
    <!-- 容器 -->
    <div class="pan-loading">
      <!-- 食物，加载圈 -->
      <div class="loading"> <span>正</span><span>在</span><span>加</span><span>载</span> </div>
      <!-- 平底锅 -->
      <div class="pan-container">
        <!-- 锅面 -->
        <div class="pan"></div>
        <!-- 锅把 -->
        <div class="handle"></div>
      </div>
      <!-- 炉子 -->
      <div class="shadow"></div>
    </div>
  </div>
</template>
<style scoped>
@import '../css/components/loadView.css';
@import 'https://unpkg.com/vue-loaders/dist/vue-loaders.css';
</style>
