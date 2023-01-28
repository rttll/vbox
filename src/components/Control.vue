<script setup>
import { computed, watch } from 'vue';
import { storeToRefs } from 'pinia';

import Slider from '@vueform/slider';
import '@vueform/slider/themes/default.css';

import { useVBoxStore } from '../stores/vbox';
import Stepper from './Stepper.vue';

import { defaults } from '../stores/vbox';

const log = console.log;

const { field, min, max, link } = defineProps(['field', 'min', 'max', 'link']);
const store = useVBoxStore();
const refs = storeToRefs(store);

const vbox = refs.vbox.value;
const value = computed(() => vbox[field]);

const onChange = (value) => {
  store.$patch({ vbox: { ...{ [field]: value } } });

  if (link && refs.control.value === field) {
    // relative change of this control
    const d = defaults.vbox[field];
    const percentChange = value / d;

    // set value of other control, based on this control's change percent
    const targetValue = defaults.vbox[link] * percentChange;
    store.$patch({ vbox: { ...{ [link]: targetValue } } });
  }
};
</script>

<template>
  <div class="space-y-1 grow">
    <div class="flex justify-between">
      <div>
        <label for="">{{ field }} </label>
        <template v-if="value">
          <input
            type="number"
            :value="value"
            @keyup="
              (e) => {
                onChange(e.target.value);
              }
            "
          />
        </template>
      </div>
      <div class="flex space-x-2">
        <Stepper :inc="true" :field="field" />
        <Stepper :dec="true" :field="field" />
      </div>
    </div>
    <Slider
      :lazy="false"
      :tooltips="false"
      :min="min || 0"
      :max="max || 100"
      :value="value"
      @slide="onChange"
    />
  </div>
</template>
