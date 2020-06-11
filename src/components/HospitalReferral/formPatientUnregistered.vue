<template>
  <div>
    <form-information-patient
      :form-pasien="formPasien"
      :patient-referral="true"
    />
    <form-information-history
      :form-pasien="formPasien"
      :patient-referral="true"
    />
    <v-container>
      <v-expansion-panels
        v-model="panelListRiwayat"
        multiple
      >
        <v-expansion-panel>
          <v-expansion-panel-header style="color: #27AE60;">
            <img src="@/static/hospital_refferal.svg" style="max-width: 30px;">
            {{ $t('label.choose_referral_hospital') }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form
              ref="form"
              lazy-validation
            >
              <v-row>
                <v-col>
                  <label>{{ $t('label.choose_referral_hospital') }}</label>
                  <ValidationProvider
                    v-slot="{ errors }"
                  >
                    <v-autocomplete
                      v-model="formPasien.hospital_referral"
                      :items="hospitalWestJavaList"
                      :error-messages="errors"
                      :return-object="true"
                      :label="$t('label.location_hospital')"
                      menu-props="auto"
                      item-text="name"
                      item-value="name"
                      single-line
                      solo
                      autocomplete
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-form>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
export default {
  name: 'FormPatientUnregistered',
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
      formPasien: {},
      hospitalWestJavaList: [],
      panelListRiwayat: [0]
    }
  },
  async mounted() {
    var paramHospitalWestJava = { 'rs_jabar': true }
    const responseWestJava = await this.$store.dispatch('region/getListHospital', paramHospitalWestJava)
    this.hospitalWestJavaList = responseWestJava.data
  }
}
</script>

<style scoped>

</style>
