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
              ID Kasus Primer/Kasus Terkait: COVID-00000002
            </div>
            <div>
              Form laporan di bawah ini mengacu pada lampiran 11 pedoman covid-19 revisi 4
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
                    Petugas Medis/Paramedis/Relawan Kesehatan
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
                    Riwayat Perjalanan
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
                    Kontak Erat Serumah
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
                    Petugas Kesehatan
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
                    Gejala
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
                    Riwayat Vaksinasi
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
                    Pemeriksaan Penunjang
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
                Submit
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
      formBody: {},
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
  .border-card {
    color: #828282;
    border: 1px dashed #E0E0E0 !important;
    box-sizing: border-box !important;
    border-radius: 8px !important;
  }
</style>
