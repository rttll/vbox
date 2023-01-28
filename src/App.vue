<script setup>
import { reactive, computed } from 'vue';

import { useVBoxStore } from './stores/vbox';

import Control from './components/Control.vue';
import Display from './components/Display.vue';

const store = useVBoxStore();

store.$subscribe((_, state) => {
  localStorage.setItem('svg', JSON.stringify(state));
});
</script>

<template>
  <div class="grid grid-cols-2 gap-4 h-screen">
    <section class="space-y-4 p-4">
      <Control :min="-100" :max="300" field="x" />
      <Control :min="-100" :max="300" field="y" />
      <Control :min="10" :max="1000" field="width" />
      <Control :min="10" :max="1000" field="height" />
    </section>
    <section>
      <Display />
    </section>
  </div>
</template>
