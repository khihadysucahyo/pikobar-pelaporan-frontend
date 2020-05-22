<template>
  <v-card
    outlined
  >
    <v-row align="center" justify="space-between">
      <v-col>
        <div class="title ml-4">
          {{ $t('label.patient_recap') }}
        </div>
      </v-col>
    </v-row>
    <hr class="table-divider">
    <v-row align="center" justify="space-between">
      <v-col>
        <div class="title ml-4">
          <v-row>
            <v-col>
              <range-date-picker
                v-model="dateRange"
                :start-label="$t('label.start_date')"
                :end-label="$t('label.end_date')"
                :place-holder="$t('label.input_date_filters')"
              />
            </v-col>
            <v-col>
              <v-btn
                color="#4f4f4f"
                class="ml-5 btn-reset"
                @click="onReset"
              >
                {{ $t('label.reset') }}
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" sm="4" class="align-right">
        <v-btn
          class="mr-5"
          style="float: right;"
          color="#b3e2cd"
        >
          <v-icon left>mdi-upload</v-icon>
          {{ $t('label.export') }}
        </v-btn>
      </v-col>
    </v-row>
    <daily-report-table
      :list="list"
      :table-headers="headers"
      :list-query="listQuery"
    />
  </v-card>
</template>

<script>

export default {
  name: 'DailyReport',
  data() {
    return {
      autoApply: true,
      dateRange: {
        start: '',
        end: ''
      },
      headers: [
        { text: 'KOTA/KAB', value: 'id' },
        { text: 'OTG PROSES', value: 'age' },
        { text: 'OTG SELESAI', value: 'gender' },
        { text: 'ODP PROSES', value: 'criteria' },
        { text: 'ODP SELESAI', value: 'stage' },
        { text: 'POSITIF PROSES', value: 'final_result' },
        { text: 'POSITIF SELESAI', value: 'author' },
        { text: 'GRAND TOTAL', value: 'grand_total' }
      ],
      listQuery: {
        limit: 10
      },
      list: [
        {
          id: 'Kota Bandung',
          name: 1,
          age: 2,
          gender: 3,
          criteria: 4,
          stage: 5,
          final_result: 6,
          author: 7,
          grand_total: 8
        },
        {
          id: 'Kabupaten Bandung Barat',
          name: 1,
          age: 2,
          gender: 3,
          criteria: 4,
          stage: 5,
          final_result: 6,
          author: 7,
          grand_total: 8
        }
      ]
    }
  },
  methods: {
    onReset() {
      this.dateRange.start = ''
      this.dateRange.end = ''
    }
  }
}
</script>

<style scoped>
  .btn-reset {
    min-width: 37px!important;
    height: 46px !important;
    color: white !important;
  }
</style>
