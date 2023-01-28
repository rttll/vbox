import { defineStore } from 'pinia';

const defaults = {
  vbox: { x: 0, y: 0, width: 600, height: 300 },
  control: 'width',
  cache: {},
};
const saved = localStorage.getItem('svg');
const init = saved ? JSON.parse(saved) : defaults;

const useVBoxStore = defineStore('vbox', {
  state: () => {
    return init;
  },
  actions: {
    reset() {
      for (let k in defaults) {
        this[k] = defaults[k];
      }
    },
  },
});

export { useVBoxStore, defaults };
