<template>
  <div>
    <v-card class="disclaimer pa-7 mb-5" width="100%">
      <v-row class="mx-0 mb-2 headline">
        <div class="white--text">
          {{ $t('label.create_new_case_report') }}
        </div>
      </v-row>
      <v-row class="mx-0 mb-0">
        <span class="white--text">
          {{ $t('label.please_fill_in_form_below') }}
        </span>
      </v-row>
    </v-card>
    <ValidationObserver ref="observer">
      <v-row>
        <v-col auto>
          <v-expansion-panels
            v-model="volunteerPanel"
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold text-lg">
                {{ $t('label.form_volunteer_title') }}
              </v-expansion-panel-header>
              <v-divider />
              <v-expansion-panel-content>
                <form-volunteer :form-pasien="formPasien" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row>
        <v-col auto>
          <v-expansion-panels
            v-model="patientPanel"
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold text-lg">
                {{ $t('label.form_patient_title') }}
              </v-expansion-panel-header>
              <v-divider />
              <v-expansion-panel-content>
                <form-patient :form-pasien="formPasien" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row>
        <v-col auto>
          <v-expansion-panels
            v-model="historyCasePanel"
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold text-lg">
                {{ $t('label.form_case_history_title') }}
              </v-expansion-panel-header>
              <v-divider />
              <v-expansion-panel-content>
                <form-case-history :form-pasien="formPasien" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row>
        <v-col auto>
          <v-expansion-panels
            v-model="historySocioeconomicPanel"
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold text-lg">
                {{ $t('label.form_socioeconomic_title') }}
              </v-expansion-panel-header>
              <v-divider />
              <v-expansion-panel-content>
                <form-socioeconomic-history :form-pasien="formPasien" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row>
        <v-col auto>
          <v-expansion-panels
            v-model="contactFactorPanel"
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold text-lg">
                {{ $t('label.form_eposure_factor_title') }}
              </v-expansion-panel-header>
              <v-divider />
              <v-expansion-panel-content>
                <form-contact-factor :form-pasien="formPasien" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row>
        <v-col auto>
          <v-expansion-panels
            v-model="multipleCloseContactPanel"
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="font-weight-bold text-lg">
                {{ $t('label.form_close_contact_title') }}
              </v-expansion-panel-header>
              <v-divider />
              <v-expansion-panel-content>
                <form-multiple-close-contact :form-pasien="formPasien" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </ValidationObserver>
    <dialog-duplicated-nik :show-dialog="showDuplicatedNikDialog" :nik-number="nikNumber" :nik-name="nikName" :nik-author="nikAuthor" :show.sync="showDuplicatedNikDialog" />
    <v-container fluid>
      <v-row class="survey-bottom-form">
        <v-col class="text-right">
          <v-btn color="success" :loading="loading" bottom class="ml-2" @click="saveData">
            {{ $t('label.save') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import { mapGetters } from 'vuex'
import { rolesPerm, ResponseRequest } from '@/utils/constantVariable'

export default {
  components: {
    ValidationObserver
  },
  data() {
    return {
      loading: false,
      showDuplicatedNikDialog: false,
      nikNumber: null,
      nikName: null,
      nikAuthor: null,
      volunteerPanel: [0],
      patientPanel: [0],
      historyCasePanel: [0],
      historySocioeconomicPanel: [0],
      contactFactorPanel: [0],
      multipleCloseContactPanel: [0]
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles'
    ]),
    ...mapGetters('reports', [
      'formPasien'
    ])
  },
  mounted() {
    this.$store.dispatch('reports/resetFormPasien')
  },
  methods: {
    async saveData() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      if (this.formPasien.nik) {
        this.loading = true
        const response = await this.$store.dispatch('reports/revampGetNik', { params: this.formPasien.nik })
        if (response.data) {
          this.loading = false
          this.nikNumber = this.formPasien.nik
          this.nikName = this.formPasien.name
          this.showDuplicatedNikDialog = true
          return
        }
      }
      delete this.formPasien['_id']
      delete this.formPasien['id_case']
      try {
        this.formPasien.input_source = 'form app'
        const response = await this.$store.dispatch('reports/createRevampReportCase', this.formPasien)
        if (response.status !== ResponseRequest.UNPROCESSABLE) {
          await this.$store.dispatch('toast/successToast', this.$t('success.create_data_success'))
          await this.$store.dispatch('reports/resetFormPasien')
          if (this.roles[0] === rolesPerm.FASKES) {
            await this.$router.push('/laporan/verification')
          } else {
            await this.$router.push('/laporan/list')
          }
        } else {
          await this.$store.dispatch('toast/errorToast', response.message)
        }
      } catch (error) {
        await this.$store.dispatch('toast/errorToast', this.$t('errors.data_failed_to_save'))
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style scoped>
.disclaimer {
  background: linear-gradient(78.54deg, #27AE60 0%, #6FCF97 100%) !important;
}
</style>

