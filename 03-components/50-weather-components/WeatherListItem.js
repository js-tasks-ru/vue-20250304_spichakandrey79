import { defineComponent } from 'vue'
import { WeatherConditionIcons } from './weather.service.ts'

export default defineComponent(
  {
    name: 'WeatherListItem',

    props: {
      weatherItem: {
        type: Object,
        required: true,
      },
    },

    setup() {
      const tempKelvinToCelsius = (temp) => (temp - 273.15).toFixed(1)

      const pressureMPAToMM = (pressure) => Math.round(pressure * 0.75)

      const convertTimeToTimestamp = (time) => {
        const [hours, minutes ] = time.split(':')
        return +hours * 60 + +minutes
      }
  
      const isDay = ({dt, sunrise, sunset}) => {
        return convertTimeToTimestamp(dt) > convertTimeToTimestamp(sunrise) && convertTimeToTimestamp(dt) < convertTimeToTimestamp(sunset)
      }

      return {
        WeatherConditionIcons,
        tempKelvinToCelsius,
        pressureMPAToMM,
        isDay
      }
    },


    template: `
    isDay = {{isDay(weatherItem.current)}}
      <li class="weather-card"
          :class="{ 'weather-card--night': !isDay(weatherItem.current) }"
      >
        <div class="weather-alert"
             v-if="weatherItem.alert"
        >
          <span class="weather-alert__icon">⚠️</span>
          <span class="weather-alert__description">{{ weatherItem.alert.sender_name }}: {{ weatherItem.alert.description }}</span>
        </div>
        <div>
          <h2 class="weather-card__name">
            {{ weatherItem.geographic_name }}
          </h2>
          <div class="weather-card__time">
            {{ weatherItem.current.dt }}
          </div>
        </div>
        <div class="weather-conditions">
          <div class="weather-conditions__icon" :title="weatherItem.current.weather.description">{{ WeatherConditionIcons[weatherItem.current.weather.id] }}</div>
          <div class="weather-conditions__temp">{{ tempKelvinToCelsius(weatherItem.current.temp) }} °C</div>
        </div>
        <div class="weather-details">
          <div class="weather-details__item">
            <div class="weather-details__item-label">Давление, мм рт. ст.</div>
            <div class="weather-details__item-value">{{ pressureMPAToMM(weatherItem.current.pressure) }}</div>
          </div>
          <div class="weather-details__item">
            <div class="weather-details__item-label">Влажность, %</div>
            <div class="weather-details__item-value">{{ weatherItem.current.humidity }}</div>
          </div>
          <div class="weather-details__item">
            <div class="weather-details__item-label">Облачность, %</div>
            <div class="weather-details__item-value">{{ weatherItem.current.clouds }}</div>
          </div>
          <div class="weather-details__item">
            <div class="weather-details__item-label">Ветер, м/с</div>
            <div class="weather-details__item-value">{{ weatherItem.current.wind_speed }}</div>
          </div>
        </div>
      </li>
    `
  }
)