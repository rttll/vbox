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

const getCoordinate = (x, y, sctm = null, transform = null) => {
  const p = new DOMPoint(x, y);
  let screenTransform;
  if (sctm === null) {
    screenTransform = document.getElementById('group').getScreenCTM();
  } else {
    screenTransform = sctm;
  }
  // now invert it, so we can transform from screen/viewport to element
  const inverseScreenTransform = screenTransform.inverse();

  // transform the point using the inverted matrix
  const transformedPoint = p.matrixTransform(inverseScreenTransform);

  // adjust the point for the currently applied scale on the element
  if (transform !== null) {
    transformedPoint.x *= transform[0]; // scale x
    transformedPoint.y *= transform[3]; // scale y
  }

  return { x: transformedPoint.x, y: transformedPoint.y };
};

watch(values.vbox.value, () => {
  const rect = path.value.getBoundingClientRect();
  // const c = getCoordinate(rect.x, rect.y);
  // log(c);

  log(MotionPathPlugin);
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
        <rect id="to" ref="to" width="10" height="10" x="-100" y="0" />
        <rect id="path" ref="path" width="100" height="100" stroke="red" />
        <!-- <path
          d="m150 0 35.41 108.98H300l-92.71 67.36 35.42 108.98L150 217.96l-92.71 67.36 35.42-108.98L0 108.98h114.59L150 0z"
        /> -->
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
