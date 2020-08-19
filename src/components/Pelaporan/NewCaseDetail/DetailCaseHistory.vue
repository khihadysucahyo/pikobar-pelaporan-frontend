<template>
  <div>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.criteria') }}</p>
      </v-col>
      <v-col>
        <p><status :status="detail.status" /></p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.latest_patient_status') }}</p>
      </v-col>
      <v-col>
        <v-row><final-result :final-result="detail.final_result" /> Per-Tanggal {{ this.$moment(detail.last_date_status_patient).format('DD MMMM YYYY') }}</v-row>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.there_symptoms') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.there_are_symptoms ? $t('label.yes'):$t('label.no') }}</p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.symptoms') }}</p>
      </v-col>
      <v-col>
        <p>{{ splitArray(detail.last_history.diagnosis) }}</p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.additional_condition') }}</p>
      </v-col>
      <v-col>
        <p>{{ splitArray(detail.last_history.diseases) }}</p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.current_location') }}</p>
      </v-col>
      <v-col>
        <p>{{ detail.last_history.current_location_type }}</p>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'DetailCaseHistory',
  props: {
    detail: {
      type: Object,
      default: null
    }
  },
  methods: {
    splitArray(array) {
      const result = array.join(',', array)
      return result
    }
  }
}
</script>
