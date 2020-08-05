<template>
  <v-container fluid>
    <v-form ref="form" lazy-validation>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.primary_contact_label_1') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-radio-group v-model="formPasien.travel" row>
              <v-radio :label="$t('label.yes')" :value="1" />
              <v-radio :label="$t('label.no')" :value="0" />
            </v-radio-group>
          </ValidationProvider>
        </v-col>
      </v-row>
      <div v-for="(data, index) in formPasien.primary_contact" :key="index">
        <v-container fluid>
          <v-card outlined>
            <v-row align="center" justify="space-between">
              <v-col cols="12" md="6" sm="12">
                <div class="title ml-4">
                  {{ `${$t('label.primary_contact')} ${index+1}` }}
                </div>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-btn class="ma-2 float-right" tile outlined small color="red" @click="handleDeleteFormCloseContact(index)">
                  <v-icon left>mdi-delete</v-icon> {{ $t('label.delete') }}
                </v-btn>
              </v-col>
            </v-row>
            <hr class="table-divider">
            <v-container fluid>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.contact_name') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <v-text-field
                      v-model="data.country"
                      :label="$t('label.enter_place')"
                      solo-inverted
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.contact_criteria') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <v-radio-group v-model="data.trip_type" row>
                      <v-radio :label="'Suspek'" value="A" />
                      <v-radio :label="'Probabel'" value="B" />
                      <v-radio :label="'Konfirmasi'" value="C" />
                    </v-radio-group>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.address') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <v-text-field
                      v-model="data.country"
                      :label="$t('label.enter_place')"
                      solo-inverted
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.relationship') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <v-autocomplete
                      :no-data-text="$t('label.data_not_found')"
                      :placeholder="$t('label.no_data_autocomplete_patient')"
                      :search-input.sync="searchPatientCloseContact"
                      :items="patientCloseContactList"
                      :return-object="true"
                      item-value="id_case"
                      item-text="name"
                      menu-props="auto"
                      single-line
                      solo
                      autocomplete
                      clearable
                      @change="onSelectCloseContact"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.first_contact_date') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <input-date-picker
                      :format-date="formatDate"
                      :date-value="data.start_travel_date"
                      :value-date.sync="data.start_travel_date"
                      :label="$t('label.choose_date')"
                      @changeDate="data.start_travel_date = $event"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.last_contact_date') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <input-date-picker
                      :format-date="formatDate"
                      :date-value="data.end_travel_date"
                      :value-date.sync="data.end_travel_date"
                      :label="$t('label.choose_date')"
                      @changeDate="data.end_travel_date = $event"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-container>
      </div>
      <v-container fluid>
        <v-card outlined class="text-center" color="#F5F5F5" @click="handleAddFormSupportingInvestigation">
          <v-btn class="ma-2 mt-5" outlined small fab>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <p>{{ $t('label.add_other_primary_contact') }}</p>
        </v-card>
      </v-container>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.primary_contact_label_2') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-container>
              <v-row>
                <v-radio-group v-model="formPasien.close_contact_confirm" row>
                  <span v-for="(item, index) in yesOrNoAnswer" :key="index">
                    <v-radio :label="item.text" :value="item.value" />
                  </span>
                </v-radio-group>
              </v-row>
            </v-container>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.primary_contact_label_3') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-container>
              <v-row>
                <v-radio-group v-model="formPasien.close_contact_animal_market" row>
                  <span v-for="(item, index) in yesOrNoAnswer" :key="index">
                    <v-radio :label="item.text" :value="item.value" />
                  </span>
                </v-radio-group>
              </v-row>
            </v-container>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-text-field
              v-model="formPasien.country"
              :label="$t('label.mention_animals_that_kept')"
              solo-inverted
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.primary_contact_label_4') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-container>
              <v-row>
                <v-radio-group v-model="formPasien.close_contact_animal_market" row>
                  <span v-for="(item, index) in yesOrNoAnswer" :key="index">
                    <v-radio :label="item.text" :value="item.value" />
                  </span>
                </v-radio-group>
              </v-row>
            </v-container>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.protective_equipment_used') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }">
            <v-row>
              <v-col v-for="item in apdList" :key="item" cols="6" sm="6" md="4">
                <label class="material-checkbox-custom">
                  <input v-model="formPasien.apd_use" :value="item" type="checkbox">
                  <span v-if="errors.length" class="error--text">{{ item }}</span>
                  <span v-else>{{ item }}</span>
                </label>
                <span v-if="errors.length" class="v-messages error--text">{{ errors[0] }}</span>
              </v-col>
            </v-row>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.primary_contact_label_5') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-container>
              <v-row>
                <v-radio-group v-model="formPasien.close_contact_animal_market" row>
                  <span v-for="(item, index) in yesOrNoAnswer" :key="index">
                    <v-radio :label="item.text" :value="item.value" />
                  </span>
                </v-radio-group>
              </v-row>
            </v-container>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-text-field
              v-model="formPasien.country"
              :label="$t('label.mention_it')"
              solo-inverted
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <br>
    </v-form>
  </v-container>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
