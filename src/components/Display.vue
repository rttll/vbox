<script setup>
import { watch, reactive, computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { MotionPathPlugin } from 'gsap/all';
import { useVBoxStore } from '../stores/vbox';

const { log } = console;
const { convertCoordinates } = MotionPathPlugin;

const store = useVBoxStore();
const values = storeToRefs(store);

const svg = ref(null);
const path = ref(null);
const path2 = ref(null);

const vb = computed(() => {
  let vbox = values.vbox.value;
  return Object.keys(vbox)
    .map((k) => vbox[k])
    .join(' ');
});

onMounted(() => {
  // const a = convertCoordinates(path.value, path2.value, { x: 0, y: 0 });
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
        <rect ref="path2" width="100" height="100" x="0" y="0" fill="blue" />
        <rect
          id="path"
          ref="path"
          width="100"
          height="100"
          x="10"
          y="10"
          data-x="10"
          data-y="10"
        />
      </g>
    </svg>
  </div>
</template>
