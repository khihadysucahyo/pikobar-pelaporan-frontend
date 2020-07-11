<template>
  <v-dialog v-model="show" max-width="70%">
    <v-card>
      <v-card-title class="title">
        {{ $t('label.update_case_history') }}
        <v-spacer />
        <v-icon @click="show = false">mdi-close</v-icon>
      </v-card-title>
      <v-divider />
      <v-container>
        <ValidationObserver ref="observer">
          <v-form
            ref="form"
            lazy-validation
          >
            <v-row>
              <v-col auto>
                <v-expansion-panels
                  v-model="panelRiwayat"
                  multiple
                >
                  <v-expansion-panel>
                    <v-expansion-panel-header class="font-weight-bold text-lg">
                      {{ $t('label.form_case_history_title') }}
                    </v-expansion-panel-header>
                    <v-divider />
                    <v-expansion-panel-content>
                      <v-row align="center">
                        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                          <label class="required">{{ $t('label.criteria') }}</label>
                        </v-col>
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <ValidationProvider v-slot="{ errors }" rules="required">
                            <v-radio-group v-model="formRiwayatPasien.status" :error-messages="errors" row>
                              <v-radio :label="$t('label.OTG')" value="OTG" />
                              <v-radio :label="$t('label.ODP')" value="ODP" />
                              <v-radio :label="$t('label.PDP')" value="PDP" />
                              <v-radio :label="$t('label.positif').toUpperCase()" value="POSITIF" />
                            </v-radio-group>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-row align="center">
                        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                          <label class="required">{{ $t('label.stages') }}</label>
                        </v-col>
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <ValidationProvider v-slot="{ errors }" rules="required">
                            <v-radio-group v-model="formRiwayatPasien.stage" :error-messages="errors" row>
                              <v-radio :label="$t('label.process')" value="0" />
                              <v-radio :label="$t('label.done')" value="1" />
                            </v-radio-group>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-row v-if="formRiwayatPasien.stage === '1'" align="center">
                        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                          <label>{{ $t('label.results') }}</label>
                        </v-col>
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <ValidationProvider v-slot="{ errors }">
                            <v-radio-group v-model="formRiwayatPasien.final_result" :error-messages="errors" row>
                              <v-radio v-if="formRiwayatPasien.status !== 'POSITIF'" :label="$t('label.negatif')" value="0" @click.prevent="uncheck('0')" />
                              <v-radio :label="$t('label.recovery')" value="1" @click.prevent="uncheck('1')" />
                              <v-radio :label="$t('label.dead')" value="2" @click.prevent="uncheck('2')" />
                            </v-radio-group>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-row align="center">
                        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                          <label class="required">{{ $t('label.current_location') }}</label>
                        </v-col>
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <ValidationProvider v-slot="{ errors }" rules="required">
                            <v-radio-group v-model="formRiwayatPasien.current_location_type" :error-messages="errors" row @change="handleChangeLocationNow">
                              <v-radio :label="$t('label.home')" value="RUMAH" />
                              <v-radio :label="$t('label.hospital')" value="RS" />
                              <v-radio :label="$t('label.other_places')" value="others" />
                            </v-radio-group>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-row v-if="formRiwayatPasien.current_location_type === 'RUMAH'" align="center">
                        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <ValidationProvider v-slot="{ errors }" rules="required">
                            <v-radio-group v-model="formRiwayatPasien.according_address" :error-messages="errors" row @change="handleChangeAccordingAddress">
                              <v-radio :label="$t('label.according_address')" value="1" />
                              <v-radio :label="$t('label.doesnt_according_address')" value="0" />
                            </v-radio-group>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-row v-if="formRiwayatPasien.current_location_type === 'RUMAH'" align="center">
                        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                          <label class="grey--text font-italic">({{ $t('label.house_address') }})</label>
                        </v-col>
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <address-region :district-code="formRiwayatPasien.current_location_district_code" :code-district.sync="formRiwayatPasien.current_location_district_code" :sub-district-code="formRiwayatPasien.current_location_subdistrict_code" :code-sub-district.sync="formRiwayatPasien.current_location_subdistrict_code" :village-code="formRiwayatPasien.current_location_village_code" :village-name="formRiwayatPasien.current_location_village_name" :code-village.sync="formRiwayatPasien.current_location_village_code" :name-village.sync="formRiwayatPasien.current_location_village_name" :disabled-address="false" :required-address="true" />
                        </v-col>
                      </v-row>
                      <v-row v-if="formRiwayatPasien.current_location_type === 'RUMAH'" align="center">
                        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                          <label class="grey--text font-italic">({{ $t('label.complete_house_address') }})</label>
                        </v-col>
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <ValidationProvider v-slot="{ errors }" rules="required">
                            <v-text-field v-model="formRiwayatPasien.current_location_address" :error-messages="errors" solo-inverted />
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-row v-if="formRiwayatPasien.current_location_type === 'RS'" align="center">
                        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                          <label class="grey--text font-italic">({{ $t('label.location_hospital') }})</label>
                        </v-col>
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <ValidationProvider v-slot="{ errors }" rules="required">
                            <v-autocomplete
                              v-model="formRiwayatPasien.current_location_address"
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
                              @change="onSelectHospital"
                            />
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-row v-if="formRiwayatPasien.current_location_type === 'others'" align="center">
                        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                          <label class="grey--text font-italic">({{ $t('label.other_places') }})</label>
                        </v-col>
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <ValidationProvider v-if="formRiwayatPasien.current_location_type === 'others'" v-slot="{ errors }" rules="required">
                            <v-autocomplete
                              v-model="formRiwayatPasien.current_location_address"
                              :items="hospitalNonWestJavaList"
                              :error-messages="errors"
                              :return-object="true"
                              :label="$t('label.others')"
                              menu-props="auto"
                              item-text="name"
                              item-value="name"
                              single-line
                              solo
                              autocomplete
                              @change="onSelectHospital"
                            />
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-row align="start">
                        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                          <label :class="formRiwayatPasien.status !== 'OTG' ? 'required' : ''">{{ $t('label.date_symptoms') }}</label>
                        </v-col>
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <select-datetime :datetime="formRiwayatPasien.first_symptom_date" :date-time.sync="formRiwayatPasien.first_symptom_date" :formate-date="formatDate" />
                        </v-col>
                      </v-row>
                      <v-row align="start">
                        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                          <label :class="formRiwayatPasien.status !== 'OTG' ? 'required' : ''">{{ $t('label.symptoms') }}</label>
                        </v-col>
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <ValidationProvider v-slot="{ errors }" :rules="formRiwayatPasien.status !== 'OTG' ? 'required' : ''">
                            <v-row>
                              <v-col v-for="item in symptomOptions" :key="item" cols="6" sm="6" md="4">
                                <label class="material-checkbox-custom">
                                  <input v-model="formRiwayatPasien.diagnosis" :value="item" type="checkbox">
                                  <span v-if="errors.length" class="error--text">{{ item }}</span>
                                  <span v-else>{{ item }}</span>
                                </label>
                                <span v-if="errors.length" class="v-messages error--text">{{ errors[0] }}</span>
                              </v-col>
                            </v-row>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-row align="start" class="mt-4">
                        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <ValidationProvider>
                            <v-text-field v-model="formRiwayatPasien.diagnosis_other" :placeholder="$t('label.mention_other_symptoms')" solo-inverted />
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-row align="start">
                        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                          <label>{{ $t('label.additional_condition') }}</label>
                        </v-col>
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <ValidationProvider v-slot="{ errors }">
                            <v-row>
                              <v-col v-for="item in additionalConditionOptions" :key="item" cols="6" sm="6" md="4">
                                <label class="material-checkbox-custom">
                                  <input v-model="formRiwayatPasien.diseases" :value="item" type="checkbox">
                                  <span v-if="errors.length" class="error--text">{{ item }}</span>
                                  <span v-else>{{ item }}</span>
                                </label>
                                <span v-if="errors.length" class="v-messages error--text">{{ errors[0] }}</span>
                              </v-col>
                            </v-row>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-row align="start" class="mt-4">
                        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <ValidationProvider>
                            <v-text-field v-model="formRiwayatPasien.diseases_other" :placeholder="$t('label.mention_other_additional_condition')" solo-inverted />
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-row align="center">
                        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                          <label>{{ $t('label.diagnosis_ards') }}</label>
                        </v-col>
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <ValidationProvider>
                            <v-container>
                              <v-row>
                                <v-radio-group v-model="formRiwayatPasien.diagnosis_ards" row>
                                  <span v-for="(item, index) in answerList" :key="index">
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
                          <label>{{ $t('label.diagnosis_covid') }}</label>
                        </v-col>
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <ValidationProvider>
                            <v-container>
                              <v-row>
                                <v-radio-group v-model="formRiwayatPasien.diagnosis_covid" row>
                                  <span v-for="(item, index) in answerList" :key="index">
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
                          <label>{{ $t('label.diagnosis_pneumonia') }}</label>
                        </v-col>
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <ValidationProvider>
                            <v-container>
                              <v-row>
                                <v-radio-group v-model="formRiwayatPasien.diagnosis_pneumonia" row>
                                  <span v-for="(item, index) in answerList" :key="index">
                                    <v-radio :label="item.text" :value="item.value" />
                                  </span>
                                </v-radio-group>
                              </v-row>
                            </v-container>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-row align="start" class="mt-4">
                        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <ValidationProvider>
                            <v-text-field v-model="formRiwayatPasien.other_diagnosis" :placeholder="$t('label.mention_other_additional_condition')" solo-inverted />
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                      <v-row align="center">
                        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                          <label>{{ $t('label.serum_check') }}</label>
                        </v-col>
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <ValidationProvider>
                            <v-container>
                              <v-row>
                                <v-radio-group v-model="formRiwayatPasien.serum_check" row>
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
                          <label>{{ $t('label.sputum_check') }}</label>
                        </v-col>
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <ValidationProvider>
                            <v-container>
                              <v-row>
                                <v-radio-group v-model="formRiwayatPasien.sputum_check" row>
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
                          <label>{{ $t('label.swab_check') }}</label>
                        </v-col>
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <ValidationProvider>
                            <v-container>
                              <v-row>
                                <v-radio-group v-model="formRiwayatPasien.swab_check" row>
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
                          <label>{{ $t('label.physical_check') }}</label>
                        </v-col>
                        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                          <v-row align="center" class="ma-0">
                            <v-col cols="12" sm="4" class="pa-1">
                              <ValidationProvider>
                                <v-text-field v-model="formRiwayatPasien.physical_check_temperature" type="number" class="input-append-btn" solo-inverted :placeholder="$t('label.temperature')">
                                  <template v-slot:append>
                                    <v-btn depressed tile min-width="20">
                                      &#778;C
                                    </v-btn>
                                  </template>
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" sm="4" class="pa-1">
                              <ValidationProvider>
                                <v-text-field v-model="formRiwayatPasien.physical_check_blood_pressure" type="number" class="input-append-btn" solo-inverted :placeholder="$t('label.blood_pressure')">
                                  <template v-slot:append>
                                    <v-btn depressed tile min-width="20">
                                      mmHg
                                    </v-btn>
                                  </template>
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" sm="4" class="pa-1">
                              <ValidationProvider>
                                <v-text-field v-model="formRiwayatPasien.physical_check_pulse" type="number" class="input-append-btn" solo-inverted :placeholder="$t('label.pulse')">
                                  <template v-slot:append>
                                    <v-btn depressed tile min-width="20">
                                      {{ $t('label.x_minute') }}
                                    </v-btn>
                                  </template>
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                          <v-row align="center" class="ma-0">
                            <v-col cols="12" sm="4" class="pa-1">
                              <ValidationProvider>
                                <v-text-field v-model="formRiwayatPasien.physical_check_respiration" type="number" class="input-append-btn" solo-inverted :placeholder="$t('label.respiration')">
                                  <template v-slot:append>
                                    <v-btn depressed tile min-width="20">
                                      {{ $t('label.x_minute') }}
                                    </v-btn>
                                  </template>
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" sm="4" class="pa-1">
                              <ValidationProvider>
                                <v-text-field v-model="formRiwayatPasien.physical_check_height" type="text" class="input-append-btn" solo-inverted :placeholder="$t('label.height')">
                                  <template v-slot:append>
                                    <v-btn depressed tile min-width="20">
                                      Cm
                                    </v-btn>
                                  </template>
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                            <v-col cols="12" sm="4" class="pa-1">
                              <ValidationProvider>
                                <v-text-field v-model="formRiwayatPasien.physical_check_weight" type="text" class="input-append-btn" solo-inverted :placeholder="$t('label.weight')">
                                  <template v-slot:append>
                                    <v-btn depressed tile min-width="20">
                                      Kg
                                    </v-btn>
                                  </template>
                                </v-text-field>
                              </ValidationProvider>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
            <v-container fluid>
              <v-row>
                <v-col>
                  <v-btn
                    :loading="loading"
                    bottom
                    block
                    @click="handleCancel"
                  >
                    {{ $t('label.cancel') }}
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    :loading="loading"
                    class="ml-2"
                    color="success"
                    bottom
                    block
                    @click="handleSaveHistory"
                  >
                    {{ $t('label.update_history') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </ValidationObserver>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { symptomOptions, additionalConditionOptions, answerList, yesOrNoAnswer } from '@/utils/constantVariable'
import { mapGetters } from 'vuex'
import EventBus from '@/utils/eventBus'

export default {
  name: 'DialogUpdateHistoryCase',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    formRiwayatPasien: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      show: this.showDialog,
      hospitalWestJavaList: [],
      hospitalNonWestJavaList: [],
      formatDate: 'YYYY/MM/DD',
      panelRiwayat: [0],
      panelListRiwayat: [0],
      disabledReportResource: false,
      arrayRegion: null,
      symptomOptions,
      additionalConditionOptions,
      answerList,
      yesOrNoAnswer
    }
  },
  computed: {
    ...mapGetters('region', [
      'hospitalList'
    ]),
    ...mapGetters('user', [
      'roles',
      'fullName'
    ])
  },
  watch: {
    showDialog(value) {
      this.show = value
    },
    show(value) {
      this.$emit('update:show', value)
    }
  },
  async mounted() {
    const paramHospitalWestJava = { 'rs_jabar': true }
    const paramHospitalNonWestJava = { 'rs_jabar': false }
    const responseWestJava = await this.$store.dispatch('region/getListHospital', paramHospitalWestJava)
    this.hospitalWestJavaList = responseWestJava.data
    const responseNonWestJava = await this.$store.dispatch('region/getListHospital', paramHospitalNonWestJava)
    this.hospitalNonWestJavaList = responseNonWestJava.data
    if (this.roles[0] === 'faskes') {
      this.formRiwayatPasien.report_source = this.fullName
      this.disabledReportResource = true
    }
  },
  methods: {
    async handleSaveHistory() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      this.loading = true
      if (this.formRiwayatPasien.stage === '0') {
        this.formRiwayatPasien.final_result = ''
      }
      await this.$store.dispatch('reports/createHistoryCase', this.formRiwayatPasien)
      await this.$store.dispatch('toast/successToast', 'Data Riwayat Kasus Berhasil Di Perbaharui')
      await this.$store.dispatch('reports/resetRiwayatFormPasien')
      this.loading = false
      this.$emit('update:show', false)
      EventBus.$emit('refreshPageListReport', true)
    },
    handleCancel() {
      this.$emit('update:show', false)
    },
    onSelectHospital(value) {
      this.formRiwayatPasien.current_hospital_id = value._id
      this.formRiwayatPasien.current_location_address = value.name
    },
    uncheck(value) {
      if (value === this.formRiwayatPasien.final_result) {
        this.formRiwayatPasien.final_result = ''
      } else {
        this.formRiwayatPasien.final_result = value
      }
    },
    handleChangeLocationNow(value) {
      if (value === 'RUMAH') {
        this.formRiwayatPasien.current_location_address = ''
      } else {
        this.formRiwayatPasien.current_hospital_id = ''
        this.formRiwayatPasien.current_location_address = ''
        this.formRiwayatPasien.current_location_district_code = ''
        this.formRiwayatPasien.current_location_subdistrict_code = ''
        this.formRiwayatPasien.current_location_village_code = ''
      }
    },
    handleChangeAccordingAddress(value) {
      if (value === '1') {
        this.formPasien.current_location_district_code = this.formPasien.address_district_code
        this.formPasien.current_location_subdistrict_code = this.formPasien.address_subdistrict_code
        this.formPasien.current_location_village_code = this.formPasien.address_village_code
        this.formPasien.current_location_village_name = this.formPasien.address_village_name
        this.formPasien.current_location_address = this.formPasien.address_street
      } else {
        this.formPasien.current_location_district_code = ''
        this.formPasien.current_location_subdistrict_code = ''
        this.formPasien.current_location_village_code = ''
        this.formPasien.current_location_village_name = ''
        this.formPasien.current_location_address = ''
      }
    }
  }
}
</script>
