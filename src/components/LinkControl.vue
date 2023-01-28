<script setup>
import { useVBoxStore } from '../stores/vbox';

const log = console.log;

const { field } = defineProps(['field']);
const store = useVBoxStore();

const update = () => {
  store.$patch({ control: field });
  console.log(store.control);
};
</script>

<template>
  <div class="">
    <a
      href="#"
      @click.prevent="update"
      class="w-4 h-4 block rounded-full border border-gray-800"
      :class="store.control === field ? 'bg-gray-800' : ''"
    ></a>
  </div>
</template>
