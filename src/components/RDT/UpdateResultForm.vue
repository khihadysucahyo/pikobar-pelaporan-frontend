<template>
  <div class="rdt-result-update">
    <v-card
      style="margin-top: 2rem;"
      outlined
    >
      <v-container>
        <v-row>
          <v-col
            cols="12"
            style="padding: 2rem;"
          >
            <ValidationObserver ref="observer">
              <v-form
                ref="form"
                lazy-validation
              >
                <ValidationProvider>
                  <v-label>{{ $t('label.test_result') }}</v-label>
                  <v-radio-group
                    v-model="formRapid.final_result"
                    row
                  >
                    <v-radio
                      :label="$t('label.negatif')"
                      value="NEGATIF"
                    />
                    <v-radio
                      :label="$t('label.positif')"
                      value="POSITIF"
                    />
                    <v-radio
                      :label="$t('label.inkonklusif')"
                      value="INKONKLUSIF"
                    />
                    <v-radio
                      :label="$t('label.reaktif')"
                      value="REAKTIF"
                    />
                    <v-radio
                      :label="$t('label.non_reaktif')"
                      value="NON REAKTIF"
                    />
                    <v-radio
                      :label="$t('label.invalid')"
                      value="INVALID"
                    />
                  </v-radio-group>
                </ValidationProvider>
              </v-form>
            </ValidationObserver>
          </v-col>
        </v-row>
        <v-container fluid>
          <v-row class="survey-bottom-form">
            <v-col>
              <v-btn
                color="success"
                bottom
                style="float: right;"
                @click="handleSave"
              >
                {{ $t('label.save') }}
              </v-btn>
              <v-btn
                :loading="loading"
                color="grey"
                bottom
                outlined
                style="float: right;margin-right: 12px;"
                @click="handleBack"
              >
                {{ $t('label.back') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'UpdateResultForm',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    idResult: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      formatDate: 'YYYY-MM-DD',
      formRapid: {
        final_result: null
      }
    }
  },
  async mounted() {
    const response = await this.$store.dispatch('rdt/detailParticipant', this.idResult)
    Object.assign(this.formRapid, response.data)
  },
  methods: {
    handleBack() {
      this.$router.push('/rdt/list')
    },
    async handleSave() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      this.loading = true
      const updateFinalRDT = {
        id: this.idResult,
        data: this.formRapid
      }

      this.$store.dispatch('rdt/updateRDT', updateFinalRDT)
      this.loading = false
      this.$router.push('/rdt/list')
    }
  }
}
</script>
