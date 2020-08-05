<template>
  <v-container fluid>
    <v-form ref="form" lazy-validation>
      <v-row align="start" class="mb-2">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.travel_history_label_1') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-radio-group v-model="formPasien.investigation" row>
              <v-radio :label="$t('label.yes')" value="L" />
              <v-radio :label="$t('label.no')" value="P" />
            </v-radio-group>
          </ValidationProvider>
        </v-col>
      </v-row>
      <div v-for="(data, index) in formPasien.travel_history" :key="index">
        <v-container fluid>
          <v-card outlined>
            <v-row align="center" justify="space-between">
              <v-col cols="12" md="6" sm="12">
                <div class="title ml-4">
                  {{ `${$t('label.travel_history')} ${index+1}` }}
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
                <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.trip_type') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <v-radio-group v-model="data.trip_type" row>
                      <v-radio :label="$t('label.from_abroad')" value="L" />
                      <v-radio :label="$t('label.from_outside_city')" value="P" />
                    </v-radio-group>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.country') }}</label>
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
                  <label>{{ $t('label.start_travel') }}</label>
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
                  <label>{{ $t('label.end_travel') }}</label>
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
          <p>{{ $t('label.add_travel_history') }}</p>
        </v-card>
      </v-container>
      <v-row align="start" class="mb-2">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>Dalam 14 hari sebelum sakit, apakah pernah tinggal ke area transmisi lokal ?</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-radio-group v-model="formPasien.investigation" row>
              <v-radio :label="$t('label.yes')" value="L" />
              <v-radio :label="$t('label.no')" value="P" />
            </v-radio-group>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <label>Provinsi</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-select
              v-model="prov"
              :items="specimenType"
              solo
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <label>Kota</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-select
              v-model="city"
              :items="specimenType"
              solo
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start" class="mb-2">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>Dalam 14 hari sebelum sakit, apakah pernah mengunjungi RS/ Pasar/tempat publik lainnya ?</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-radio-group v-model="formPasien.investigation" row>
              <v-radio :label="$t('label.yes')" value="L" />
              <v-radio :label="$t('label.no')" value="P" />
            </v-radio-group>
          </ValidationProvider>
        </v-col>
      </v-row>
      <div v-for="(data, index) in formPasien.history_travel" :key="index">
        <v-container fluid>
          <v-card outlined>
            <v-row align="center" justify="space-between">
              <v-col cols="12" md="6" sm="12">
                <div class="title ml-4">
                  {{ `${$t('label.travel_history_2')} ${index+1}` }}
                </div>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-btn class="ma-2 float-right" tile outlined small color="red" @click="handleDeleteFormTravelHistory(index)">
                  <v-icon left>mdi-delete</v-icon> {{ $t('label.delete') }}
                </v-btn>
              </v-col>
            </v-row>
            <hr class="table-divider">
            <v-container fluid>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.place_category') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <v-select
                      v-model="city"
                      :items="specimenType"
                      solo
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.name_place_visited') }}</label>
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
                  <label>{{ $t('label.address_place_visited') }}</label>
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
                  <label>{{ $t('label.date_time_visit') }}</label>
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
              <v-row align="center">
                <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <label>{{ $t('label.length_visit_duration') }}</label>
                </v-col>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <ValidationProvider>
                    <v-text-field
                      v-model="data.country"
                      class="input-append-btn"
                      type="number"
                      solo-inverted
                    >
                      <template v-slot:append>
                        <v-btn depressed tile min-width="20">
                          {{ $t('label.minutes') }}
                        </v-btn>
                      </template>
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-container>
      </div>
      <v-container fluid>
        <v-card outlined class="text-center" color="#F5F5F5" @click="handleAddFormTravelHistory">
          <v-btn class="ma-2 mt-5" outlined small fab>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <p>{{ $t('label.add_travel_history_2') }}</p>
        </v-card>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { specimenType } from '@/utils/constantVariable'
export default {
  name: 'FormMultipleTravelHistoryFactor',
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
      isAddCloseContactForm: false,
      specimenType: specimenType,
      totalCloseContact: 0,
      idCloseContactForm: 0,
      isValid: false,
      showAlert: false,
      formatDate: 'YYYY/MM/DD',
      prov: '',
      city: ''
    }
  },
  mounted() {
    this.handleAddFormSupportingInvestigation()
  },
  methods: {
    handleAddFormSupportingInvestigation() {
      this.isValid = true
      this.showAlert = false
      this.idCloseContactForm = this.idCloseContactForm + 1
      this.formPasien.travel_history.push({
        id: this.idCloseContactForm,
        investigation: '',
        trip_type: '',
        start_travel_date: '',
        end_travel_date: '',
        country: ''
      })
    },
    handleDeleteFormCloseContact(index) {
      this.formPasien.travel_history.splice(index, 1)
      this.isValid = this.formPasien.travel_history.length !== 0
    },
    handleAddFormTravelHistory() {
      this.isValid = true
      this.showAlert = false
      this.idCloseContactForm = this.idCloseContactForm + 1
      this.formPasien.history_travel.push({
        id: this.idCloseContactForm,
        investigation: '',
        trip_type: '',
        start_travel_date: '',
        end_travel_date: '',
        country: ''
      })
    },
    handleDeleteFormTravelHistory(index) {
      this.formPasien.history_travel.splice(index, 1)
      this.isValid = this.formPasien.history_travel.length !== 0
    }
  }
}
</script>
