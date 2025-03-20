import { defineComponent, ref } from 'vue'
import { getWeatherData } from './weather.service.ts'
import './WeatherApp.css'
import WeatherList from './WeatherList'

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherList,
  },

  setup() {
    const WeatherListData = ref(getWeatherData())

    return {
      WeatherListData
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>
       <WeatherList :weatherItems="WeatherListData" /> 
    </div>
  `,
})
