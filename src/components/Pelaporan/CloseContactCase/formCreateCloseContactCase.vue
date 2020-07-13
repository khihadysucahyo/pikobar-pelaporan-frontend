<template>
  <div>
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
                    :form-body.sync="formBody"
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
                    :form-body.sync="formBody"
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
                    :form-body.sync="formBody"
                  />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
        <v-row>
          <v-col auto>
            <v-expansion-panels
              v-model="exposureInformation"
              multiple
            >
              <v-expansion-panel>
                <v-expansion-panel-header class="font-weight-bold text-lg">
                  {{ $t('label.exposure_information') }}
                </v-expansion-panel-header>
                <v-divider />
                <v-expansion-panel-content>
                  <form-exposure-information
                    :form-body.sync="formBody"
                  />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
        <v-row v-if="formBody.contact_type === 0 || formBody.contact_type === 2">
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
                    :form-body.sync="formBody"
                  />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
        <v-row v-if="formBody.contact_type === 1">
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
                    :form-body.sync="formBody"
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
                    :form-body.sync="formBody"
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
                    :form-body.sync="formBody"
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
                    :form-body.sync="formBody"
                  />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </ValidationObserver>
    </v-container>
  </div>
</template>
<script>
import { ValidationObserver } from 'vee-validate'

export default {
  name: 'FormCloseContactCase',
  components: {
    ValidationObserver
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    formBody: {
      type: Object,
      default: null
    },
    idCase: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      interviewer: [0],
      closeContactIdentity: [0],
      travelHistory: [0],
      exposureInformation: [0],
      closelyContactHome: [0],
      healthWorker: [0],
      symptom: [0],
      vaccinationHistory: [0],
      supportingInvestigation: [0],
      dialogDecline: false,
      isLoading: false,
      refreshPageList: false
    }
  }
}
</script>
