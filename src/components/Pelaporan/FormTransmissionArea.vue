<template>
  <v-container fluid>
    <v-form ref="form" lazy-validation>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.province') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-select
              v-model="formPasien.province"
              :items="specimenType"
              solo
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.city') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-select
              v-model="formPasien.city"
              :items="specimenType"
              solo
            />
          </ValidationProvider>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
import { specimenType } from '@/utils/constantVariable'
export default {
  name: 'FormTransmissionArea',
  components: {
    ValidationProvider
  },
  props: {
    formPasien: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      specimenType: specimenType,
      formatDate: 'YYYY/MM/DD'
    }
  },
  mounted() {
    //
  },
  methods: {
    //
  }
}
</script>
