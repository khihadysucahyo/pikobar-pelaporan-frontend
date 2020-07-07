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
          <label>{{ $t('label.have_you_had_influenza_vaccination') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
          >
            <v-radio-group
              v-model="formBody.health_worker"
              :error-messages="errors"
              row
            >
              <v-radio
                :label="$t('label.yes')"
                value="0"
              />
              <v-radio
                :label="$t('label.no')"
                value="1"
              />
            </v-radio-group>
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
          {{ $t('label.date_vaccination') }}
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider
            rules="required|isHtml"
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
          <label>{{ $t('label.have_you_ever_carried_out_pvc_vaccination') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
          >
            <v-radio-group
              v-model="formBody.health_worker"
              :error-messages="errors"
              row
            >
              <v-radio
                :label="$t('label.yes')"
                value="0"
              />
              <v-radio
                :label="$t('label.no')"
                value="1"
              />
            </v-radio-group>
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
          <label>{{ $t('label.date_vaccination') }}</label>
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
    </v-form>
  </div>
</template>
<script>
import { transportOptions } from '@/utils/constantVariable'
import { ValidationProvider } from 'vee-validate'
import { mapGetters } from 'vuex'

export default {
  name: 'FormVaccinationHistory',
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
