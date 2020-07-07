<template>
  <v-dialog v-model="show" max-width="80%">
    <v-card>
      <v-card-title>
        {{ titleDetail }}
        <v-spacer />
        <v-icon @click="show = false">mdi-close</v-icon>
      </v-card-title>
      <div>
        <v-card
          class="warning-background ma-4"
          outlined
          color="#6FCF97"
          min-height="90px"
        >
          <div
            class="ml-10 mt-6"
            style="color: #FFFFFF;"
          >
            <div class="font-weight-bold">
              {{ $t('label.primary_case_id_related_case') }}: COVID-00000002
            </div>
            <div>
              {{ $t('label.redaction_create_related_case') }}
            </div>
          </div>
        </v-card>
      </div>
      <v-container>
        <ValidationObserver ref="observer">
          <v-row>
            <v-col auto>
              <v-expansion-panels
                v-model="interviewer"
                multiple
              >
                <v-expansion-panel>
                  <v-expansion-panel-header class="font-weight-bold text-lg">
                    {{ $t('label.medical_officer_paramedic_health_volunteer') }}
                  </v-expansion-panel-header>
                  <v-divider />
                  <v-expansion-panel-content>
                    <form-interviewer
                      :form-body="formBody"
                    />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
          <v-row>
            <v-col auto>
              <v-expansion-panels
                v-model="closeContactIdentity"
                multiple
              >
                <v-expansion-panel>
                  <v-expansion-panel-header class="font-weight-bold text-lg">
                    {{ $t('label.close_contact_identity') }}
                  </v-expansion-panel-header>
                  <v-divider />
                  <v-expansion-panel-content>
                    <information-form-close-contact
                      :form-body="formBody"
                    />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
          <v-row>
            <v-col auto>
              <v-expansion-panels
                v-model="travelHistory"
                multiple
              >
                <v-expansion-panel>
                  <v-expansion-panel-header class="font-weight-bold text-lg">
                    {{ $t('label.travel_history') }}
                  </v-expansion-panel-header>
                  <v-divider />
                  <v-expansion-panel-content>
                    <form-travel-history
                      :form-body="formBody"
                    />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
          <v-row>
            <v-col auto>
              <v-expansion-panels
                v-model="closelyContactHome"
                multiple
              >
                <v-expansion-panel>
                  <v-expansion-panel-header class="font-weight-bold text-lg">
                    {{ $t('label.closely_contact_home') }}
                  </v-expansion-panel-header>
                  <v-divider />
                  <v-expansion-panel-content>
                    <form-closely-contact-home
                      :form-body="formBody"
                    />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
          <v-row>
            <v-col auto>
              <v-expansion-panels
                v-model="healthWorker"
                multiple
              >
                <v-expansion-panel>
                  <v-expansion-panel-header class="font-weight-bold text-lg">
                    {{ $t('label.health_workers') }}
                  </v-expansion-panel-header>
                  <v-divider />
                  <v-expansion-panel-content>
                    <form-health-worker
                      :form-body="formBody"
                    />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
          <v-row>
            <v-col auto>
              <v-expansion-panels
                v-model="symptom"
                multiple
              >
                <v-expansion-panel>
                  <v-expansion-panel-header class="font-weight-bold text-lg">
                    {{ $t('label.symptoms') }}
                  </v-expansion-panel-header>
                  <v-divider />
                  <v-expansion-panel-content>
                    <form-symptom
                      :form-body="formBody"
                    />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
          <v-row>
            <v-col auto>
              <v-expansion-panels
                v-model="vaccinationHistory"
                multiple
              >
                <v-expansion-panel>
                  <v-expansion-panel-header class="font-weight-bold text-lg">
                    {{ $t('label.vaccination_history') }}
                  </v-expansion-panel-header>
                  <v-divider />
                  <v-expansion-panel-content>
                    <form-vaccination-history
                      :form-body="formBody"
                    />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
          <v-row>
            <v-col auto>
              <v-expansion-panels
                v-model="supportingInvestigation"
                multiple
              >
                <v-expansion-panel>
                  <v-expansion-panel-header class="font-weight-bold text-lg">
                    {{ $t('label.supporting_investigation') }}
                  </v-expansion-panel-header>
                  <v-divider />
                  <v-expansion-panel-content>
                    <form-supporting-investigation
                      :form-body="formBody"
                    />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
          <v-row class="mb-3">
            <v-col>
              <v-btn
                color="#FFFFFF"
                block
                @click="show = false"
              >
                {{ $t('label.back') }}
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                color="primary"
                block
                @click="show = false"
              >
                {{ $t('label.save') }}
              </v-btn>
            </v-col>
          </v-row>
        </ValidationObserver>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
export default {
  name: 'DialogCreateCloseContact',
  components: {
    ValidationObserver
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    titleDetail: {
      type: String,
      default: ''
    },
    formBody: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      show: this.showDialog,
      interviewer: [0],
      closeContactIdentity: [0],
      travelHistory: [0],
      closelyContactHome: [0],
      healthWorker: [0],
      symptom: [0],
      vaccinationHistory: [0],
      supportingInvestigation: [0],
      dialogDecline: false,
      refreshPageList: false
    }
  },
  watch: {
    showDialog(value) {
      this.show = value
    },
    show(value) {
      this.$emit('update:show', value)
    }
  },
  methods: {
    //
  }
}
</script>
<style scoped>
  .warning-background {
    background-image: url('../../../static/warning_green_icon.svg')
  }
</style>
