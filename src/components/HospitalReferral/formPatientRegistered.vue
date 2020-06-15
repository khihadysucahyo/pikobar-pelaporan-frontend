<template>
  <v-form
    ref="form"
    lazy-validation
  >
    <v-row>
      <v-col>
        <label>{{ $t('label.search_patient_by_name_nik') }}</label>
        <ValidationProvider
          v-slot="{ errors }"
        >
          <v-autocomplete
            v-model="formReferral.user_id"
            :items="caseList"
            :error-messages="errors"
            :loading="isCaseLoading"
            :search-input.sync="searchCase"
            menu-props="auto"
            item-text="name"
            item-value="_id"
            single-line
            solo
            autocomplete
          />
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <label>{{ $t('label.referral_hospital') }}</label>
        <ValidationProvider
          v-slot="{ errors }"
        >
          <v-autocomplete
            v-model="formReferral.transfer_to_unit_id"
            :items="unitList"
            :error-messages="errors"
            :loading="isUnitLoading"
            :search-input.sync="searchUnit"
            menu-props="auto"
            item-text="name"
            item-value="_id"
            single-line
            solo
            autocomplete
          />
        </ValidationProvider>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'FormPatientRegistered',
  components: {
    ValidationProvider
  },
  props: {
    formReferral: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isUnitLoading: false,
      isCaseLoading: false,
      caseList: [],
      unitList: [],
      searchCase: null,
      searchUnit: null,
      queryUnit: {
        search: '',
        unit_type: 'rumahsakit'
      }
    }
  },
  watch: {
    async searchCase(value) {
      this.isUnitLoading = true
      this.queryUnit.search = value
      const response = await this.$store.dispatch('region/listUnit', this.queryUnit)
      this.unitList = response.data.itemsList
      this.isUnitLoading = false
    },
    async searchUnit(value) {
      this.isUnitLoading = true
      this.queryUnit.search = value
      const response = await this.$store.dispatch('region/listUnit', this.queryUnit)
      this.unitList = response.data.itemsList
      this.isUnitLoading = false
    }
  },
  async mounted() {
    const response = await this.$store.dispatch('region/listUnit', this.queryUnit)
    this.unitList = response.data.itemsList
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
