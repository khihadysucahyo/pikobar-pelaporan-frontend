<template>
  <div class="type-questions-ddress">
    <v-row>
      <v-col cols="12" md="4" sm="4">
        <v-label v-if="isLabel" class="title">Kabupaten/Kota:</v-label>
        <select-area-district-city
          :disabled-select="disabledAddress"
          :disabled-district="disabledDistrict"
          :required="requiredAddress"
          :district-city="districtCity"
          :city-district.sync="districtCity"
          :on-select-district="onSelectDistrict"
        />
      </v-col>
      <v-col cols="12" md="4" sm="4">
        <v-label v-if="isLabel" class="title">Kecamatan:</v-label>
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
      <v-col cols="12" md="4" sm="4">
        <v-label v-if="isLabel" class="title">Kelurahan:</v-label>
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
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'AddressRegion',
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
    },
    isLabel: {
      type: Boolean,
      default: false
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
      if (value.length > 0) {
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
  mounted() {
    console.log(this.districtCode)
    console.log(this.districtName)
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
