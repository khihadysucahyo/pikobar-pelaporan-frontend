<template>
  <div>
    <v-card
      outlined
    >
      <v-row>
        <v-expansion-panels
          v-model="panelRiwayat"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header>
              {{ $t('label.update_case_history') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <ValidationObserver ref="observer">
                <v-form
                  ref="form"
                  lazy-validation
                >
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                      sm="12"
                    >
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                      >
                        <label class="required">{{ $t('label.criteria') }}</label>
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
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                      >
                        <label class="required">{{ $t('label.stages') }}</label>
                        <v-radio-group
                          v-model="formRiwayatPasien.stage"
                          :error-messages="errors"
                          row
                        >
                          <v-radio
                            :label="$t('label.process')"
                            value="0"
                          />
                          <v-radio
                            :label="$t('label.done')"
                            value="1"
                          />
                        </v-radio-group>
                      </ValidationProvider>
                      <ValidationProvider
                        v-if="formRiwayatPasien.status !== 'OTG' && formRiwayatPasien.status !== 'ODP'"
                        v-slot="{ errors }"
                      >
                        <label>{{ $t('label.results') }}</label>
                        <v-radio-group
                          v-model="formRiwayatPasien.final_result"
                          :error-messages="errors"
                          row
                        >
                          <v-radio
                            v-if="formRiwayatPasien.status !== 'POSITIF'"
                            :label="$t('label.negatif')"
                            value="0"
                            @click.prevent="uncheck('0')"
                          />
                          <v-radio
                            :label="$t('label.recovery')"
                            value="1"
                            @click.prevent="uncheck('1')"
                          />
                          <v-radio
                            :label="$t('label.dead')"
                            value="2"
                            @click.prevent="uncheck('2')"
                          />
                        </v-radio-group>
                      </ValidationProvider>
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                      >
                        <label class="required">{{ $t('label.current_location') }}</label>
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
                      <div v-if="formRiwayatPasien.current_location_type === 'RUMAH'">
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
                      </div>
                      <ValidationProvider
                        v-if="formRiwayatPasien.current_location_type === 'RUMAH'"
                        v-slot="{ errors }"
                      >
                        <v-label>{{ $t('label.address_complete_this_time') }}</v-label>
                        <v-text-field
                          v-model="formRiwayatPasien.current_location_address"
                          :error-messages="errors"
                          solo-inverted
                        />
                      </ValidationProvider>
                      <ValidationProvider
                        v-if="formRiwayatPasien.current_location_type === 'RS'"
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
                      <ValidationProvider
                        v-slot="{ errors }"
                      >
                        <v-label>{{ $t('label.reporting_sources') }}</v-label>
                        <v-text-field
                          v-model="formRiwayatPasien.report_source"
                          :error-messages="errors"
                          solo-inverted
                        />
                      </ValidationProvider>
                      <ValidationProvider v-slot="{ errors }">
                        <label>{{ $t('label.additional_condition') }}</label>
                        <v-row v-for="rowIdx in Math.ceil(additionalConditionOptions.length / 3)" :key="rowIdx">
                          <v-col v-for="item in additionalConditionOptions.slice(3 * (rowIdx - 1), 3 * rowIdx)" :key="item" class="one-third column">
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
                      <ValidationProvider>
                        <v-text-field
                          v-model="formRiwayatPasien.diseases_other"
                          :placeholder="$t('label.mention_other_additional_condition')"
                          solo-inverted
                        />
                      </ValidationProvider>
                      <ValidationProvider>
                        <v-label>{{ $t('label.postscript') }}</v-label>
                        <v-textarea
                          v-model="formRiwayatPasien.other_notes"
                          solo
                        />
                      </ValidationProvider>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                      sm="12"
                    >
                      <ValidationProvider>
                        <v-label>{{ $t('label.history') }}</v-label>
                        <v-checkbox
                          v-model="formRiwayatPasien.is_went_abroad"
                          :label="$t('label.from_abroad')"
                        />
                      </ValidationProvider>
                      <ValidationProvider
                        v-if="formRiwayatPasien.is_went_abroad === true"
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
                      <ValidationProvider>
                        <v-checkbox
                          v-model="formRiwayatPasien.is_went_other_city"
                          :label="$t('label.trip_outside_the_city')"
                        />
                      </ValidationProvider>
                      <ValidationProvider
                        v-if="formRiwayatPasien.is_went_other_city === true"
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
                      <ValidationProvider>
                        <v-checkbox
                          v-model="formRiwayatPasien.is_contact_with_positive"
                          :label="$t('label.contact_with_positive_patients')"
                        />
                      </ValidationProvider>
                      <ValidationProvider>
                        <v-text-field
                          v-model="formRiwayatPasien.history_notes"
                          :placeholder="$t('label.enter_other_history_applicable')"
                          solo-inverted
                        />
                      </ValidationProvider>
                      <label>{{ $t('label.date_symptoms') }}</label>
                      <select-datetime
                        :datetime="formRiwayatPasien.first_symptom_date"
                        :date-time.sync="formRiwayatPasien.first_symptom_date"
                        :formate-date="formatDate"
                      />
                      <ValidationProvider v-slot="{ errors }">
                        <label>{{ $t('label.symptoms') }}</label>
                        <div v-for="(item, index) in symptomOptions" :key="index">
                          <label class="material-checkbox-custom">
                            <input
                              v-model="formRiwayatPasien.diagnosis"
                              :value="item"
                              type="checkbox"
                            >
                            <span v-if="errors.length" class="error--text">{{ item }}</span>
                            <span v-else>{{ item }}</span>
                          </label>
                        </div>
                        <span
                          v-if="errors.length"
                          class="v-messages error--text"
                        >{{ errors[0] }}</span>
                      </ValidationProvider>
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
                    <v-row class="survey-bottom-form">
                      <v-col>
                        <v-btn
                          :loading="loading"
                          color="success"
                          bottom
                          style="float: right;"
                          @click="handleSaveHistory"
                        >
                          {{ $t('label.update_history') }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </ValidationObserver>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
      <v-row>
        <v-expansion-panels
          v-model="panelListRiwayat"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header>{{ $t('label.case_history_list') }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <case-history-list
                :list-history-case="listHistoryCase"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { symptomOptions, additionalConditionOptions } from '@/utils/constantVariable'
import { mapGetters } from 'vuex'

export default {
  name: 'EditHistoryCaseForm',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    idData: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      formatDate: 'YYYY/MM/DD',
      panelRiwayat: [0],
      panelListRiwayat: [0],
      symptomOptions: symptomOptions,
      listHistoryCase: null,
      arrayRegion: null,
      additionalConditionOptions: additionalConditionOptions
    }
  },
  computed: {
    ...mapGetters('reports', [
      'formRiwayatPasien'
    ]),
    ...mapGetters('region', [
      'hospitalList'
    ])
  },
  async mounted() {
    const response = await this.$store.dispatch('reports/listHistoryCase', this.idData)
    this.listHistoryCase = response.data
  },
  methods: {
    async handleSaveHistory() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      this.loading = true
      await this.$store.dispatch('reports/createHistoryCase', this.formRiwayatPasien)
      await this.$store.dispatch('toast/successToast', 'Data Riwayat Kasus Berhasil Di Perbaharui')
      await this.$store.dispatch('reports/resetRiwayatFormPasien')
      this.loading = false
      await this.$router.push('/laporan/list')
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

<style scoped>

</style>
