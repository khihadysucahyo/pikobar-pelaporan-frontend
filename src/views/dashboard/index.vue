<template>
  <v-container v-if="display" fluid grid-list-xl py-0 mb-5>
    <v-row>
      <v-col cols="12">
        <h4>{{ $t('label.look_for_it') }} {{ $t('label.based') }}:</h4>
        <v-divider class="mb-0" />
      </v-col>
      <v-col cols="12" md="2" sm="12">
        <select-area-district-city
          :disabled-district="disabledDistrict"
          :district-city="districtCity"
          :city-district.sync="districtCity"
          :on-select-district="onSelectDistrict"
        />
      </v-col>
      <v-col cols="12" md="2" sm="12">
        <select-area-sub-district
          :sub-district="subDistrict"
          :update-sub-district.sync="subDistrict"
          :code-district="districtCity.kota_kode"
          :district-code.sync="districtCity.kota_kode"
          :on-select-sub-district="onSelectSubDistrict"
        />
      </v-col>
      <v-col cols="12" md="2" sm="12">
        <select-area-village
          :village="village"
          :update-village.sync="village"
          :code-sub-district="subDistrict.kecamatan_kode"
          :sub-district-code.sync="subDistrict.kecamatan_kode"
          :on-select-village="onSelectVillage"
        />
      </v-col>
      <v-col cols="12" md="2" sm="12">
        <v-btn block color="grey darken-3" class="button white--text" @click="onReset">
          {{ $t('label.reset') }}
        </v-btn>
      </v-col>
      <v-col cols="12" md="2" sm="12">
        <v-btn block color="success" class="button" @click="onSearch">
          {{ $t('label.look_for_it') }}
        </v-btn>
      </v-col>
      <v-col cols="12" md="2" sm="12">
        <v-btn block color="info" class="button">
          {{ $t('label.export_data') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3" sm="6">
        <statistic-total-confirmed
          :loading="loadingStatistic"
          :total-confirmed="totalConfirmation"
        />
      </v-col>
      <v-col cols="12" md="3" sm="6">
        <statistic-total-active
          :loading="loadingStatistic"
          :total-active="final.POSITIF"
        />
      </v-col>
      <v-col cols="12" md="3" sm="6">
        <statistic-total-recovered
          :loading="loadingStatistic"
          :total-recovered="final.SEMBUH"
        />
      </v-col>
      <v-col cols="12" md="3" sm="6">
        <statistic-total-death
          :loading="loadingStatistic"
          :total-death="final.MENINGGAL"
        />
      </v-col>
    </v-row>
    <v-row class="mb-3">
      <v-col cols="12" md="4">
        <statistic-people-without-symptoms
          :loading="loadingStatistic"
          :total-otg="patien.OTG"
        />
      </v-col>
      <v-col cols="12" md="4">
        <statistic-person-under-monitoring
          :loading="loadingStatistic"
          :total-odp="patien.ODP"
        />
      </v-col>
      <v-col cols="12" md="4">
        <statistic-patient-under-investigation
          :loading="loadingStatistic"
          :total-pdp="patien.PDP"
        />
      </v-col>
    </v-row>
    <v-divider />
    <v-tabs>
      <v-tab :key="'daily'" :href="'#tab-daily'">
        {{ $t('label.daily_number') }}
      </v-tab>
      <v-tab :key="'cumulative'" :href="'#tab-cumulative'">
        {{ $t('label.cumulative') }}
      </v-tab>
      <v-tab-item :key="'daily'" :value="'tab-daily'">
        <v-row>
          <v-col cols="12" md="6">
            <chart-daily-people-without-symptoms :chart-height="250" />
          </v-col>
          <v-col cols="12" md="6">
            <chart-daily-person-under-monitoring :chart-height="250" />
          </v-col>
          <v-col cols="12" md="6">
            <chart-daily-patient-under-investigation :chart-height="250" />
          </v-col>
          <v-col cols="12" md="6">
            <chart-daily-confirmed :chart-height="250" />
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item :key="'cumulative'" :value="'tab-cumulative'">
        <v-row>
          <v-col cols="12" md="6">
            <chart-cumulative-people-without-symptoms :chart-height="250" />
          </v-col>
          <v-col cols="12" md="6">
            <chart-cumulative-person-under-monitoring :chart-height="250" />
          </v-col>
          <v-col cols="12" md="6">
            <chart-cumulative-patient-under-investigation :chart-height="250" />
          </v-col>
          <v-col cols="12" md="6">
            <chart-cumulative-confirmed :chart-height="250" />
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs>
    <v-divider />
    <v-tabs>
      <v-tab :key="'map'" :href="'#tab-map'">
        Peta Sebaran
      </v-tab>
      <v-tab :key="'case'" :href="'#tab-case'">
        Kasus Keterkaitan
      </v-tab>
      <v-tab-item :key="'map'" :value="'tab-map'">
        <v-row>
          <v-col cols="12">
            <map-point
              :filter-data="filter"
            />
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item :key="'case'" :value="'tab-case'">
        <v-row>
          <v-col cols="12">
            <graph-case />
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs>
    <v-divider />
    <!-- <v-row>
      <v-col cols="12">
        <map-point />
      </v-col>
    </v-row>
    <v-divider /> -->
    <v-row>
      <v-col cols="12" md="4">
        <chart-gender />
      </v-col>
      <v-col cols="12" md="8">
        <chart-age />
      </v-col>
    </v-row>
    <!-- <card-data /> -->
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  props: {
    districtCode: {
      type: String,
      default: null
    },
    districtName: {
      type: String,
      default: null
    },
    subDistrictCode: {
      type: String,
      default: null
    },
    subDistrictName: {
      type: String,
      default: null
    },
    villageCode: {
      type: String,
      default: null
    },
    villageName: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loadingStatistic: true,
      display: true,
      districtCity: {
        kota_kode: this.districtCode,
        kota_nama: this.districtName
      },
      subDistrict: {
        kecamatan_kode: this.subDistrictCode,
        kecamatan_nama: this.subDistrictName
      },
      village: {
        desa_kode: this.villageCode,
        desa_nama: this.villageName
      },
      disabledDistrict: false,
      filter: {
        isCity: false,
        isDistrict: false,
        isVillage: false,
        city: null,
        district: null,
        village: null
      },
      patien: {
        OTG: 0,
        ODP: 0,
        PDP: 0,
        POSITIF: 0
      },
      final: {
        MENINGGAL: 0,
        SEMBUH: 0,
        POSITIF: 0
      },
      listQuery: {
        address_district_code: ''
      },
      totalConfirmation: 0
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles',
      'fullname',
      'district_user',
      'district_name_user'
    ])
  },
  watch: {
    districtCode: (value) => {
      if (value) {
        this.districtCity = {
          kota_kode: value,
          kota_nama: this.districtName
        }
      } else {
        this.clearCity()
      }
    },
    subDistrictCode: (value) => {
      this.subDistrict = {
        kecamatan_kode: value,
        kecamatan_nama: this.subDistrictName
      }
    },
    villageCode: (value) => {
      this.village = {
        desa_kode: value,
        desa_nama: this.villageName
      }
    }
  },
  async beforeMount() {
    if (this.roles[0] === 'faskes') {
      this.display = false
    }

    if (this.roles[0] === 'dinkeskota') {
      this.disabledDistrict = true
      this.filter.isCity = true
      this.filter.city = this.district_user
      this.listQuery.address_district_code = this.district_user
    }

    this.districtCity = {
      kota_kode: this.district_user,
      kota_nama: this.district_name_user
    }

    const data = await this.$store.dispatch('reports/countReportCase', this.listQuery)
    const dataFinal = await this.$store.dispatch('reports/countReportCaseFinal', this.listQuery)

    if (dataFinal) this.loadingStatistic = false

    this.patien = data.data
    this.final = dataFinal.data
    this.totalConfirmation = this.final.POSITIF + this.final.SEMBUH + this.final.MENINGGAL
  },
  beforeDestroy() {
    this.clearCity()
    this.clearDistrict()
    this.clearVillage()
    this.filter = null
  },
  methods: {
    async onSelectDistrict(value) {
      this.districtCity = value
      this.clearDistrict()
      this.clearVillage()
      this.$emit('update:codeDistrict', value.kota_kode)
      this.$emit('update:nameDistrict', value.kota_nama)
    },
    async onSelectSubDistrict(value) {
      this.subDistrict = value
      this.clearVillage()
      this.$emit('update:codeSubDistrict', value.kecamatan_kode)
      this.$emit('update:nameSubDistrict', value.kecamatan_nama)
    },
    async onSelectVillage(value) {
      this.village = value
      this.$emit('update:codeVillage', value.desa_kode)
      this.$emit('update:nameVillage', value.desa_nama)
    },
    onReset() {
      if (this.roles[0] === 'dinkesprov') {
        this.clearCity()
        this.filter.isCity = false
        this.filter.city = null
      }
      this.clearDistrict()
      this.clearVillage()

      this.filter.isDistrict = false
      this.filter.isVillage = false
      this.filter.district = null
      this.filter.village = null
    },
    onSearch() {
      this.filter.city = this.districtCity.kota_kode
      this.filter.district = this.subDistrict.kecamatan_kode
      this.filter.village = this.village.desa_kode
      this.filter.isCity = !!this.filter.city
      this.filter.isDistrict = !!this.filter.district
      this.filter.isVillage = !!this.filter.village
    },
    clearCity() {
      this.districtCity = {
        kota_kode: null,
        kota_nama: null
      }
    },
    clearDistrict() {
      this.subDistrict = {
        kecamatan_kode: null,
        kecamatan_nama: null
      }
    },
    clearVillage() {
      this.village = {
        desa_kode: null,
        desa_nama: null
      }
    }
  }
}
</script>

<style scoped>
.button {
  height: 46px !important;
  text-transform: none;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
  display: none !important;
}
</style>
