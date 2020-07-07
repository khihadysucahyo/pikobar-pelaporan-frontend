<template>
  <div>
    <v-form
      ref="form"
      lazy-validation
    >
      <v-row align="start">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label>{{ $t('label.date_last_contact_related_case') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider
            rules="required"
          >
            <input-date-picker
              :format-date="'YYYY/MM/DD'"
              :date-value="formBody.test_date"
              :value-date.sync="formBody.test_date"
              @changeDate="formBody.test_date = $event"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          {{ $t('label.travel_history') }}
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|isHtml"
          >
            <v-row>
              <v-col>
                <v-checkbox
                  v-model="formBody.went_abboard_country"
                  label="Dari Luar Negeri"
                  class="mt-0 pt-0"
                  :error-messages="errors"
                />
              </v-col>
              <v-col>
                <v-checkbox
                  v-model="formBody.went_abboard_other_city"
                  label="Dari Luar Kota"
                  class="mt-0 pt-0"
                  :error-messages="errors"
                />
              </v-col>
            </v-row>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label>{{ $t('label.travel_start_date') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider
            rules="required"
          >
            <input-date-picker
              :format-date="'YYYY/MM/DD'"
              :date-value="formBody.abboard_date"
              :value-date.sync="formBody.abboard_date"
              @changeDate="formBody.abboard_date = $event"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label>{{ $t('label.date_arrival_indonesia') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider
            rules="required"
          >
            <input-date-picker
              :format-date="'YYYY/MM/DD'"
              :date-value="formBody.arrived_date"
              :value-date.sync="formBody.arrived_date"
              @changeDate="formBody.arrived_date = $event"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label>{{ $t('label.profession') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider
            rules="required"
          >
            <v-select
              v-model="formBody.occupation"
              :items="occupationList"
              item-value="title"
              item-text="title"
              menu-props="auto"
              solo
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label>{{ $t('label.office_address') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider
            rules="required"
          >
            <v-textarea
              v-model="formBody.other_notes"
              solo
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start" class="pb-4">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label>{{ $t('label.transportation_used_daily') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider v-slot="{ errors }">
            <v-row>
              <v-col v-for="item in transportOptions" :key="item" sm="6" md="6">
                <label class="material-checkbox-custom">
                  <input
                    v-model="formBody.transport"
                    :value="item"
                    type="checkbox"
                  >
                  <span v-if="errors.length" class="error--text">{{ item }}</span>
                  <span v-else>{{ item }}</span>
                </label>
                <span
                  v-if="errors.length"
                  class="v-messages error--text"
                >{{ errors[0] }}</span>
              </v-col>
            </v-row>
          </ValidationProvider>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import { transportOptions } from '@/utils/constantVariable'
import { ValidationProvider } from 'vee-validate'
import { mapGetters } from 'vuex'

export default {
  name: 'FormTravelHistory',
  components: {
    ValidationProvider
  },
  props: {
    formBody: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      transportOptions,
      formatDate: 'YYYY/MM/DD'
    }
  },
  computed: {
    ...mapGetters('occupation', [
      'occupationList'
    ])
  },
  async mounted() {
    await this.$store.dispatch('occupation/getListOccuption')
  },
  methods: {
    //
  }
}
</script>
