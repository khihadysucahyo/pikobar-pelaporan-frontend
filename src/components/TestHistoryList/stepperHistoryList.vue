<template>
  <v-stepper v-model="step" vertical :alt-labels="altLabels">
    <template v-for="(item, index) in listHistoryTest">
      <v-stepper-step
        :key="`${index}-step`"
        :complete="step == index"
        :step="index"
        :editable="editable"
      >{{ formatDatetime(item.test_date, "DD MMMM YYYY") }}</v-stepper-step>
      <v-stepper-content :key="`${index}-content`" :step="index">
        <v-card class="statistic mx-auto" outlined>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="2" sm="6">
                <status :status="item.final_result" />
              </v-col>
              <v-col cols="12" md="2" sm="6">
                <div class="sub-title pb-3 font-weight-bold">{{ $t('label.method').toUpperCase() }}</div>
                {{ item.tool_tester }}
              </v-col>
              <v-col cols="12" md="2" sm="6">
                <div
                  class="sub-title pb-3 font-weight-bold"
                >{{ $t('label.sampling').toUpperCase() }}</div>
                {{ item.sampling_type }}
              </v-col>
              <v-col cols="12" md="2" sm="6">
                <div
                  class="sub-title pb-3 font-weight-bold"
                >{{ $t('label.test_place').toUpperCase() }}</div>
                {{ item.test_location ? item.test_location : item.test_other_location }}
              </v-col>
              <v-col cols="12" md="2" sm="6">
                <div
                  class="sub-title pb-3 font-weight-bold"
                >{{ $t('label.test_date').toUpperCase() }}</div>
                {{ formatDatetime(item.test_date, "DD MMMM YYYY") }}
              </v-col>
              <v-col cols="12" md="2" sm="6">
                <div
                  class="sub-title pb-3 font-weight-bold"
                >{{ $t('label.update_date').toUpperCase() }}</div>
                {{ formatDatetime(item.updatedAt, "DD MMMM YYYY") }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-stepper-content>
    </template>
  </v-stepper>
</template>
<script>
import { formatDatetime } from '@/utils/parseDatetime'

export default {
  name: 'StepperHistoryList',
  props: {
    listHistoryTest: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      step: 0,
      altLabels: false,
      editable: false
    }
  },
  methods: {
    formatDatetime
  }
}
</script>

<style scoped>
.v-stepper__content >>> .v-stepper__wrapper {
  height: auto !important;
}
.v-stepper__step--inactive >>> .v-stepper__step__step {
  color: #9e9e9e !important;
}
</style>