import { answerList, yesOrNoAnswer, healthWorkerList, apd } from '@/utils/constantVariable'

export default {
  name: 'FormMultipleContactFactor',
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
      apdList: apd,
      formatDate: 'YYYY/MM/DD',
      totalCloseContact: 0,
      idCloseContactForm: 0,
      isValid: false,
      showAlert: false,
      answerList: answerList,
      yesOrNoAnswer: yesOrNoAnswer,
      patientCloseContactList: [],
      patientCloseContactConfirmList: [],
      searchPatientCloseContact: null,
      searchPatientCloseContactConfirm: null,
      listQuery: {
        name_case_related: null,
        status: null
      },
      healthWorkerList: healthWorkerList
    }
  },
  watch: {
    async searchPatientCloseContact(value) {
      if (value) {
        this.listQuery.name_case_related = value
        const response = await this.$store.dispatch('reports/casesList', this.listQuery)
        this.patientCloseContactList = response.data
      } else {
        this.patientCloseContactList = []
      }
    },
    async searchPatientCloseContactConfirm(value) {
      if (value) {
        this.listQuery.name_case_related = value
        const response = await this.$store.dispatch('reports/casesList', this.listQuery)
        this.patientCloseContactConfirmList = response.data
      }
    }
  },
  methods: {
    handleAddFormSupportingInvestigation() {
      this.isValid = true
      this.showAlert = false
      this.idCloseContactForm = this.idCloseContactForm + 1
      this.formPasien.primary_contact.push({
        id: this.idCloseContactForm,
        investigation: '',
        trip_type: '',
        start_travel_date: '',
        end_travel_date: '',
        country: ''
      })
    },
    handleDeleteFormCloseContact(index) {
      this.formPasien.primary_contact.splice(index, 1)
      this.isValid = this.formPasien.primary_contact.length !== 0
    },
    handleChangeStartTravel(value) {
      this.formPasien.start_travel = value
    },
    handleChangeEndTravel(value) {
      this.formPasien.end_travel = value
    },
    handleChangeVisitAnimalMarketDate(value) {
      this.formPasien.animal_market_date = value
    },
    handleChangeVisitPublicPlaceDate(value) {
      this.formPasien.public_place_date = value
    },
    handleChangeVisitMedicalFacilityDate(value) {
      this.formPasien.medical_facility_date = value
    },
    onSelectCloseContact(value) {
      if (value) {
        this.formPasien.name_close_contact = value.name
        this.formPasien.id_close_contact = value.id_case
      }
    },
    onSelectCloseContactConfirm(value) {
      if (value) {
        this.formPasien.name_close_contact_confirm = value.name
        this.formPasien.id_close_contact_confirm = value.id_case
      }
    },
    onSelectHealthWorker(value) {
      this.formPasien.health_workers = value
    }
  }
}
</script>

