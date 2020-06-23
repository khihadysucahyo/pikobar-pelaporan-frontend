<template>
  <v-dialog v-model="show" max-width="70%">
    <v-card>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"
            sm="12"
          >
            <div class="ml-2">
              {{ $t('label.update_case_history') }}
            </div>
          </v-col>
        </v-row>
        <ValidationObserver ref="observer">
          <v-form
            ref="form"
            lazy-validation
          >
            <v-row>
              <v-col
                cols="12"
                md="3"
                sm="12"
                class="mt-4"
              >
                <label class="required">{{ $t('label.criteria') }}</label>
              </v-col>
              <v-col
                cols="12"
                md="9"
                sm="12"
                :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                >
                  <v-radio-group
                    v-model="formRiwayatPasien.status"
                    :error-messages="errors"
                    row
                  >
                    <v-radio
                      :label="$t('label.OTG')"
                      value="OTG"
                    />
                    <v-radio
                      :label="$t('label.ODP')"
                      value="ODP"
                    />
                    <v-radio
                      :label="$t('label.PDP')"
                      value="PDP"
                    />
                    <v-radio
                      :label="$t('label.positif').toUpperCase()"
                      value="POSITIF"
                    />
                  </v-radio-group>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="3"
                sm="12"
                class="mt-4"
                justify="center"
              >
                <label class="required">{{ $t('label.current_location') }}</label>
              </v-col>
              <v-col
                cols="12"
                md="9"
                sm="12"
                :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                >
                  <v-radio-group
                    v-model="formRiwayatPasien.current_location_type"
                    :error-messages="errors"
                    row
                    @change="handleChangeLocationNow"
                  >
                    <v-radio
                      :label="$t('label.home')"
                      value="RUMAH"
                    />
                    <v-radio
                      :label="$t('label.hospital')"
                      value="RS"
                    />
                  </v-radio-group>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row
              v-if="formRiwayatPasien.current_location_type === 'RUMAH'"
            >
              <v-col
                cols="12"
                md="3"
                sm="12"
                class="mt-4"
                justify="center"
              />
              <v-col
                cols="12"
                md="9"
                sm="12"
                :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
              >
                <address-region
                  :district-code="formRiwayatPasien.current_location_district_code"
                  :code-district.sync="formRiwayatPasien.current_location_district_code"
                  :sub-district-code="formRiwayatPasien.current_location_subdistrict_code"
                  :code-sub-district.sync="formRiwayatPasien.current_location_subdistrict_code"
                  :village-code="formRiwayatPasien.current_location_village_code"
                  :code-village.sync="formRiwayatPasien.current_location_village_code"
                  :disabled-address="false"
                  :required-address="true"
                />
              </v-col>
            </v-row>
            <v-row
              v-if="formRiwayatPasien.current_location_type === 'RUMAH'"
            >
              <v-col
                cols="12"
                md="3"
                sm="12"
                class="mt-4"
                justify="center"
              />
              <v-col
                cols="12"
                md="9"
                sm="12"
                :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                >
                  <v-label>{{ $t('label.address_complete_this_time') }}</v-label>
                  <v-text-field
                    v-model="formRiwayatPasien.current_location_address"
                    :error-messages="errors"
                    solo-inverted
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row
              v-if="formRiwayatPasien.current_location_type === 'RS'"
            >
              <v-col
                cols="12"
                md="3"
                sm="12"
                class="mt-4"
                justify="center"
              />
              <v-col
                cols="12"
                md="9"
                sm="12"
                :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                >
                  <v-autocomplete
                    v-model="formRiwayatPasien.current_location_address"
                    :items="hospitalList"
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
            <v-row>
              <v-col
                cols="12"
                md="3"
                sm="12"
                class="mt-4"
              >
                <v-label>{{ $t('label.reporting_sources') }}</v-label>
              </v-col>
              <v-col
                cols="12"
                md="9"
                sm="12"
                :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                >
                  <v-text-field
                    v-model="formRiwayatPasien.report_source"
                    :error-messages="errors"
                    solo-inverted
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="3"
                sm="12"
                class="mt-4"
              >
                <label>{{ $t('label.additional_condition') }}</label>
              </v-col>
              <v-col
                cols="12"
                md="9"
                sm="12"
                :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
              >
                <ValidationProvider v-slot="{ errors }">
                  <v-row>
                    <v-col v-for="item in additionalConditionOptions" :key="item" sm="4" md="4">
                      <label class="material-checkbox-custom">
                        <input
                          v-model="formRiwayatPasien.diseases"
                          :value="item"
                          type="checkbox"
                        >
                        <span v-if="errors.length" class="error--text">{{ item }}</span>
                        <span v-else>{{ item }}</span>
                      </label>
                      <span
                        v-if="errors.length"
                        class="v-messages error--text"
                      >{{ errors[0] }}</span>
                    </v-col>
                  </v-row>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="3"
                sm="12"
                class="mt-4"
                justify="center"
              />
              <v-col
                cols="12"
                md="9"
                sm="12"
                :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
              >
                <ValidationProvider>
                  <v-text-field
                    v-model="formRiwayatPasien.diseases_other"
                    :placeholder="$t('label.mention_other_additional_condition')"
                    solo-inverted
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="3"
                sm="12"
              >
                <v-label>{{ $t('label.postscript') }}</v-label>
              </v-col>
              <v-col
                cols="12"
                md="9"
                sm="12"
                :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
              >
                <ValidationProvider>
                  <v-textarea
                    v-model="formRiwayatPasien.other_notes"
                    solo
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="3"
                sm="12"
                class="mt-4"
              >
                <v-label>{{ $t('label.history') }}</v-label>
              </v-col>
              <v-col
                cols="12"
                md="9"
                sm="12"
                :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
              >
                <ValidationProvider>
                  <v-checkbox
                    v-model="formRiwayatPasien.is_went_abroad"
                    :label="$t('label.from_abroad')"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row
              v-if="formRiwayatPasien.is_went_abroad === true"
            >
              <v-col
                cols="12"
                md="3"
                sm="12"
                class="mt-4"
              />
              <v-col
                cols="12"
                md="9"
                sm="12"
                :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                >
                  <v-text-field
                    v-model="formRiwayatPasien.visited_country"
                    :error-messages="errors"
                    :placeholder="$t('label.country_visited')"
                    solo-inverted
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="3"
                sm="12"
                class="mt-4"
              />
              <v-col
                cols="12"
                md="9"
                sm="12"
                :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
              >
                <ValidationProvider>
                  <v-checkbox
                    v-model="formRiwayatPasien.is_went_other_city"
                    :label="$t('label.trip_outside_the_city')"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row
              v-if="formRiwayatPasien.is_went_other_city === true"
            >
              <v-col
                cols="12"
                md="3"
                sm="12"
                class="mt-4"
              />
              <v-col
                cols="12"
                md="9"
                sm="12"
                :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                >
                  <v-text-field
                    v-model="formRiwayatPasien.visited_city"
                    :error-messages="errors"
                    :placeholder="$t('label.city_visited')"
                    solo-inverted
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="3"
                sm="12"
                class="mt-4"
              />
              <v-col
                cols="12"
                md="9"
                sm="12"
                :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
              >
                <ValidationProvider>
                  <v-checkbox
                    v-model="formRiwayatPasien.is_contact_with_positive"
                    :label="$t('label.contact_with_positive_patients')"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="3"
                sm="12"
                class="mt-4"
              />
              <v-col
                cols="12"
                md="9"
                sm="12"
                :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
              >
                <ValidationProvider>
                  <v-text-field
                    v-model="formRiwayatPasien.history_notes"
                    :placeholder="$t('label.enter_other_history_applicable')"
                    solo-inverted
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="3"
                sm="12"
                class="mt-4"
              >
                <label>{{ $t('label.date_symptoms') }}</label>
              </v-col>
              <v-col
                cols="12"
                md="9"
                sm="12"
                :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
              >
                <select-datetime
                  :datetime="formRiwayatPasien.first_symptom_date"
                  :date-time.sync="formRiwayatPasien.first_symptom_date"
                  :formate-date="formatDate"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="3"
                sm="12"
                class="mt-4"
              >
                <label>{{ $t('label.symptoms') }}</label>
              </v-col>
              <v-col
                cols="12"
                md="9"
                sm="12"
                :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
              >
                <ValidationProvider v-slot="{ errors }">
                  <v-row>
                    <v-col v-for="item in symptomOptions" :key="item" sm="4" md="4">
                      <label class="material-checkbox-custom">
                        <input
                          v-model="formRiwayatPasien.diagnosis"
                          :value="item"
                          type="checkbox"
                        >
                        <span v-if="errors.length" class="error--text">{{ item }}</span>
                        <span v-else>{{ item }}</span>
                      </label>
                      <span
                        v-if="errors.length"
                        class="v-messages error--text"
                      >{{ errors[0] }}</span>
                    </v-col>
                  </v-row>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                md="3"
                sm="12"
                class="mt-4"
              />
              <v-col
                cols="12"
                md="9"
                sm="12"
                :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
              >
                <ValidationProvider>
                  <v-text-field
                    v-model="formRiwayatPasien.diagnosis_other"
                    :placeholder="$t('label.mention_other_symptoms')"
                    solo-inverted
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-container fluid>
              <v-row>
                <v-col class="text-right">
                  <v-btn
                    :loading="loading"
                    bottom
                    @click="handleCancel"
                  >
                    {{ $t('label.cancel') }}
                  </v-btn>
                  <v-btn
                    :loading="loading"
                    class="ml-2"
                    color="success"
                    bottom
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
import { symptomOptions, additionalConditionOptions } from '@/utils/constantVariable'
import { mapGetters } from 'vuex'

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
      formatDate: 'YYYY/MM/DD',
      panelRiwayat: [0],
      panelListRiwayat: [0],
      symptomOptions: symptomOptions,
      arrayRegion: null,
      additionalConditionOptions: additionalConditionOptions
    }
  },
  computed: {
    ...mapGetters('region', [
      'hospitalList'
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
      await this.$router.push('/laporan/list')
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
    }
  }
}
</script>
