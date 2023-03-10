<script setup>
import { computed, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { MotionPathPlugin } from 'gsap/all';
import Slider from '@vueform/slider';
import '@vueform/slider/themes/default.css';

import { useVBoxStore } from '../stores/vbox';
import Stepper from './Stepper.vue';

import { defaults } from '../stores/vbox';

const { convertCoordinates } = MotionPathPlugin;

const log = console.log;

const { field, min, max, link } = defineProps(['field', 'min', 'max', 'link']);
const store = useVBoxStore();
const refs = storeToRefs(store);

const cache = refs.cache.value;
const vbox = refs.vbox.value;
const value = computed(() => vbox[field]);

const onChange = (v) => {
  if (v.length === 0) return;
  const value = parseInt(v);
  store.$patch({ vbox: { ...{ [field]: value } } });

  const isControll = refs.control.value === field;
  if (link && isControll) {
    // relative change of this control
    const percentChange = value / defaults.vbox[field];

    // set value of other control, based on this control's change percent
    const targetValue = defaults.vbox[link] * percentChange;
    store.$patch({ vbox: { ...{ [link]: targetValue } } });

    // Offset by min-x, min-y values of viewbox
    if (cache.x !== undefined) {
      const x = cache.x * percentChange;
      store.$patch({ vbox: { x } });
    }
    if (cache.y !== undefined) {
      const y = cache.y * percentChange;
      store.$patch({ vbox: { y } });
    }

    // also offset by value of any x/y attrs on element
    const path = document.getElementById('path');
    const guide = document.getElementById('guide');
    [
      {
        attr: 'x',
        offsetAttr: 'dx',
      },
      {
        attr: 'y',
        offsetAttr: 'dy',
      },
    ].forEach((config) => {
      if (path.hasAttribute(config.attr)) {
        const value = parseInt(path.getAttribute(config.attr));
        const offset = 0 - (value - value * percentChange);
        path.setAttribute(config.offsetAttr, offset);
      }
    });

    const bbox = path.getBBox();
    const rect = path.getBoundingClientRect();
    const { width } = bbox;
    const w = width * percentChange;

    const parentSVG = document.getElementById('parentSVG');
    const parent = { el: document.getElementById('parent') };
    parent.rect = parent.el.getBoundingClientRect();

    parent.point = parentSVG.createSVGPoint();
    parent.point.x = parent.rect.x;
    parent.point.y = parent.rect.y;
    parent.point = parent.point.matrixTransform(
      parent.el.getScreenCTM().inverse()
    );

    const svg = { el: document.getElementById('svg') };
    svg.rect = svg.el.getBoundingClientRect();

    svg.point = svg.el.createSVGPoint();
    svg.point.x = rect.x;
    svg.point.y = rect.y;
    svg.point = svg.point.matrixTransform(svg.el.getScreenCTM().inverse());

    const diff = {
      x: percentChange * (rect.x - parent.rect.x),
      y: percentChange * (rect.y - parent.rect.y),
    };

    // path.setAttribute('dx', diff.x);
    // path.setAttribute('dy', diff.y);
  }
};

const onEnd = (value) => {
  store.$patch({ cache: { ...{ [field]: value } } });
};
</script>

<template>
  <div class="space-y-1 grow">
    <div class="flex justify-between">
      <div>
        <label for="">{{ field }} </label>
        <input
          type="text"
          :value="value"
          @keyup="
            (e) => {
              onChange(e.target.value);
            }
          "
        />
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
      @end="onEnd"
    />
  </div>
</template>
