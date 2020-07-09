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
      <v-form ref="form" lazy-validation>
        <form-volunteer :form-pasien="formPasien" />
        <form-patient :form-pasien="formPasien" />
        <form-case-history :form-pasien="formPasien" />
        <form-socioeconomic-history :form-pasien="formPasien" />
        <form-contact-factor :form-pasien="formPasien" />
        <form-close-contact :form-pasien="formPasien" />
      </v-form>
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
      nikAuthor: null
    }
  },
  computed: {
    ...mapGetters('reports', [
      'formPasien'
    ])
  },
  methods: {
    async saveData() {
      const valid = await this.$refs.observer.validate()
      if (!valid) return
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
      try {
        await this.$store.dispatch('reports/createRevampReportCase', this.formPasien)
        await this.$store.dispatch('toast/successToast', this.$t('success.create_date_success'))
        await this.$refs.form.reset()
        this.$router.push('/laporan/list')
      } catch (error) {
        await this.$store.dispatch('toast/errorToast', 'Data gagal disimpan')
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

