<template>
  <v-container
    v-if="display"
    fluid
    grid-list-xl
    py-0
    mb-10
    class="dashboard-case-new"
  >
    <h3><strong>{{ `${$t('label.dashboard')} ${$t('label.case')} ${$t('label.covid19')}` }}</strong></h3>
    <v-row class="mb-3">
      <v-col cols="12">
        <v-card
          class="chart mx-auto"
          outlined
        >
          <v-card-text class="white--text disclaimer">
            {{ $t('label.dashboard_disclaimer') }}
            <a
              class="white--text help"
              @click="handleHelp"
            >
              {{ $t('label.disclaimer_help') }}
            </a>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="filter mb-3">
      <v-col
        cols="12"
        lg="8"
      >
        <v-row>
          <v-col
            cols="12"
            lg="4"
            class="py-0"
          >
            <select-area-district-city
              :disabled-district="disabledDistrict"
              :district-city="districtCity"
              :city-district.sync="districtCity"
              :on-select-district="onSelectDistrict"
            />
          </v-col>
          <v-col
            cols="12"
            lg="4"
            class="py-0"
          >
            <select-area-sub-district
              :sub-district="subDistrict"
              :update-sub-district.sync="subDistrict"
              :code-district="districtCity.kota_kode"
              :district-code.sync="districtCity.kota_kode"
              :on-select-sub-district="onSelectSubDistrict"
            />
          </v-col>
          <v-col
            cols="12"
            lg="4"
            class="py-0"
          >
            <select-area-village
              :village="village"
              :update-village.sync="village"
              :code-sub-district="subDistrict.kecamatan_kode"
              :sub-district-code.sync="subDistrict.kecamatan_kode"
              :on-select-village="onSelectVillage"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        lg="2"
      >
        <div class="pt-0">
          <v-btn
            block
            color="success"
            class="button"
            @click="onSearch"
          >
            {{ $t('label.look_for_it') }}
          </v-btn>
        </div>
      </v-col>
      <v-col
        cols="12"
        lg="2"
      >
        <div class="pt-0">
          <v-btn
            block
            color="grey darken-3"
            class="button white--text"
            @click="onReset"
          >
            {{ $t('label.reset') }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row class="statistic mb-1">
      <v-col
        cols="12"
        lg="3"
      >
        <statistic-new-confirmed
          :loading="false"
          :total="1128723459"
        />
      </v-col>
      <v-col
        cols="12"
        lg="3"
      >
        <statistic-new-active
          :loading="false"
          :total="4823782770"
        />
      </v-col>
      <v-col
        cols="12"
        lg="3"
      >
        <statistic-new-recovered
          :loading="false"
          :total="2768236235"
        />
      </v-col>
      <v-col
        cols="12"
        lg="3"
      >
        <statistic-new-death
          :loading="false"
          :total="7718272368"
        />
      </v-col>
    </v-row>
    <v-row class="statistic mb-3">
      <v-col
        cols="12"
        lg="4"
      >
        <statistic-new-probable
          :loading="false"
          :total="1233287459"
        />
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
        <statistic-new-suspect
          :loading="false"
          :total="1827123459"
        />
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
        <statistic-new-close-contact
          :loading="false"
          :total="6218123459"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardCaseNew',
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
      display: true,
      disabledDistrict: false,
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
      listQuery: {
        address_district_code: null,
        address_subdistrict_code: null,
        address_village_code: null
      }
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles',
      'fullName',
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
      this.listQuery.address_district_code = this.district_user
    }

    this.districtCity = {
      kota_kode: this.district_user,
      kota_nama: this.district_name_user
    }
  },
  beforeDestroy() {
    this.clearCity()
    this.clearDistrict()
    this.clearVillage()
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
    async onSearch() {

    },
    async onReset() {
      if (this.roles[0] === 'dinkesprov' || this.roles[0] === 'superadmin') {
        this.clearCity()
      }
      this.clearDistrict()
      this.clearVillage()
    },
    clearCity() {
      this.districtCity = {
        kota_kode: null,
        kota_nama: null
      }
      this.filterActive.address_district_code = null
    },
    clearDistrict() {
      this.subDistrict = {
        kecamatan_kode: null,
        kecamatan_nama: null
      }
      this.filterActive.address_subdistrict_code = null
    },
    clearVillage() {
      this.village = {
        desa_kode: null,
        desa_nama: null
      }
      this.filterActive.address_village_code = null
    },
    handleHelp() {
      window.open('https://s.id/panduan_laporcovid19', '_blank')
    }
  }
}
</script>

<style lang="scss">
.dashboard-case-new {
  .disclaimer {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    background: linear-gradient(80.13deg, #27ae60 0%, #6fcf97 100%);
    padding: 24px;
  }

  .disclaimer .help {
    font-size: 16px;
    text-decoration: underline;
  }

  .v-text-field.v-text-field--enclosed .v-text-field__details {
    display: none !important;
  }

  .button {
    height: 46px !important;
    text-transform: none;
  }
}
</style>
