<template>
  <v-container fluid grid-list-xl py-0 mb-5>
    <v-row>
      <v-col
        cols="12"
      >
        <h4>Filter Berdasarkan:</h4>
        <v-divider class="mb-0" />
      </v-col>
      <v-col
        cols="12"
        md="2"
        sm="12"
      >
        <select-area-district-city
          :disabled-select="disabledAddress"
          :disabled-district="disabledDistrict"
          :required="requiredAddress"
          :district-city="districtCity"
          :city-district.sync="districtCity"
          :on-select-district="onSelectDistrict"
        />
      </v-col>
      <v-col
        cols="12"
        md="2"
        sm="12"
      >
        <select-area-sub-district
          :disabled-select="disabledAddress"
          :required="requiredAddress"
          :sub-district="subDistrict"
          :update-sub-district.sync="subDistrict"
          :code-district="districtCity.kota_kode"
          :district-code.sync="districtCity.kota_kode"
          :on-select-sub-district="onSelectSubDistrict"
        />
      </v-col>
      <v-col
        cols="12"
        md="2"
        sm="12"
      >
        <select-area-village
          :disabled-select="disabledAddress"
          :required="requiredAddress"
          :village="village"
          :update-village.sync="village"
          :code-sub-district="subDistrict.kecamatan_kode"
          :sub-district-code.sync="subDistrict.kecamatan_kode"
          :on-select-village="onSelectVillage"
        />
      </v-col>
      <v-col
        cols="12"
        md="2"
        sm="12"
      >
        <v-btn
          block
          color="grey darken-3"
          class="button white--text"
        >
          Reset
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        md="2"
        sm="12"
      >
        <v-btn
          block
          color="success"
          class="button"
        >
          Filter
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        md="2"
        sm="12"
      >
        <v-btn
          block
          color="info"
          class="button"
        >
          Export Data
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="3"
        sm="6"
      >
        <statistic-total-confirmed />
      </v-col>
      <v-col
        cols="12"
        md="3"
        sm="6"
      >
        <statistic-total-active />
      </v-col>
      <v-col
        cols="12"
        md="3"
        sm="6"
      >
        <statistic-total-recovered />
      </v-col>
      <v-col
        cols="12"
        md="3"
        sm="6"
      >
        <statistic-total-death />
      </v-col>
    </v-row>
    <v-row class="mb-3">
      <v-col
        cols="12"
        md="6"
      >
        <statistic-person-under-monitoring />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <statistic-patient-under-investigation />
      </v-col>
    </v-row>
    <v-tabs>
      <v-tab
        :key="'daily'"
        :href="'#tab-daily'"
      >
        Angka Harian
      </v-tab>
      <v-tab
        :key="'cumulative'"
        :href="'#tab-cumulative'"
      >
        Kumulatif
      </v-tab>
      <v-tab-item
        :key="'daily'"
        :value="'tab-daily'"
      >
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <chart-daily-person-under-monitoring />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <chart-daily-patient-under-investigation />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <chart-daily-confirmed />
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item
        :key="'cumulative'"
        :value="'tab-cumulative'"
      >
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <chart-cumulative-person-under-monitoring />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <chart-cumulative-patient-under-investigation />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <chart-cumulative-confirmed />
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs>
    <v-row>
      <v-col
        cols="12"
      >
        <map-point />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <chart-gender />
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <chart-age />
      </v-col>
    </v-row>
    <!-- <card-data /> -->
  </v-container>
</template>

<script>
export default {
  name: 'Dashboard',
  props: {
    disabledAddress: {
      type: Boolean,
      default: false
    },
    disabledDistrict: {
      type: Boolean,
      default: false
    },
    requiredAddress: {
      type: Boolean,
      default: false
    },
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
      }
    }
  },
  watch: {
    'districtCode': function(value) {
      if (value) {
        this.districtCity = {
          kota_kode: value,
          kota_nama: this.districtName
        }
      } else {
        this.districtCity = {
          kota_kode: null,
          kota_nama: null
        }
      }
    },
    'subDistrictCode': function(value) {
      this.subDistrict = {
        kecamatan_kode: value,
        kecamatan_nama: this.subDistrictName
      }
    },
    'villageCode': function(value) {
      this.village = {
        desa_kode: value,
        desa_nama: this.villageName
      }
    }
  },
  methods: {
    async onSelectDistrict(value) {
      this.districtCity = value
      this.$emit('update:codeDistrict', value.kota_kode)
      this.$emit('update:nameDistrict', value.kota_nama)
    },
    async onSelectSubDistrict(value) {
      this.subDistrict = value
      this.$emit('update:codeSubDistrict', value.kecamatan_kode)
      this.$emit('update:nameSubDistrict', value.kecamatan_nama)
    },
    async onSelectVillage(value) {
      this.village = value
      this.$emit('update:codeVillage', value.desa_kode)
      this.$emit('update:nameVillage', value.desa_nama)
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
