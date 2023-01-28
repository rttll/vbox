<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useVBoxStore } from '../stores/vbox';

const log = console.log;

const { field, inc, dec } = defineProps(['field', 'inc', 'dec']);
const store = useVBoxStore();
const values = storeToRefs(store);

const value = computed(() => values.vbox.value[field]);

const onClick = () => {
  const v = inc ? value.value + 1 : value.value - 1;
  store.$patch({ vbox: { ...{ [field]: v } } });
};
</script>

<template>
  <div class="space-y-1">
    <a
      href="#"
      class="flex w-6 h-6 rounded-full hover:bg-slate-200 transition-colors"
      @click.prevent="onClick"
    >
      <span class="m-auto">{{ inc ? '+' : '-' }}</span>
    </a>
  </div>
</template>
