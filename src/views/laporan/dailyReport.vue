<template>
  <div>
    <v-card
      outlined
    >
      <v-row align="center" justify="space-between">
        <v-col>
          <div class="title ml-4">
            {{ $t('label.patient_recap') }} <span>{{ fullName }} {{ this.$moment().format('DD MMMM YYYY HH:mm') }} WIB</span>
          </div>
        </v-col>
      </v-row>
      <hr class="table-divider">
      <v-row align="center" justify="space-between">
        <v-col>
          <div class="title ml-4">
            <v-row>
              <v-col>
                <input-date-picker
                  :format-date="formatDate"
                  :label="$t('label.input_date_filters')"
                  :date-value="listQuery.min_date"
                  :value-date.sync="listQuery.min_date"
                  @changeDate="listQuery.min_date = $event"
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
        <v-col cols="12" sm="6" class="align-right">
          <v-btn
            class="mr-5"
            style="float: right;"
            color="#b3e2cd"
            :loading="loading"
            @click="handleVisualReport"
          >
            <v-icon left>mdi-upload</v-icon>
            {{ $t('label.export_png') }}
          </v-btn>
          <v-btn
            class="mr-5"
            style="float: right;"
            color="#b3e2cd"
            :loading="loading"
            @click="handleExport"
          >
            <v-icon left>mdi-upload</v-icon>
            {{ $t('label.export_xls') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <div ref="printMe">
      <v-card
        outlined
      >
        <daily-report-table
          :list="list"
          :table-headers="headers"
          :list-query="listQuery"
        />
      </v-card>
      <v-row>
        <v-col
          auto
        >
          <card-repot-daily
            :title="'Distribusi Total OTG'"
            :total="listTotal.otg_total"
            :process="listTotal.otg_proses"
            :done="listTotal.otg_selesai"
            :gender="listTotal.otg_by_gender"
            :nationality-wna="listTotal.wna_total"
            :nationality-wni="listTotal.wni_total"
            :age="listTotal.otg_by_usia"
          />
        </v-col>
        <v-col
          auto
        >
          <card-repot-daily
            :title="'Distribusi Total ODP'"
            :active-color="'#2D9CDB'"
            :total="listTotal.odp_total"
            :process="listTotal.odp_proses"
            :done="listTotal.odp_selesai"
            :gender="listTotal.odp_by_gender"
            :nationality-wna="listTotal.wna_total"
            :nationality-wni="listTotal.wni_total"
            :age="listTotal.odp_by_usia"
          />
        </v-col>
        <v-col
          auto
        >
          <card-repot-daily
            :title="'Distribusi Total PDP'"
            :active-color="'#F2C94C'"
            :total="listTotal.pdp_total"
            :process="listTotal.pdp_proses"
            :done="listTotal.pdp_selesai"
            :gender="listTotal.pdp_by_gender"
            :nationality-wna="listTotal.wna_total"
            :nationality-wni="listTotal.wni_total"
            :age="listTotal.pdp_by_usia"
          />
        </v-col>
        <v-col
          auto
        >
          <card-repot-daily
            :title="'Distribusi Total Positif'"
            :active-color="'#EB5757'"
            :total="listTotal.positif_aktif_total"
            :process="listTotal.positif_aktif_proses"
            :done="listTotal.positif_aktif_selesai"
            :gender="listTotal.positif_aktif_by_gender"
            :nationality-wna="listTotal.wna_total"
            :nationality-wni="listTotal.wni_total"
            :age="listTotal.positif_aktif_by_usia"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FileSaver from 'file-saver'
import { formatDatetime } from '@/utils/parseDatetime'
import CardRepotDaily from '../../components/Pelaporan/CardRepotDaily'

export default {
  name: 'DailyReport',
  components: { CardRepotDaily },
  data() {
    return {
      formatDate: 'YYYY-MM-DD',
      loading: false,
      headers: [
        { text: 'OTG PROSES', value: 'otg_proses' },
        { text: 'OTG SELESAI', value: 'otg_selesai' },
        { text: 'ODP PROSES', value: 'odp_proses' },
        { text: 'ODP SELESAI', value: 'odp_selesai' },
        { text: 'PDP PROSES', value: 'pdp_proses' },
        { text: 'PDP SELESAI', value: 'pdp_selesai' },
        { text: 'POSITIF PROSES', value: 'positif_aktif_proses' },
        { text: 'POSITIF SEMBUH', value: 'positif_sembuh_selesai' },
        { text: 'POSITIF MENINGGAL', value: 'positif_meninggal_selesai' },
        { text: 'GRAND TOTAL', value: 'grand_total' }
      ],
      listQuery: {
        limit: 100,
        min_date: '',
        filter: ''
      },
      list: [],
      listTotal: ''
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles',
      'fullName'
    ])
  },
  watch: {
    'listQuery.min_date': {
      handler: function(value) {
        if (value.length > 0) {
          this.handleSearch()
        }
      },
      immediate: true
    }
  },
  async mounted() {
    if (this.roles[0] === 'dinkeskota') {
      this.headers.unshift({ text: 'KECAMATAN', value: 'kotkabkec' })
    } else {
      this.headers.unshift({ text: 'KOTA/KAB', value: 'kotkabkec' })
    }
    this.handleSearch()
  },
  methods: {
    async handleSearch() {
      const response = await this.$store.dispatch('statistic/agregateCriteria', this.listQuery)
      this.list = response.data.summary
      this.listTotal = response.data.total
    },
    async handleExport() {
      this.loading = true
      const response = await this.$store.dispatch('statistic/exportAgregateCriteriaExcel', this.listQuery)
      const dateNow = Date.now()
      const fileName = `${this.$t('label.patient_recap')} ${this.fullName} - ${formatDatetime(dateNow, 'DD/MM/YYYY HH:mm')} WIB.xlsx`
      await FileSaver.saveAs(response, fileName)
      this.loading = false
    },
    async handleVisualReport() {
      this.loading = true
      const el = this.$refs.printMe
      const dateNow = Date.now()
      const filename = `${this.$t('label.patient_recap')} ${this.fullName} - ${formatDatetime(dateNow, 'DD/MM/YYYY HH:mm')} WIB.png`
      const options = {
        type: 'dataURL'
      }
      const output = await this.$html2canvas(el, options)
      await FileSaver.saveAs(output, filename)
      this.loading = false
    },
    onReset() {
      this.listQuery.min_date = ''
      this.handleSearch()
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
