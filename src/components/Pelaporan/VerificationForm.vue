<template>
  <v-dialog v-model="show" :max-width="maxWidthDialog">
    <v-card class="pa-7">
      <ValidationObserver ref="observer">
        <v-row class="mx-0 font-weight-bold headline mb-5">
          {{ $t('label.detail_case') }}
        </v-row>
        <v-row v-if="caseDetail && caseDetail.verified_status === 'declined'" class="mx-0">
          <div class="rejection py-2 px-7">
            <v-row justify="start">
              <v-col cols="12" sm="1">
                <v-icon x-large color="#EB5757">mdi-alert-circle</v-icon>
              </v-col>
              <v-col cols="12" sm="11">
                <v-row>
                  <span class="font-weight-bold">{{ $t('label.rejection_note') }}</span>
                </v-row>
                <v-row>
                  <span>"{{ caseDetail.verified_comment }}"</span>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </v-row>
        <v-row class="mx-0">
          <v-col class="mr-5 pb-0">
            <v-row class="font-weight-bold subtitle">
              {{ $t('label.identity') }}
            </v-row>
            <v-row class="input-label">
              {{ $t('label.nik') }}
            </v-row>
            <v-row>
              <ValidationProvider
                v-slot="{ errors }"
                class="full-width"
              >
                <v-text-field
                  v-if="caseDetail"
                  v-model="caseDetail.nik"
                  solo-inverted
                  :error-messages="errors"
                  :disabled="caseDetail.verified_status !== 'declined'"
                />
              </ValidationProvider>
            </v-row>
            <v-row class="input-label" :class="required">
              {{ $t('label.name_case') }}
            </v-row>
            <v-row>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="full-width"
              >
                <v-text-field
                  v-if="caseDetail"
                  v-model="caseDetail.name"
                  solo-inverted
                  :error-messages="errors"
                  :disabled="caseDetail.verified_status !== 'declined'"
                />
              </ValidationProvider>
            </v-row>
            <v-row class="input-label">
              {{ $t('label.birth_date') }}
            </v-row>
            <v-row>
              <v-text-field
                v-if="caseDetail && caseDetail.verified_status !== 'declined'"
                v-model="caseDetail.birth_date"
                solo-inverted
                disabled
              />
              <select-datetime
                v-else-if="caseDetail"
                :datetime="caseDetail.birth_date"
                :date-time.sync="caseDetail.birth_date"
                :formate-date="'YYYY/MM/DD'"
              />
            </v-row>
            <v-row class="input-label" :class="required">
              {{ $t('label.age') }}
            </v-row>
            <v-row>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="full-width"
              >
                <v-text-field
                  v-if="caseDetail"
                  v-model="caseDetail.age"
                  solo-inverted
                  :error-messages="errors"
                  :disabled="caseDetail.verified_status !== 'declined'"
                />
              </ValidationProvider>
            </v-row>
            <v-row class="input-label" :class="required">
              {{ $t('label.gender') }}
            </v-row>
            <v-row>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="full-width"
              >
                <v-text-field
                  v-if="caseDetail && caseDetail.verified_status !== 'declined'"
                  v-model="caseDetail.gender"
                  solo-inverted
                  disabled
                />
                <v-radio-group
                  v-else-if="caseDetail"
                  v-model="caseDetail.gender"
                  :error-messages="errors"
                  row
                >
                  <v-radio
                    :label="$t('label.male')"
                    value="L"
                  />
                  <v-radio
                    :label="$t('label.female')"
                    value="P"
                  />
                </v-radio-group>
              </ValidationProvider>
            </v-row>
            <v-row class="input-label">
              {{ $t('label.phone_number') }}
            </v-row>
            <v-row>
              <ValidationProvider
                v-slot="{ errors }"
                rules="isPhoneNumber"
                class="full-width"
              >
                <v-text-field
                  v-if="caseDetail"
                  v-model="caseDetail.phone_number"
                  solo-inverted
                  type="number"
                  placeholder="08xxxxxxxxx"
                  :disabled="caseDetail.verified_status !== 'declined'"
                  :error-messages="errors"
                />
              </ValidationProvider>
            </v-row>
            <v-row class="input-label">
              {{ $t('label.address_home') }}
            </v-row>
            <v-row>
              <v-text-field
                v-if="caseDetail && caseDetail.verified_status !== 'declined'"
                v-model="caseDetail.new_address"
                solo-inverted
                disabled
              />
              <address-region
                v-else-if="caseDetail && caseDetail.address_district_name"
                :district-code="caseDetail.address_district_code"
                :district-name="caseDetail.address_district_name"
                :code-district.sync="caseDetail.address_district_code"
                :name-district.sync="caseDetail.address_district_name"
                :sub-district-code="caseDetail.address_subdistrict_code"
                :sub-district-name="caseDetail.address_subdistrict_name"
                :code-sub-district.sync="caseDetail.address_subdistrict_code"
                :name-sub-district.sync="caseDetail.address_subdistrict_name"
                :village-code="caseDetail.address_village_code"
                :village-name="caseDetail.address_village_name"
                :code-village.sync="caseDetail.address_village_code"
                :name-village.sync="caseDetail.address_village_name"
                :disabled-address="false"
                :required-address="true"
              />
            </v-row>
            <v-row class="input-label">
              {{ $t('label.address_complete_home') }}
            </v-row>
            <v-row>
              <v-text-field
                v-if="caseDetail"
                v-model="caseDetail.address_street"
                solo-inverted
                :disabled="caseDetail.verified_status !== 'declined'"
              />
            </v-row>
          </v-col>
          <v-col class="pb-0">
            <v-row class="font-weight-bold subtitle">
              {{ $t('label.case_id') }}
            </v-row>
            <v-row class="input-label">
              {{ $t('label.center_case_id') }}
            </v-row>
            <v-row>
              <v-text-field
                v-if="caseDetail"
                v-model="caseDetail.id_case_national"
                solo-inverted
                :disabled="caseDetail.verified_status !== 'declined'"
              />
            </v-row>
            <v-row class="input-label">
              {{ $t('label.related_case_id') }}
            </v-row>
            <v-row>
              <ValidationProvider
                v-if="caseDetail && caseDetail.verified_status === 'declined'"
                v-slot="{ errors }"
                class="full-width"
              >
                <v-autocomplete
                  :no-data-text="$t('label.no_data_autocomplete_related_case')"
                  :error-messages="errors"
                  :items="listNameCases"
                  :search-input.sync="searchRelatedCase"
                  item-text="relateds"
                  solo-inverted
                  clearable
                  return-object
                  @change="handleChangeRelatedCase"
                  @click:clear="clearListNameCases"
                />
              </ValidationProvider>
              <v-text-field
                v-else-if="caseDetail"
                v-model="caseDetail.id_case_related"
                solo-inverted
                :disabled="caseDetail.verified_status !== 'declined'"
              />
            </v-row>
            <v-row class="font-weight-bold subtitle extra-margin-top">
              {{ $t('label.profession') }}
            </v-row>
            <v-row class="input-label">
              {{ $t('label.profession') }}
            </v-row>
            <v-row>
              <v-text-field
                v-if="caseDetail"
                v-model="caseDetail.occupation"
                solo-inverted
                :disabled="caseDetail.verified_status !== 'declined'"
              />
            </v-row>
            <v-row class="input-label">
              {{ $t('label.office_address') }}
            </v-row>
            <v-row>
              <v-text-field
                v-if="caseDetail"
                v-model="caseDetail.office_address"
                solo-inverted
                :disabled="caseDetail.verified_status !== 'declined'"
              />
            </v-row>
          </v-col>
        </v-row>
        <v-row class="mx-0 mt-0">
          <v-col class="mr-5 pt-0">
            <v-row class="input-label" :class="required">
              {{ $t('label.citizenship') }}
            </v-row>
            <v-row>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="full-width"
              >
                <v-text-field
                  v-if="caseDetail && caseDetail.verified_status !== 'declined'"
                  v-model="caseDetail.nationality"
                  solo-inverted
                  disabled
                />
                <v-radio-group
                  v-else-if="caseDetail"
                  v-model="caseDetail.nationality"
                  row
                  :error-messages="errors"
                >
                  <v-radio
                    :label="$t('label.wni')"
                    value="WNI"
                  />
                  <v-radio
                    :label="$t('label.wna')"
                    value="WNA"
                  />
                </v-radio-group>
              </ValidationProvider>
            </v-row>
          </v-col>
          <v-col class="pt-0">
            <v-row class="input-label">
              {{ $t('label.country') }}
            </v-row>
            <v-row>
              <v-text-field
                v-if="displayNationality"
                v-model="caseDetail.nationality_name"
                solo-inverted
                :disabled="caseDetail.verified_status !== 'declined' || caseDetail.nationality === 'WNI'"
              />
              <v-autocomplete
                v-else-if="caseDetail"
                v-model="caseDetail.nationality_name"
                :items="listCountry"
                item-text="name"
                item-value="name"
                :placeholder="$t('label.country_origin')"
                clearable
                solo-inverted
              />
            </v-row>
          </v-col>
        </v-row>
        <hr>
        <v-row v-if="caseDetail && caseDetail.verified_status !== 'declined'" class="mx-0">
          <v-col>
            <v-row class="input-label">
              {{ $t('label.status') }}
            </v-row>
            <v-row>
              <div
                v-if="caseDetail"
                :class="statusLabel"
                class="status-label"
              >
                {{ caseDetail.status }}
              </div>
            </v-row>
          </v-col>
          <v-col class="mx-5">
            <v-row class="input-label">
              {{ $t('label.stages') }}
            </v-row>
            <v-row>
              <v-text-field
                v-if="caseDetail"
                v-model="caseDetail.stage"
                solo-inverted
                disabled
              />
            </v-row>
          </v-col>
          <v-col>
            <v-row class="input-label">
              {{ $t('label.results') }}
            </v-row>
            <v-row>
              <v-text-field
                v-if="caseDetail"
                v-model="caseDetail.final_result"
                solo-inverted
                disabled
              />
            </v-row>
          </v-col>
        </v-row>
        <v-row v-else-if="caseDetail" class="mx-0">
          <v-col class="mr-5">
            <v-row class="input-label" :class="required">
              {{ $t('label.status') }}
            </v-row>
            <v-row>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="full-width"
              >
                <v-radio-group
                  v-model="caseDetail.status"
                  row
                  :error-messages="errors"
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
            </v-row>
            <v-row class="input-label" :class="required">
              {{ $t('label.stages') }}
            </v-row>
            <v-row>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="full-width"
              >
                <v-radio-group
                  v-model="caseDetail.stage"
                  row
                  :error-messages="errors"
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
            </v-row>
            <v-row v-if="caseDetail.stage === '1'" class="input-label">
              {{ $t('label.results') }}
            </v-row>
            <v-row v-if="caseDetail.stage === '1'">
              <v-radio-group
                v-model="caseDetail.final_result"
                row
              >
                <v-radio
                  v-if="caseDetail.status !== 'POSITIF'"
                  :label="$t('label.negatif')"
                  value="0"
                />
                <v-radio
                  :label="$t('label.recovery')"
                  value="1"
                />
                <v-radio
                  :label="$t('label.dead')"
                  value="2"
                />
              </v-radio-group>
            </v-row>
          </v-col>
          <v-col>
            <v-row class="input-label" :class="required">
              {{ $t('label.current_location') }}
            </v-row>
            <v-row>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                class="full-width"
              >
                <v-radio-group
                  v-model="caseDetail.last_history.current_location_type"
                  row
                  :error-messages="errors"
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
                  <v-radio
                    :label="$t('label.other_places')"
                    value="others"
                  />
                </v-radio-group>
              </ValidationProvider>
            </v-row>
            <v-row>
              <address-region
                v-if="caseDetail && caseDetail.last_history.current_location_type === 'RUMAH'"
                :district-code="caseDetail.last_history.current_location_district_code"
                :code-district.sync="caseDetail.last_history.current_location_district_code"
                :sub-district-code="caseDetail.last_history.current_location_subdistrict_code"
                :code-sub-district.sync="caseDetail.last_history.current_location_subdistrict_code"
                :village-code="caseDetail.last_history.current_location_village_code"
                :village-name="caseDetail.last_history.current_location_village_name"
                :code-village.sync="caseDetail.last_history.current_location_village_code"
                :name-village.sync="caseDetail.last_history.current_location_village_name"
                :disabled-address="false"
                :required-address="true"
              />
              <ValidationProvider
                v-if="caseDetail && caseDetail.verified_status === 'declined' && caseDetail.last_history.current_location_type === 'RS'"
                v-slot="{ errors }"
                rules="required"
                class="full-width"
              >
                <v-autocomplete
                  v-model="caseDetail.last_history.current_location_address"
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
              <ValidationProvider
                v-if="caseDetail && caseDetail.verified_status === 'declined' && caseDetail.last_history.current_location_type === 'others'"
                v-slot="{ errors }"
                rules="required"
                class="full-width"
              >
                <v-autocomplete
                  v-model="caseDetail.last_history.current_location_address"
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
            </v-row>
            <v-row>
              <label v-if="displayCurrentLocation" class="input-label">{{ $t('label.address_complete_this_time') }}</label>
            </v-row>
            <v-row>
              <v-text-field
                v-if="displayCurrentLocation"
                v-model="caseDetail.last_history.current_location_address"
                solo-inverted
                :disabled="caseDetail.verified_status !== 'declined'"
              />
            </v-row>
          </v-col>
        </v-row>
        <hr v-if="caseDetail && caseDetail.verified_status === 'declined'">
        <v-row class="mx-0">
          <v-col class="mr-5">
            <v-row v-if="caseDetail && caseDetail.verified_status !== 'declined'" class="input-label">
              {{ $t('label.current_location') }}
            </v-row>
            <v-row>
              <v-text-field
                v-if="caseDetail && caseDetail.verified_status !== 'declined'"
                v-model="caseDetail.last_history.current_location_type"
                solo-inverted
                disabled
              />
            </v-row>
            <v-row v-if="caseDetail && caseDetail.verified_status !== 'declined'" class="input-label">
              {{ $t('label.address') }}
            </v-row>
            <v-row>
              <v-text-field
                v-if="caseDetail && caseDetail.verified_status !== 'declined'"
                v-model="caseDetail.last_history.current_location_address"
                solo-inverted
                :disabled="caseDetail.verified_status !== 'declined'"
              />
            </v-row>
            <v-row class="input-label">
              {{ $t('label.history') }}
            </v-row>
            <v-row>
              <v-text-field
                v-if="caseDetail && caseDetail.verified_status !== 'declined'"
                v-model="caseDetail.last_history.historyList"
                solo-inverted
                disabled
              />
              <div v-else-if="caseDetail" class="full-width">
                <v-checkbox
                  v-model="caseDetail.last_history.is_went_abroad"
                  :label="$t('label.from_abroad')"
                  class="mt-0 pt-0"
                />
                <v-row v-if="caseDetail && caseDetail.last_history.is_went_abroad" class="input-label mx-0">
                  {{ $t('label.country_visited') }}
                </v-row>
                <v-row class="mx-0">
                  <v-text-field
                    v-if="caseDetail && caseDetail.last_history.is_went_abroad"
                    v-model="caseDetail.last_history.visited_country"
                    solo-inverted
                    :disabled="caseDetail.verified_status !== 'declined'"
                  />
                </v-row>
                <v-checkbox
                  v-model="caseDetail.last_history.is_went_other_city"
                  :label="$t('label.trip_outside_the_city')"
                  class="mt-0 pt-0"
                />
                <v-row v-if="caseDetail && caseDetail.last_history.is_went_other_city" class="input-label mx-0">
                  {{ $t('label.city_visited') }}
                </v-row>
                <v-row class="mx-0">
                  <v-text-field
                    v-if="caseDetail && caseDetail.last_history.is_went_other_city"
                    v-model="caseDetail.last_history.visited_city"
                    solo-inverted
                    :disabled="caseDetail.verified_status !== 'declined'"
                  />
                </v-row>
                <v-checkbox
                  v-model="caseDetail.last_history.is_contact_with_positive"
                  :label="$t('label.contact_with_positive_patients')"
                  class="mt-0 pt-0"
                />
              </div>
            </v-row>
            <v-row class="input-label">
              {{ $t('label.other_illness_history') }}
            </v-row>
            <v-row v-if="caseDetail">
              <v-text-field
                v-model="caseDetail.last_history.history_notes"
                solo-inverted
                :disabled="caseDetail.verified_status !== 'declined'"
              />
            </v-row>
            <v-row v-if="caseDetail && caseDetail.verified_status === 'declined'" class="input-label">
              {{ $t('label.additional_condition') }}
            </v-row>
            <v-row v-if="caseDetail && caseDetail.verified_status === 'declined'">
              <v-col v-for="item in additionalConditionOptions" :key="item" sm="6" md="6" class="pa-0">
                <v-checkbox
                  v-model="caseDetail.last_history.diseases"
                  :label="item"
                  :value="item"
                  class="mt-0 pt-0"
                />
              </v-col>
            </v-row>
            <v-row class="input-label">
              {{ $t('label.other_additional_condition') }}
            </v-row>
            <v-row v-if="caseDetail">
              <v-text-field
                v-model="caseDetail.last_history.diseases_other"
                solo-inverted
                :disabled="caseDetail.verified_status !== 'declined'"
              />
            </v-row>
            <v-row v-if="caseDetail && caseDetail.verified_status !== 'declined'" class="input-label">
              {{ $t('label.reporting_sources') }}
            </v-row>
            <v-row v-if="caseDetail && caseDetail.verified_status !== 'declined'">
              <v-text-field
                v-if="caseDetail"
                v-model="caseDetail.last_history.report_source"
                solo-inverted
                disabled
              />
            </v-row>
          </v-col>
          <v-col>
            <v-row class="input-label">
              {{ $t('label.date_of_beginning_symptoms') }}
            </v-row>
            <v-row>
              <v-text-field
                v-if="caseDetail && caseDetail.verified_status !== 'declined'"
                v-model="caseDetail.last_history.first_symptom_date"
                solo-inverted
                disabled
              />
              <select-datetime
                v-else-if="caseDetail"
                :datetime="caseDetail.last_history.first_symptom_date"
                :date-time.sync="caseDetail.last_history.first_symptom_date"
                :formate-date="'YYYY/MM/DD'"
              />
            </v-row>
            <v-row class="input-label">
              {{ $t('label.symptoms') }}
            </v-row>
            <v-row v-if="caseDetail && caseDetail.verified_status !== 'declined'">
              <v-text-field
                v-model="caseDetail.last_history.diagnosis"
                solo-inverted
                disabled
              />
            </v-row>
            <v-row v-else-if="caseDetail">
              <v-col v-for="item in symptomOptions" :key="item" sm="6" md="6" class="pa-0">
                <v-checkbox
                  v-model="caseDetail.last_history.diagnosis"
                  :label="item"
                  :value="item"
                  class="mt-0 pt-0"
                />
              </v-col>
            </v-row>
            <v-row class="input-label">
              {{ $t('label.other_symptoms') }}
            </v-row>
            <v-row v-if="caseDetail">
              <v-text-field
                v-model="caseDetail.last_history.diagnosis_other"
                solo-inverted
                :disabled="caseDetail.verified_status !== 'declined'"
              />
            </v-row>
            <v-row v-if="caseDetail && caseDetail.verified_status !== 'declined'" class="input-label">
              {{ $t('label.additional_condition') }}
            </v-row>
            <v-row v-if="caseDetail && caseDetail.verified_status !== 'declined'">
              <v-text-field
                v-model="caseDetail.last_history.diseases"
                solo-inverted
                disabled
              />
            </v-row>
            <v-row v-if="caseDetail && caseDetail.verified_status !== 'declined'" class="input-label">
              {{ $t('label.postscript') }}
            </v-row>
            <v-row v-if="caseDetail && caseDetail.verified_status !== 'declined'">
              <v-text-field
                v-model="caseDetail.last_history.other_notes"
                solo-inverted
                :disabled="caseDetail.verified_status !== 'declined'"
              />
            </v-row>
          </v-col>
        </v-row>
        <v-row v-if="caseDetail && caseDetail.verified_status === 'declined'" class="mx-0">
          <v-col class="mr-5">
            <v-row class="input-label">
              {{ $t('label.reporting_sources') }}
            </v-row>
            <v-row>
              <v-text-field
                v-if="caseDetail"
                v-model="caseDetail.last_history.report_source"
                solo-inverted
                disabled
              />
            </v-row>
          </v-col>
          <v-col>
            <v-row class="input-label">
              {{ $t('label.postscript') }}
            </v-row>
            <v-row>
              <v-text-field
                v-model="caseDetail.last_history.other_notes"
                solo-inverted
              />
            </v-row>
          </v-col>
        </v-row>
        <v-row v-if="showActionButton" class="mx-0">
          <v-col class="pa-0 mr-6">
            <v-btn
              color="grey"
              width="100%"
              outlined
              @click="onClose(false)"
            >
              <span class="input-label text-capitalize decline">{{ roles[0] === 'faskes' ? $t('label.canceled') : $t('label.decline') }}</span>
            </v-btn>
          </v-col>
          <v-col class="pa-0">
            <v-btn
              color="#2ead64"
              width="100%"
              @click="onClose(true)"
            >
              <span class="text-capitalize verify">{{ roles[0] === 'faskes' ? $t('label.update_case') : $t('label.verify_case') }}</span>
            </v-btn>
          </v-col>
        </v-row>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>
