<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useVBoxStore } from '../stores/vbox';

import Slider from '@vueform/slider';
import '@vueform/slider/themes/default.css';

const log = console.log;

const { field, min, max } = defineProps(['field', 'min', 'max']);
const store = useVBoxStore();
const values = storeToRefs(store);

const value = computed(() => values[field].value);

const onChange = (value) => {
  store.$patch({ [field]: value });
  log(value);
};
</script>

<template>
  <div class="space-y-1">
    <label for="">{{ field }} </label>
    <template v-if="value">
      <input
        type="number"
        :value="value"
        :onChange="
          (e) => {
            onChange(e.target.value);
          }
        "
      />
    </template>

    <Slider
      :lazy="false"
      :tooltips="false"
      :min="min || 0"
      :max="max || 100"
      :value="value"
      @update="onChange"
    />
  </div>
</template>
