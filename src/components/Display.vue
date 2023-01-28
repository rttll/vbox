<script setup>
import { reactive, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useVBoxStore } from '../stores/vbox';

const store = useVBoxStore();
const values = storeToRefs(store);

const vb = computed(() => {
  return Object.keys(values)
    .map((k) => values[k].value)
    .join(' ');
});
</script>

<template>
  <div class="py-4">
    <svg class="border border-gray-300" width="300" height="300" :viewBox="vb">
      <g>
        <path
          d="m150 0 35.41 108.98H300l-92.71 67.36 35.42 108.98L150 217.96l-92.71 67.36 35.42-108.98L0 108.98h114.59L150 0z"
        />
      </g>
    </svg>
  </div>
</template>
