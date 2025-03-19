import { defineComponent, ref, computed, onUnmounted } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const currentDate = ref(new Date())

    const currentTime = computed(() => currentDate.value.toLocaleTimeString(navigator.language, { timeStyle: 'medium' }))

    const interval = setInterval(() => {
      currentDate.value = new Date()
    }, 1000) 

    onUnmounted(() => {
      clearInterval(interval);
    });

    return {
      currentTime
    }
  },

  template: `<div class="clock">{{ currentTime }}</div>`,
})
