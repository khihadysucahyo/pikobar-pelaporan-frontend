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
              :label="$t('label.search')"
              solo
              prepend-inner-icon="search"
            />
          </v-col>
        </v-row>
        <v-row class="filter-row">
          <v-col cols="12" sm="3">
            <v-label class="title">{{ $t('label.test_result') }}:</v-label>
            <v-select
              v-model="listQuery.final_result"
              :items="resultCheckList"
              solo
              item-text="label"
              item-value="value"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-label class="title">{{ $t('label.mechanism') }}:</v-label>
            <v-select
              v-model="listQuery.mechanism"
              :items="mechanismOptions"
              solo
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-label class="title">{{ $t('label.method_used') }}:</v-label>
            <v-select
              v-model="listQuery.test_method"
              :items="methodsOptions"
              solo
              item-text="label"
              item-value="value"
            />
          </v-col>
          <v-col v-if="roles[0] === 'dinkesprov'" cols="12" sm="3">
            <v-label class="title">{{ $t('label.test_place') }}:</v-label>
            <select-area-district-city
              :district-city="districtCity"
              :city-district.sync="districtCity"
              :on-select-district="onSelectDistrict"
            />
          </v-col>
        </v-row>
        <v-row class="filter-row">
          <v-col cols="12" sm="3">
            <v-label class="title">{{ $t('label.goal_category') }}:</v-label>
            <v-select
              v-model="listQuery.category"
              :items="categoryList"
              solo
              item-text="label"
              item-value="value"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-label class="title">{{ $t('label.inspection_date') }}:</v-label>
            <input-date-picker
              :format-date="formatDate"
              :label="$t('label.start_date')"
              :date-value="listQuery.start_date"
              :value-date.sync="listQuery.start_date"
              @changeDate="listQuery.start_date = $event"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <br>
            <input-date-picker
              :format-date="formatDate"
              :label="$t('label.end_date')"
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
                {{ $t('label.reset') }}
              </v-btn>
              <v-btn
                color="success"
                style="height: 46px;min-width: 100px;"
                @click="onSearch"
              >
                {{ $t('label.look_for_it') }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FilterTestResult',
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
      districtCity: {
        kota_kode: ''
      },
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
        { label: 'Invalid', value: 'INVALID' }
      ]
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles'
    ])
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
    margin-bottom: -40px;
  }
</style>
