<template>
  <v-container>
    <v-form
      ref="form"
      lazy-validation
    >
      <v-row class="filter-row">
        <v-col cols="12" sm="3">
          <v-label class="title">{{ $t('label.reference_place') }}:</v-label>
          <v-select
            v-model="listQuery.final_result"
            :items="resultCheckList"
            :placeholder="$t('label.choose_place')"
            solo
            item-text="label"
            item-value="value"
          />
        </v-col>
        <v-col cols="12" sm="3">
          <v-label class="title">{{ $t('label.criteria') }}:</v-label>
          <v-select
            v-model="listQuery.mechanism"
            :items="mechanismOptions"
            :placeholder="$t('label.choose_criteria')"
            solo
          />
        </v-col>
        <v-col cols="12" sm="3">
          <v-label class="title">{{ $t('label.results') }}:</v-label>
          <v-select
            v-model="listQuery.test_method"
            :items="methodsOptions"
            :placeholder="$t('label.choose_results')"
            solo
            item-text="label"
            item-value="value"
          />
        </v-col>
        <v-col cols="12" sm="3">
          <v-label class="title">{{ $t('label.referral_date') }}:</v-label>
          <input-date-picker
            :format-date="formatDate"
            :label="$t('label.choose_date')"
            :date-value="listQuery.start_date"
            :value-date.sync="listQuery.start_date"
            @changeDate="listQuery.start_date = $event"
          />
        </v-col>
      </v-row>
      <v-row class="filter-row">
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
        <v-col cols="12" sm="3">
          <br>
          <v-row>
            <v-col class="pt-0">
              <v-btn
                block
                color="#4f4f4f"
                class="btn-reset"
                @click="onReset"
              >
                {{ $t('label.reset') }}
              </v-btn>
            </v-col>
            <v-col class="pt-0">
              <v-btn
                block
                color="success"
                class="btn-search"
                @click="onSearch"
              >
                {{ $t('label.look_for_it') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FilterHospitalReferral',
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
      methodsOptions: [
        'HAND PRIX',
        'FLEBOTOMY'
      ],
      mechanismOptions: [
        'Door to door',
        'Faskes',
        'Drive-Thru'
      ],
      categoryList: [
        { label: 'Kategori A', value: 'A' },
        { label: 'Kategori B', value: 'B' },
        { label: 'Kategori C', value: 'C' }
      ],
      resultCheckList: [
        { label: 'Negatif', value: 'NEGATIF' },
        { label: 'Positif', value: 'POSITIF' },
        { label: 'Invalid', value: 'INVALID' },
        { label: 'Inkonklusif', value: 'INKONKLUSIF' },
        { label: 'Reaktif', value: 'REAKTIF' },
        { label: 'Non Reaktif', value: 'NON REAKTIF' }
      ]
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles',
      'district_user',
      'district_name_user'
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
      this.listQuery.mechanism = ''
      this.listQuery.test_method = ''
      this.listQuery.category = ''
      this.listQuery.address_district_code = ''
      this.listQuery.start_date = ''
      this.listQuery.end_date = ''
      this.$refs.form.reset()
      this.$store.dispatch('rdt/getListRDT', this.listQuery)
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
  .btn-reset {
    height: 46px !important;
    color: white !important;
  }
  .btn-search {
    height: 46px !important;
  }
</style>
