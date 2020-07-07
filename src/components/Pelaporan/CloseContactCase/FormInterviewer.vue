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
          <label>{{ $t('label.interviewer_name') }}</label>
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
            <v-text-field
              v-model="formBody.results"
              :error-messages="errors"
              solo-inverted
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
          {{ $t('label.contact_tracking_date') }}
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
    </v-form>
  </div>
</template>
<script>
import { protectionToolOptions } from '@/utils/constantVariable'
import { ValidationProvider } from 'vee-validate'
import { mapGetters } from 'vuex'

export default {
  name: 'FormInterviewer',
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
      protectionToolOptions,
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
