<template>
  <div class="main-div">
    <v-form
      ref="form"
      lazy-validation
    >
      <v-container class="container">
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
            <v-label class="title">{{ $t('label.results') }}:</v-label>
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
              :disabled-district="disabledDistrict"
              :district-code="listQuery.address_district_code"
              :district-name="district_name_user"
              :code-district.sync="listQuery.address_district_code"
              :sub-district-code="listQuery.address_subdistrict_code"
              :code-sub-district.sync="listQuery.address_subdistrict_code"
              :village-code="listQuery.address_village_code"
              :code-village.sync="listQuery.address_village_code"
              :village-name="nameVillage"
              :name-village.sync="nameVillage"
              :disabled-address="false"
              :required-address="false"
              :is-label="true"
            />
          </v-col>
        </v-row>
        <v-row class="filter-row">
          <v-col cols="12" sm="3">
            <v-label class="title">{{ $t('label.criteria') }}:</v-label>
            <v-select
              v-model="listQuery.status"
              :items="stagesList"
              solo
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-label class="title">{{ $t('label.input_date') }}:</v-label>
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
            <v-row justify="space-between">
              <v-col class="reduce-padding-top reduce-padding-right">
                <v-btn
                  color="#4f4f4f"
                  class="btn-reset"
                  @click="onReset"
                >
                  {{ $t('label.reset') }}
                </v-btn>
              </v-col>
              <v-col class="reduce-padding-top reduce-padding-left">
                <v-btn
                  color="success"
                  class="btn-cari"
                  @click="onSearch"
                >
                  {{ $t('label.look_for_it') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      disabledDistrict: true,
      codeDistrict: '',
      nameVillage: '',
      stagesList: [
        'OTG',
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
      'roles',
      'district_user',
      'district_name_user',
      'fullName'
    ])
  },
  async beforeMount() {
    this.disabledDistrict = await this.roles[0] === 'dinkeskota'
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
      this.nameVillage = ''
      if (this.roles[0] !== 'dinkeskota') {
        this.listQuery.address_district_code = ''
        this.codeDistrict = ''
      }
      this.$store.dispatch('reports/listReportCase', this.listQuery)
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
  .reduce-padding-right {
    padding-right: 6px;
  }
  .reduce-padding-left {
    padding-left: 6px;
  }
  .main-div {
    margin-top: 20px;
  }
  .container {
    padding: 0px 35px;
  }
  .btn-reset {
    height: 46px !important;
    min-width: 95px!important;
    color: white !important;
  }
  .btn-cari {
    height: 46px !important;
    min-width: 95px!important;
  }
</style>
