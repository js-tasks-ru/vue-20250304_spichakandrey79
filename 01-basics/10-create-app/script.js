import { defineComponent, createApp } from 'vue'

const optionsDate = {
  dateStyle: 'long'
};

const formatAsLocalData = () => new Date().toLocaleString(navigator.language, optionsDate)

const App = defineComponent({
  name: 'App',
  setup() {
    return {
      today: formatAsLocalData()
    }
  },

  template: `<div>Сегодня {{ today }}</div>`
})

const app = createApp(App)

app.mount('#app')

