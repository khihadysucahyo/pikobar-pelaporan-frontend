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
          <v-col cols="12" sm="3">
            <v-label class="title">Hasil:</v-label>
            <v-select
              v-model="listQuery.final_result"
              :items="resultList"
              solo
              item-text="label"
              item-value="value"
            />
          </v-col>
          <v-col cols="12" sm="9" class="reduce-padding-top">
            <address-region
              :district-code="listQuery.address_district_code"
              :district-name="district_name_user"
              :disabled-district="disabledDistrict"
              :code-district.sync="listQuery.address_district_code"
              :sub-district-code="listQuery.address_subdistrict_code"
              :code-sub-district.sync="listQuery.address_subdistrict_code"
              :village-code="listQuery.address_village_code"
              :code-village.sync="listQuery.address_village_code"
              :disabled-address="false"
              :required-address="false"
              :is-label="true"
            />
          </v-col>
        </v-row>
        <v-row class="filter-row">
          <v-col cols="12" sm="3">
            <v-label class="title">Kriteria:</v-label>
            <v-select
              v-model="listQuery.status"
              :items="stagesList"
              solo
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-label class="title">Tanggal Penginputan:</v-label>
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
          <v-col cols="12" sm="3">
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
            </div>
          </v-col>
        </v-row>
        <v-row class="filter-row">
          <v-col cols="12" sm="3">
            <div>
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
      ],
      disabledDistrict: false
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles',
      'district_user',
      'district_name_user',
      'fullname'
    ])
  },
  mounted() {
    this.disabledDistrict = this.roles[0] === 'dinkeskota'
  },
  methods: {
    onSelectDistrict(value) {
      this.listQuery.address_district_code = value.kota_kode
    },
    onReset() {
      this.listQuery.search = ''
      this.listQuery.final_result = ''
      this.listQuery.status = ''
      this.listQuery.address_subdistrict_code = ''
      this.listQuery.address_village_code = ''
      this.listQuery.start_date = ''
      this.listQuery.end_date = ''
      if (this.roles[0] !== 'dinkeskota') {
        this.listQuery.address_district_code = ''
      }
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
    margin-bottom: -20px;
  }
  .reduce-padding-top {
    padding-top: 0px !important;
  }
</style>
