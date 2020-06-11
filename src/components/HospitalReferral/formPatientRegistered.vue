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
          <v-text-field
            v-model="formReferral"
            :error-messages="errors"
            solo-inverted
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
          <v-text-field
            v-model="formReferral"
            :error-messages="errors"
            solo-inverted
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
  }
}
</script>

<style scoped>

</style>
