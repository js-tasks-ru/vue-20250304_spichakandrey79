import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const convertTimeToTimestamp = (time) => {
      const [hours, minutes ] = time.split(':')
      return +hours * 60 + +minutes
    }

    const isDAy = (dt, sunrise, sunset) => {
      return convertTimeToTimestamp(dt) > convertTimeToTimestamp(sunrise) && convertTimeToTimestamp(dt) < convertTimeToTimestamp(sunset)
    }

    return {
      weatherList: getWeatherData()
        .map(it => {
          return {
            ...it,
            current: {
              ...it.current,
              temp: (it.current.temp - 273.15).toFixed(1),
              pressure: Math.round(it.current.pressure * .75)
            },
            weatherConditionIcon: WeatherConditionIcons[it.current.weather.id],
            isDay: isDAy(it.current.dt, it.current.sunrise, it.current.sunset)
          }
        })
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="(item, idx) in weatherList" :key="idx" :class="['weather-card',  {'weather-card--night': !item.isDay }]">
          <div v-if="item.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">Королевская метеослужба короля Арагорна II: Предвещается наступление сильного шторма.</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ item.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ item.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="item.current.weather.description">{{ item.weatherConditionIcon }}</div>
            <div class="weather-conditions__temp">{{ item.current.temp }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ item.current.pressure }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ item.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ item.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ item.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
