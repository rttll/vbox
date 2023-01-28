<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useVBoxStore } from '../stores/vbox';

const log = console.log;

const { field, inc, dec } = defineProps(['field', 'inc', 'dec']);
const store = useVBoxStore();
const values = storeToRefs(store);

const value = computed(() => values[field].value);

const onClick = () => {
  const v = inc ? value.value + 1 : value.value - 1;
  store.$patch({ [field]: v });
};
</script>

<template>
  <div class="space-y-1">
    <a href="#" @click.prevent="onClick">
      {{ inc ? '+' : '-' }}
    </a>
  </div>
</template>
