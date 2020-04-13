<template>
  <div>
    <v-form
      ref="form"
      lazy-validation
    >
      <v-container>
        <v-row class="filter-row" style="margin-top: -40px;">
          <v-col cols="12" sm="12">
            <br>
            <v-text-field
              v-model="listQuery.search"
              solo
              label="Search"
              prepend-inner-icon="search"
            />
          </v-col>
        </v-row>
        <v-row class="filter-row">
          <v-col cols="12" sm="6">
            <v-label class="title">Kriteria:</v-label>
            <v-select
              v-model="listQuery.status"
              :items="stagesList"
              solo
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-label class="title">Hasil:</v-label>
            <v-select
              v-model="listQuery.final_result"
              :items="resultList"
              solo
              item-text="label"
              item-value="value"
            />
          </v-col>
        </v-row>
        <v-row class="filter-row">
          <v-col cols="12" sm="3">
            <v-label class="title">Tanggal:</v-label>
            <input-date-picker
              :format-date="formatDate"
              :label="'Tanggal Awal'"
              :date-value="listQuery.start_date"
              :value-date.sync="listQuery.start_date"
              @changeDate="listQuery.start_date = $event"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <br>
            <input-date-picker
              :format-date="formatDate"
              :label="'Tanggal Akhir'"
              :date-value="listQuery.end_date"
              :value-date.sync="listQuery.end_date"
              @changeDate="listQuery.end_date = $event"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <br>
            <div>
              <v-btn
                color="grey"
                style="height: 46px;min-width: 100px;margin-right: 4px;"
                @click="onReset"
              >
                Reset
              </v-btn>
              <v-btn
                color="success"
                style="height: 46px;min-width: 100px;margin-right: 4px;"
                @click="onSearch"
              >
                Cari
              </v-btn>
              <v-btn
                color="success"
                style="height: 46px;min-width: 100px;"
                @click="onExport"
              >
                Export Excel
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <loading-bar
      :loading="loadingBar"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FileSaver from 'file-saver'
import { formatDatetime } from '@/utils/parseDatetime'

export default {
  name: 'CaseFilter',
  props: {
    listQuery: {
      type: Object,
      default: null
    },
    onSearch: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      formatDate: 'YYYY-MM-DD',
      loadingBar: false,
      districtCity: {
        kota_kode: ''
      },
      stagesList: [
        'ODP',
        'PDP',
        'POSITIF'
      ],
      resultList: [
        {
          label: 'Negatif',
          value: 0
        },
        {
          label: 'Sembuh',
          value: 1
        },
        {
          label: 'Meninggal',
          value: 2
        }
      ]
    }
  },
  computed: {
    ...mapGetters('user', [
      'fullname',
      'roles'
    ])
  },
  methods: {
    onSelectDistrict(value) {
      this.listQuery.address_district_code = value.kota_kode
    },
    onReset() {
      this.listQuery.search = ''
      this.listQuery.final_result = ''
      this.listQuery.status = ''
      this.listQuery.address_district_code = ''
      this.listQuery.start_date = ''
      this.listQuery.end_date = ''
      this.$refs.form.reset()
      this.$store.dispatch('reports/listReportCase', this.listQuery)
    },
    async onExport() {
      this.loadingBar = true
      const response = await this.$store.dispatch('reports/exportExcel', this.listQuery)
      if (response) this.loadingBar = false
      const dateNow = Date.now()
      const fileName = `Data Kasus ${this.fullname} - ${formatDatetime(dateNow, 'DD/MM/YYYY HH:mm')} WIB.xlsx`
      FileSaver.saveAs(response, fileName)
    }
  }
}
</script>
<style scoped>
  .filter-row {
    margin-bottom: -40px;
  }
</style>
