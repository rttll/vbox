<script setup>
import { reactive, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useVBoxStore } from './stores/vbox';

import Control from './components/Control.vue';
import Display from './components/Display.vue';
import LinkControl from './components/LinkControl.vue';

const store = useVBoxStore();
const values = storeToRefs(store);
const { reset } = store;

store.$subscribe((_, state) => {
  localStorage.setItem('svg', JSON.stringify(state));
});

const vb = computed(() => {
  let vbox = values.vbox.value;
  return Object.keys(vbox)
    .map((k) => vbox[k])
    .join(' ');
});
</script>

<template>
  <div class="grid grid-rows-2 gap-4 h-screen">
    <section>
      <Display />
    </section>
    <section class="space-y-4 p-4">
      <Control :min="-300" :max="300" field="x" />
      <Control :min="-300" :max="300" field="y" />

      <div class="flex space-x-2 items-center">
        <LinkControl field="width" />
        <Control
          :min="10"
          :max="1000"
          field="width"
          link="height"
          key="width"
        />
      </div>

      <div class="flex space-x-2 items-center">
        <LinkControl field="height" />
        <Control
          :min="10"
          :max="1000"
          field="height"
          link="width"
          key="height"
        />
      </div>
      <div>
        {{ vb }}
      </div>
      <div>
        <a href="#" @click.prevent="reset">Reset</a>
      </div>
    </section>
  </div>
</template>
