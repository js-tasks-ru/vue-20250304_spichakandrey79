import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const counter = ref(0)
    const minCounter = 0
    const maxCounter = 5

    const decrement = () => {
      counter.value--
    }

    const increment = () => {
      counter.value++
    }

    return {
      counter,
      minCounter,
      maxCounter,
      decrement,
      increment
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="counter === minCounter"
        @click="decrement"
      >➖</button>

      <span class="count" data-testid="count">{{ counter }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="counter === maxCounter"
        @click="increment"
      >➕</button>
    </div>
  `,
})