<script>
import { formatDatetime } from '@/utils/parseDatetime'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapGetters } from 'vuex'
import { getAge } from '@/utils/constantVariable'
import { symptomOptions, additionalConditionOptions } from '@/utils/constantVariable'
export default {
  name: 'VerificationForm',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    showForm: {
      type: Boolean,
      default: false
    },
    caseData: {
      type: Object,
      default: null
    },
    queryData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      caseDetail: null,
      query: null,
      show: false,
      symptomOptions: symptomOptions,
      additionalConditionOptions: additionalConditionOptions,
      listNameCases: [],
      listCountry: [],
      hospitalWestJavaList: [],
      hospitalNonWestJavaList: [],
      searchRelatedCase: null,
      listQuery: {
        'name': ''
      }
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles'
    ]),
    statusLabel() {
      return {
        'positif': this.caseDetail.status === 'POSITIF',
        'pdp': this.caseDetail.status === 'PDP',
        'odp': this.caseDetail.status === 'ODP',
        'otg': this.caseDetail.status === 'OTG'
      }
    },
    showActionButton() {
      if (this.roles[0] !== 'faskes') {
        return true
      } else {
        return this.caseDetail && this.caseDetail.verified_status === 'declined'
      }
    },
    required() {
      return {
        'required': this.caseDetail && this.caseDetail.verified_status === 'declined'
      }
    },
    maxWidthDialog() {
      return this.$vuetify.breakpoint.xl ? '50%' : '70%'
    },
    displayCurrentLocation() {
      if (this.caseDetail) {
        if (this.caseDetail.verified_status !== 'declined') {
          return true
        } else {
          if (this.caseDetail.last_history.current_location_type === 'RUMAH') {
            return true
          } else {
            return false
          }
        }
      } else {
        return false
      }
    },
    displayNationality() {
      if (this.caseDetail) {
        if (this.caseDetail.verified_status === 'declined') {
          return this.caseDetail.nationality === 'WNI'
        } else {
          return true
        }
      } else {
        return false
      }
    }
  },
  watch: {
    async showForm(value) {
      this.show = value
      if (value) {
        this.caseDetail = this.caseData
        if (this.caseDetail.birth_date) {
          if (this.caseDetail.verified_status !== 'declined') {
            this.caseDetail.birth_date = formatDatetime(this.caseDetail.birth_date, 'DD MMMM YYYY')
          } else {
            this.caseDetail.birth_date = formatDatetime(this.caseDetail.birth_date, 'YYYY/MM/DD')
          }
        }
        if (this.caseDetail.last_history.first_symptom_date) {
          if (this.caseDetail.verified_status !== 'declined') {
            this.caseDetail.last_history.first_symptom_date = formatDatetime(this.caseDetail.last_history.first_symptom_date, 'DD MMMM YYYY')
          } else {
            this.caseDetail.last_history.first_symptom_date = formatDatetime(this.caseDetail.last_history.first_symptom_date, 'YYYY/MM/DD')
          }
        }
        if (this.caseDetail.verified_status !== 'declined') {
          this.caseDetail.gender = this.caseDetail.gender === 'L' ? this.$t('label.male') : this.$t('label.female')
          if (this.caseDetail.last_history.current_location_type === 'RUMAH') {
            this.caseDetail.last_history.current_location_type = this.$t('label.home')
          } else if (this.caseDetail.last_history.current_location_type === 'RS') {
            this.caseDetail.last_history.current_location_type = this.$t('label.hospital')
          } else {
            this.caseDetail.last_history.current_location_type = this.$t('label.other')
          }
          if (this.caseDetail.stage === '0') {
            this.caseDetail.stage = this.$t('label.process')
          } else if (this.caseDetail.stage === '1') {
            this.caseDetail.stage = this.$t('label.done')
          }
          if (this.caseDetail.final_result === '0') {
            this.caseDetail.final_result = this.$t('label.negatif')
          } else if (this.caseDetail.final_result === '1') {
            this.caseDetail.final_result = this.$t('label.recovery')
          } else if (this.caseDetail.final_result === '2') {
            this.caseDetail.final_result = this.$t('label.dead')
          }
          this.caseDetail.last_history.historyList = []
          if (this.caseDetail.last_history.is_went_abroad) {
            this.caseDetail.last_history.historyList.push(this.$t('label.from_abroad'))
          }
          if (this.caseDetail.last_history.is_went_other_city) {
            this.caseDetail.last_history.historyList.push(this.$t('label.trip_outside_the_city'))
          }
          if (this.caseDetail.last_history.is_contact_with_positive) {
            this.caseDetail.last_history.historyList.push(this.$t('label.contact_with_positive_patients'))
          }
          this.caseDetail.new_address = `${this.caseDetail.address_village_name}, ${this.caseDetail.address_subdistrict_name}, ${this.caseDetail.address_district_name}`
        } else {
          const response = await this.$store.dispatch('region/listCountry')
          this.listCountry = response.data
          const paramHospitalWestJava = { 'rs_jabar': true }
          const paramHospitalNonWestJava = { 'rs_jabar': false }
          const responseWestJava = await this.$store.dispatch('region/getListHospital', paramHospitalWestJava)
          this.hospitalWestJavaList = responseWestJava.data
          const responseNonWestJava = await this.$store.dispatch('region/getListHospital', paramHospitalNonWestJava)
          this.hospitalNonWestJavaList = responseNonWestJava.data
        }
        this.query = this.queryData
      }
    },
    show(value) {
      this.$emit('update:show', value)
    },
    'caseDetail.birth_date'(value) {
      if (this.caseDetail.birth_date && this.caseDetail.verified_status === 'declined') {
        this.caseDetail.age = this.getAge(value)
      }
    },
    'caseDetail.nationality'(value) {
      if (value === 'WNI') {
        this.caseDetail.nationality_name = this.$t('label.indonesia')
      } else if (this.caseDetail.nationality_name === this.$t('label.indonesia')) {
        this.caseDetail.nationality_name = ''
      }
    },
    async searchRelatedCase(value) {
      if (value) {
        this.listQuery.name = value
        const response = await this.$store.dispatch('reports/listNameCase', this.listQuery)
        this.listNameCases = response.data
      } else {
        this.listNameCases = []
      }
    },
    'caseDetail.last_history.current_location_type'(value) {
      if (value === 'RUMAH') {
        this.caseDetail.last_history.current_location_address = ''
      }
    }
  },
  methods: {
    formatDatetime,
    getAge,
    async onClose(isVerified) {
      if (this.roles[0] !== 'faskes') {
        this.query.id = this.caseDetail._id
        this.query.data.verified_status = isVerified ? 'verified' : 'declined'
        this.$emit('update:query', this.query)
        this.$emit('update:showConfirmation', true)
      } else if (isVerified) {
        const valid = await this.$refs.observer.validate()
        if (!valid) {
          return
        }
        this.updateCase()
      }
      this.show = false
    },
    async updateCase() {
      const reportData = {
        'id': this.caseDetail._id,
        'data': {
          'nik': this.caseDetail.nik,
          'name': this.caseDetail.name,
          'age': this.caseDetail.age,
          'gender': this.caseDetail.gender,
          'phone_number': this.caseDetail.phone_number,
          'address_street': this.caseDetail.address_street,
          'nationality': this.caseDetail.nationality,
          'nationality_name': this.caseDetail.nationality_name,
          'id_case_national': this.caseDetail.id_case_national,
          'id_case_related': this.caseDetail.id_case_related,
          'name_case_related': this.caseDetail.name_case_related,
          'occupation': this.caseDetail.occupation,
          'office_address': this.caseDetail.office_address
        }
      }
      const historyData = {
        'case': this.caseDetail._id,
        'stage': this.caseDetail.stage,
        'final_result': this.caseDetail.final_result,
        'status': this.caseDetail.status,
        'current_location_type': this.caseDetail.last_history.current_location_type,
        'current_location_address': this.caseDetail.last_history.current_location_address,
        'is_went_abroad': this.caseDetail.last_history.is_went_abroad,
        'visited_country': this.caseDetail.last_history.visited_country,
        'is_went_other_city': this.caseDetail.last_history.is_went_other_city,
        'visited_city': this.caseDetail.last_history.visited_city,
        'is_contact_with_positive': this.caseDetail.last_history.is_contact_with_positive,
        'other_notes': this.caseDetail.last_history.other_notes,
        'first_symptom_date': this.caseDetail.last_history.first_symptom_date,
        'diagnosis': this.caseDetail.last_history.diagnosis,
        'current_hospital_id': this.caseDetail.last_history.current_hospital_id,
        'history_notes': this.caseDetail.last_history.history_notes,
        'diseases_other': this.caseDetail.last_history.diseases_other,
        'diagnosis_other': this.caseDetail.last_history.diagnosis_other,
        'diseases': this.caseDetail.last_history.diseases,
        'report_source': this.caseDetail.last_history.report_source
      }
      const verificationData = {
        'id': this.caseDetail._id,
        'data': {
          'verified_status': 'pending'
        }
      }
      const responseReport = await this.$store.dispatch('reports/updateReportCase', reportData)
      const responseHistory = await this.$store.dispatch('reports/createHistoryCase', historyData)
      const responseVerification = await this.$store.dispatch('reports/verifyCase', verificationData)
      if (responseReport.status === 200 && responseHistory.status === 200 && responseVerification.status === 200) {
        await this.$store.dispatch('toast/successToast', this.$t('success.update_success'))
      }
      this.$emit('update:refreshPage', true)
    },
    handleChangeRelatedCase(value) {
      this.caseDetail.id_case_related = value.id_case
      this.caseDetail.name_case_related = value.name
    },
    clearListNameCases() {
      this.listNameCases = []
    },
    onSelectHospital(value) {
      this.caseDetail.last_history.current_hospital_id = value._id
      this.caseDetail.last_history.current_location_address = value.name
    },
    handleChangeLocationNow(value) {
      if (value === 'RUMAH') {
        this.caseDetail.current_location_address = ''
      } else {
        this.caseDetail.current_hospital_id = ''
        this.caseDetail.current_location_address = ''
        this.caseDetail.current_location_district = ''
        this.caseDetail.current_location_subdistrict = ''
        this.caseDetail.current_location_village = ''
      }
    }
  }
}
</script>
<style>
.subtitle {
  font-size: 1.2rem !important;
  font-family: "Roboto", sans-serif !important;
  margin-bottom: 10px;
}
.extra-margin-top {
  margin-top: 65px;
}
.input-label {
  color: #a0a0a0 !important;
  font-weight: 500 !important;
}
.verify {
  color: white;
  font-size: 16px;
}
.decline {
  font-size: 16px;
}
.status-label {
  width: 100%;
  padding: 11px 0px;
  text-align: center;
  border-width: thin;
  border-style: solid;
  border-radius: 10px;
}
.positif {
  background-color: #ffe5e5;
  color: #EB5757;
  border-color: #EB5757;
}
.pdp {
  background-color: #fffee5;
  color: #ffce4f;
  border-color: #ffce4f;
}
.odp {
  background-color: #e5f2ff;
  color: #528fc4;
  border-color: #528fc4;
}
.otg {
  background-color: #dedede;
  color: rgba(0, 0, 0, 0.87);
  border-color: rgba(0, 0, 0, 0.87);
}
.required::after {
  content: " *";
  color: red;
}
.full-width {
  width: 100% !important;
}
.rejection {
  background-color: #fdeded;
  width: 100%;
  border-radius: 10px;
  color: #EB5757;
}
</style>
