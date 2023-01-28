<script setup>
import { watch, reactive, computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import MotionPathPlugin from 'gsap';
import { useVBoxStore } from '../stores/vbox';

const { log } = console;
const { convertCoordinates } = MotionPathPlugin;

const svg = ref(null);
const path = ref(null);
const store = useVBoxStore();
const values = storeToRefs(store);

const vb = computed(() => {
  let vbox = values.vbox.value;
  return Object.keys(vbox)
    .map((k) => vbox[k])
    .join(' ');
});

onMounted(() => {
  log(path.value.getBBox());
});
</script>

<template>
  <div class="py-4 relative">
    <svg
      ref="svg"
      class="border border-gray-300"
      width="600"
      height="300"
      :viewBox="vb"
    >
      <g id="group">
        <rect id="path" ref="path" width="100" height="100" stroke="red" />
      </g>
    </svg>
  </div>
</template>

<style>
svg::before {
  content: '' attr(width) '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
