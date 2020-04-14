<template>
  <div>
    <v-stepper
      v-model="step"
      :alt-labels="altLabels"
    >
      <v-stepper-header>
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="step > n"
            :step="n"
            :editable="editable"
          >
            <template v-if="n == 1">
              {{ $t('label.detail_profile_history') }}
            </template>
            <template v-else-if="n == 2">
              {{ $t('label.case_history') }}
            </template>
          </v-stepper-step>

          <v-divider
            v-if="n !== steps"
            :key="n"
          />
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content
          v-for="n in steps"
          :key="`${n}-content`"
          :step="n"
        >
          <template v-if="step == 1">
            <form-information-patient
              :form-pasien="formPasien"
              :steps="n"
            />
          </template>
          <template v-else-if="step == 2">
            <form-information-history
              :form-pasien="formPasien"
              :steps="n"
            />
          </template>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import EventBus from '@/utils/eventBus'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      step: 1,
      steps: 2,
      altLabels: false,
      editable: false
    }
  },
  computed: {
    ...mapGetters('reports', [
      'formPasien'
    ]),
    ...mapGetters('user', [
      'district_user'
    ])
  },
  async created() {
    // on steps change
    this.formPasien.address_district_code = this.district_user
    EventBus.$on('nextSurveySteps', (value) => {
      this.step = value + 1
    })
    EventBus.$on('backSurveySteps', (value) => {
      this.step = value - 1
    })
  },
  methods: {
    onInput(val) {
      this.steps = parseInt(val)
    },
    onCancel() {
      this.$router.push('/survey/index')
    }
  }
}
</script>
