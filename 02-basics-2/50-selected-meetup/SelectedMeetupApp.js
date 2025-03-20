import { computed, defineComponent, ref, watchEffect } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const totalMeetups = 5
    const currentMeetupId = ref(1)
    const meetupTitle = ref('Some Meetup Title')

    const isDisabledPrev = computed(() => currentMeetupId.value === 1)
    const isDisabledNext = computed(() => currentMeetupId.value === totalMeetups)

    watchEffect(async () => {
      try {
        const { title } = await getMeetup(currentMeetupId.value)
        if (title) {
          meetupTitle.value = title
        }
      } catch (err) {
        console.log(err)
      }
    })

    return {
      isDisabledPrev,
      isDisabledNext,
      totalMeetups,
      currentMeetupId,
      meetupTitle,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" :disabled="isDisabledPrev" @click="currentMeetupId--">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button" v-for="btn of totalMeetups">
            <input
              :id="'meetup-id-' + btn"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="btn"
              v-model="currentMeetupId"
            />
            <label :for="'meetup-id-' + btn" class="radio-group__label">{{ btn }}</label>
          </div>
        </div>

        <button class="button button--secondary" type="button" :disabled="isDisabledNext" @click="currentMeetupId++">Следующий</button>
      </div>
      
      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetupTitle }}</h1>
        </div>
      </div>
    </div>
  `,
})

