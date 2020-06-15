<template>
  <v-form
    ref="form"
    lazy-validation
  >
    <v-row>
      <v-col>
        <label>{{ $t('label.nik').toUpperCase() }}</label>
        <ValidationProvider
          v-slot="{ errors }"
        >
          <v-autocomplete
            v-model="formReferral"
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
    <v-row>
      <v-col>
        <label>{{ $t('label.referral_hospital') }}</label>
        <ValidationProvider
          v-slot="{ errors }"
        >
          <v-autocomplete
            v-model="formReferral"
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
      type: Array,
      default: null
    }
  },
  data() {
    return {
      isUnitLoading: false,
      unitList: []
    }
  },
  methods: {
    searchUnit() {
      return ''
    }
  }
}
</script>

<style scoped>

</style>
