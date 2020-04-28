<template>
  <div class="main-div">
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
          <v-col cols="12" sm="2">
            <v-label class="title">{{ $t('label.roles') }}:</v-label>
            <v-select
              v-model="listQuery.final_result"
              :items="rolesList"
              solo
              item-text="label"
              item-value="value"
            />
          </v-col>
          <v-col cols="12" sm="7" class="reduce-padding-top">
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
          <v-col auto>
            <v-row style="padding-top: 10px;">
              <v-col cols="12" md="5" sm="12">
                <v-btn
                  block
                  color="#4f4f4f"
                  class="btn-reset"
                  @click="onReset"
                >
                  {{ $t('label.reset') }}
                </v-btn>
              </v-col>
              <v-col cols="12" md="5" sm="12">
                <v-btn
                  block
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
  name: 'UserFilter',
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
      rolesList: [
        {
          label: 'Dinkes Provinsi',
          value: 'dinkesprov'
        },
        {
          label: 'Dinkes Kab/Kota',
          value: 'dinkeskabkota'
        },
        {
          label: 'Faskes',
          value: 'faskes'
        }
      ]
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
  async beforeMount() {
    this.disabledDistrict = await this.roles[0] === 'dinkeskota'
  },
  methods: {
    onSelectDistrict(value) {
      this.listQuery.address_district_code = value.kota_kode
    },
    onReset() {
      this.listQuery.search = ''
      this.listQuery.address_subdistrict_code = ''
      this.listQuery.address_village_code = ''
      this.nameVillage = ''
      if (this.roles[0] !== 'dinkeskota') {
        this.listQuery.address_district_code = ''
        this.codeDistrict = ''
      }
      this.$store.dispatch('user/listUser', this.listQuery)
    }
  }
}
</script>

<style scoped>
  .reduce-padding-top {
    padding-top: 0px !important;
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
