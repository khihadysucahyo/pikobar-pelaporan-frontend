<template>
  <v-card
    outlined
  >
    <v-row align="center" justify="space-between">
      <v-col>
        <div class="title ml-4">
          Rekap Pasien Dinkes [Nama dinkesnya] 05 Mei 2020 17:00 WIB
        </div>
      </v-col>
    </v-row>
    <hr class="table-divider">
    <v-row align="center" justify="space-between">
      <v-col>
        <div class="title ml-4">
          <date-range-picker
            v-model="dateRange"
          />
          <v-btn
            color="#4f4f4f"
            class="ml-5 btn-reset"
            @click="onReset"
          >
            {{ $t('label.reset') }}
          </v-btn>
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
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  name: 'DailyReport',
  components: { DateRangePicker },
  data() {
    return {
      dateRange: {
        startDate: '',
        endDate: ''
      },
      headers: [
        { text: 'KOTA/KAB', value: 'name' },
        { text: 'OTG PROSES', value: 'age' },
        { text: 'OTG SELESAI', value: 'gender' },
        { text: 'ODP PROSES', value: 'criteria' },
        { text: 'ODP SELESAI', value: 'stage' },
        { text: 'POSITIF PROSES', value: 'final_result' },
        { text: 'POSITIF SELESAI', value: 'author' },
        { text: 'GRAND TOTAL', value: 'author' }
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
          author: 7
        }
      ]
    }
  },
  methods: {
    onReset() {
      this.dateRange.startDate = ''
      this.dateRange.endDate = ''
    }
  }
}
</script>

<style scoped>
  .vue-daterange-picker {
    min-width: 260px;
  }
  .btn-reset {
    min-width: 37px!important;
    height: 46px !important;
    color: white !important;
  }
</style>
