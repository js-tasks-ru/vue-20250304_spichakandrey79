import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstOperand = ref(0)
    const secondOoperand = ref(0)

    const operators = [
      {
        val: 'sum',
        emoji: '➕'
      },
      {
        val: 'subtract',
        emoji: '➖'
      },
      {
        val: 'multiply',
        emoji: '✖'
      },
      {
        val: 'divide',
        emoji: '➗'
      }
    ]
    const currentOperator = ref(operators[0].val)

    const result = computed(() => {
      const op = currentOperator.value
      if(op === 'sum') return firstOperand.value + secondOoperand.value
      if(op === 'subtract') return firstOperand.value - secondOoperand.value
      if(op === 'multiply') return firstOperand.value * secondOoperand.value
      return firstOperand.value / secondOoperand.value
    })

    return {
      firstOperand,
      secondOoperand,
      currentOperator,
      result,
      operators
    }
  },

  template: `
    <div class="calculator">
      <input type="number" v-model="firstOperand" aria-label="First operand" />

      <div class="calculator__operators">
      <template v-for="(operator, idx) in operators" :key="idx">
        <label><input type="radio" v-model="currentOperator" name="operator" :value="operator.val"/>{{ operator.emoji }}</label>
      </template>
      </div>
      <input type="number" v-model="secondOoperand" aria-label="Second operand" />
      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})