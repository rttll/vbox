<script setup>
import { watch, reactive, computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/all';

import { useVBoxStore } from '../stores/vbox';

window.gsap = gsap;

const { log } = console;
const { convertCoordinates } = MotionPathPlugin;

const store = useVBoxStore();
const values = storeToRefs(store);

const svg = ref(null);
const path = ref(null);
const path2 = ref(null);

const vb = computed(() => {
  const vbox = values.vbox.value;
  return Object.keys(vbox)
    .map((k) => vbox[k])
    .join(' ');
});

// const bbox = computed(() => {
//   // const a = convertCoordinates(path.value, path2.value, { x: 0, y: 0 });
//   if (path.value === null) return null;
//   return path.value.getBBox();
// });

// watch(vb, () => {
//   const vbox = values.vbox.value;
//   // log(bbox.value.width);
// });

onMounted(() => {
  // const path = convertToPath(document.getElementById('line'));
  // log(path);
});

const box = [
  [100, 70],
  [500, 70],
  [500, 200],
  [100, 200],
];
</script>

<template>
  <div class="relative">
    <svg
      id="parentSVG"
      class="absolute"
      width="600"
      height="300"
      viewBox="0 0 600 300"
    >
      <path
        id="parent"
        d="M 100,70 L 500,70 L 500,200 L 100,200 z"
        stroke="blue"
        fill="none"
      />
      <rect id="dot" fill="black" x="100" y="70" width="10" height="10" />
    </svg>

    <svg
      id="svg"
      ref="svg"
      class="border border-gray-300 absolute"
      width="600"
      height="300"
      :viewBox="vb"
    >
      <g id="group">
        <!-- <text id="path" ref="path" dominant-baseline="hanging">
          hi there, friend
        </text> -->

        <defs>
          <path id="guide" d="M 100,70 L 500,70 " />
        </defs>

        <text ref="path" id="path" dominant-baseline="hanging">
          <textPath href="#guide">this is the end</textPath>
        </text>
      </g>
    </svg>
  </div>
</template>
