// stores/counter.js
import { defineStore } from 'pinia';

const saved = localStorage.getItem('svg');
const init = saved
  ? JSON.parse(saved)
  : { x: 0, y: 0, width: 100, height: 100 };

const useVBoxStore = defineStore('vbox', {
  state: () => {
    return init;
  },
});

export { useVBoxStore };
