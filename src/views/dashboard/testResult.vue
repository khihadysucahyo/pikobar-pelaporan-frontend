<template>
  <v-container
    v-if="display"
    fluid
    grid-list-xl
    py-0
    mb-10
    class="dashboard-test-result"
  >
    <h3><strong>{{ $t('label.dashboard') }} {{ $t('label.test_result_id') }}</strong></h3>
    <v-row class="filter mb-3">
      <v-col
        cols="12"
        lg="10"
      >
        <v-row>
          <v-col
            cols="12"
            lg="3"
            class="py-0"
          >
            <label>{{ $t('label.date') }}</label>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="dateActive"
              persistent
              width="291"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateActive"
                  label="Pilih Tanggal"
                  prepend-icon="event"
                  readonly
                  v-bind="attrs"
                  solo-inverted
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="dateActive"
                range
                scrollable
                locale="id"
              >
                <div
                  class="d-flex justify-end"
                  style="width: 100%"
                >
                  <v-btn
                    color="grey darken-3"
                    class="button white--text mr-3"
                    min-width="auto"
                    @click="modal = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="success"
                    class="button"
                    min-width="auto"
                    @click="onSelectDate(dateActive)"
                  >
                    OK
                  </v-btn>
                </div>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col
            cols="12"
            lg="3"
            class="py-0"
          >
            <label>{{ $t('label.district_city') }}</label>
            <select-area-district-city
              :disabled-district="disabledDistrict"
              :district-city="districtCity"
              :city-district.sync="districtCity"
              :on-select-district="onSelectDistrict"
            />
          </v-col>
          <v-col
            cols="12"
            lg="3"
            class="py-0"
          >
            <label>{{ $t('label.subdistrict') }}</label>
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
            lg="3"
            class="py-0"
          >
            <label>{{ $t('label.village') }}</label>
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
        <div class="pt-lg-5">
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
    <v-row class="d-flex flex-wrap mb-3">
      <v-col
        cols="12"
        lg="2"
        md="12"
        class="d-flex"
      >
        <v-card
          class="total-test-result d-flex align-center"
          style="width: 100%"
          outlined
        >
          <v-card-text class="white--text text-center">
            <h4 class="mb-0"><strong>Total Hasil Tes</strong></h4>
            <h3 class="mb-0"><strong>193.803</strong></h3>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        lg="5"
        md="12"
      >
        <v-card
          class="total-rapid"
          outlined
        >
          <v-card-text>
            <div class="d-flex align-center mb-2">
              <div class="box mr-3 pa-4">
                <v-img src="@/static/rapid.svg" />
              </div>
              <div>
                <span>Rapid Tes</span>
                <h3 class="mb-0"><strong>193.803</strong></h3>
              </div>
            </div>
            <v-row>
              <v-col
                cols="12"
                sm="4"
                xs="12"
              >
                <v-card
                  class="total-rapid-reaktif"
                  outlined
                >
                  <v-card-text class="text-center">
                    <span>Reaktif</span>
                    <h4 class="mb-0"><strong>5.118</strong></h4>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                xs="12"
              >
                <v-card
                  class="total-rapid-nonreaktif"
                  outlined
                >
                  <v-card-text class="text-center">
                    <span>Non Reaktif</span>
                    <h4 class="mb-0"><strong>188.678</strong></h4>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                xs="12"
              >
                <v-card
                  class="total-rapid-inkonklusif"
                  outlined
                >
                  <v-card-text class="text-center">
                    <span>Inkonklusif</span>
                    <h4 class="mb-0"><strong>7</strong></h4>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        lg="5"
        md="12"
      >
        <v-card
          class="total-pcr"
          outlined
        >
          <v-card-text>
            <div class="d-flex align-center mb-2">
              <div class="box mr-3 pa-4">
                <v-img src="@/static/pcr.svg" />
              </div>
              <div>
                <span>PCR</span>
                <h3 class="mb-0"><strong>193.803</strong></h3>
              </div>
            </div>
            <v-row>
              <v-col
                cols="12"
                sm="4"
                xs="12"
              >
                <v-card
                  class="total-rapid-positif"
                  outlined
                >
                  <v-card-text class="text-center">
                    <span>Positif</span>
                    <h4 class="mb-0"><strong>5.118</strong></h4>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                xs="12"
              >
                <v-card
                  class="total-rapid-negatif"
                  outlined
                >
                  <v-card-text class="text-center">
                    <span>Negatif</span>
                    <h4 class="mb-0"><strong>188.678</strong></h4>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                xs="12"
              >
                <v-card
                  class="total-rapid-invalid"
                  outlined
                >
                  <v-card-text class="text-center">
                    <span>Invalid</span>
                    <h4 class="mb-0"><strong>7</strong></h4>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-tabs class="mb-3">
      <v-tab
        :key="'all'"
        @click="filterTab('all')"
      >
        Semua
      </v-tab>
      <v-tab
        :key="'rapid'"
        @click="filterTab('rapid')"
      >
        Rapid Test
      </v-tab>
      <v-tab
        :key="'pcr'"
        @click="filterTab('pcr')"
      >
        PCR
      </v-tab>
    </v-tabs>
    <v-row class="mb-1">
      <v-col cols="12">
        <chart-test-daily :tab-active="tabActive" />
      </v-col>
    </v-row>
    <v-row class="mb-1">
      <v-col
        cols="12"
        lg="6"
        sm="12"
      >
        <chart-test-area :tab-active="tabActive" />
      </v-col>
      <v-col
        cols="12"
        lg="6"
        sm="12"
      >
        <chart-test-target :tab-active="tabActive" />
      </v-col>
    </v-row>
    <v-row class="mb-1">
      <v-col
        cols="12"
        lg="4"
        sm="12"
      >
        <chart-test-gender :tab-active="tabActive" />
      </v-col>
      <v-col
        cols="12"
        lg="8"
        sm="12"
      >
        <chart-test-age :tab-active="tabActive" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardTestResult',
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
      dateActive: [],
      modal: false,
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
      filterActive: {
        address_district_code: null,
        address_subdistrict_code: null,
        address_village_code: null
      },
      tabActive: 'all'
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
    // dateActive(val) {
    //   console.log(val)
    // }
  },
  async beforeMount() {
    if (this.roles[0] === 'faskes') {
      this.display = false
    }
  },
  beforeDestroy() {
    this.clearCity()
    this.clearDistrict()
    this.clearVillage()
  },
  methods: {
    filterTab(value) {
      this.tabActive = value
    },
    async onSelectDate(event) {
      this.$refs.dialog.save(event)
    },
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
    async onReset() {
      this.clearDate()
      if (this.roles[0] === 'dinkesprov' || this.roles[0] === 'superadmin') {
        this.clearCity()
      }
      this.clearDistrict()
      this.clearVillage()
    },
    clearDate() {
      this.dateActive = []
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
    }
  }
}
</script>

<style lang="scss">
.dashboard-test-result {
  .button {
    height: 46px !important;
    text-transform: none;
  }

  .v-text-field.v-text-field--enclosed .v-text-field__details {
    display: none !important;
  }

  .total-test-result {
    background: linear-gradient(38.05deg, #27ae60 0%, #6fcf97 100%);
  }

  .box {
    width: 54px;
    height: 54px;
    border-radius: 8px;
  }

  .total-rapid {
    .box {
      background: #27ae60;
    }
  }

  .total-pcr {
    .box {
      background: #f2c94c;
    }
  }
}
</style>
