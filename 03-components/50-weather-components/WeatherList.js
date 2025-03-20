import { defineComponent } from 'vue'
import WeatherListItem from './WeatherListItem'

export default defineComponent(
  {
    name: 'WeatherList',

    components: {
      WeatherListItem,
    },

    props: {
      weatherItems: {
        type: Array,
        required: true,
      },
    },

    template: `
      <ul class="weather-list unstyled-list">
        <WeatherListItem
            v-for="(weatherItem, index) in weatherItems"
            :weather-item="weatherItem"
        ></WeatherListItem>
      </ul>
    `
  }
)