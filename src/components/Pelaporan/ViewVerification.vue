<template>
  <div>
    <v-row class="mx-0 font-weight-bold headline mb-5">
      {{ $t('label.detail_case') }}
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
          <v-text-field
            v-model="caseData.nik"
            solo-inverted
            disabled
          />
        </v-row>
        <v-row class="input-label">
          {{ $t('label.name_case') }}
        </v-row>
        <v-row>
          <v-text-field
            v-model="caseData.name"
            solo-inverted
            disabled
          />
        </v-row>
        <v-row class="input-label">
          {{ $t('label.birth_date') }}
        </v-row>
        <v-row>
          <v-text-field
            v-model="caseData.birth_date"
            solo-inverted
            disabled
          />
        </v-row>
        <v-row class="input-label">
          {{ $t('label.age') }}
        </v-row>
        <v-row align="start">
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown, 'px-0': $vuetify.breakpoint. mdAndUp}"
          >
            <v-row align="center" class="ma-0">
              <v-col cols="12" sm="3" class="pa-0">
                <v-text-field
                  v-model="caseData.yearsOld"
                  type="number"
                  min="0"
                  max="120"
                  solo-inverted
                  oninput="if(Number(this.value) > Number(this.max)) this.value = this.max"
                  disabled
                />
              </v-col>
              <v-col cols="12" md="3" sm="2" class="pa-0 text-center">
                <label>{{ $t('label.year') }}</label>
              </v-col>
              <v-col cols="12" sm="3" class="pa-0">
                <v-text-field
                  v-model="caseData.monthsOld"
                  type="number"
                  min="0"
                  max="11"
                  solo-inverted
                  oninput="if(Number(this.value) > Number(this.max)) this.value = this.max"
                  disabled
                />
              </v-col>
              <v-col cols="12" md="3" sm="2" class="pa-0 text-center">
                <label>{{ $t('label.month') }}</label>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="input-label">
          {{ $t('label.gender') }}
        </v-row>
        <v-row>
          <v-text-field
            v-model="caseData.gender"
            solo-inverted
            disabled
          />
        </v-row>
        <v-row class="input-label">
          {{ $t('label.phone_number') }}
        </v-row>
        <v-row>
          <v-text-field
            v-model="caseData.phone_number"
            solo-inverted
            type="number"
            disabled
          />
        </v-row>
        <v-row class="input-label">
          {{ $t('label.address_home') }}
        </v-row>
        <v-row>
          <v-text-field
            v-model="caseData.new_address"
            solo-inverted
            disabled
          />
        </v-row>
        <v-row class="input-label">
          {{ $t('label.address_complete_home') }}
        </v-row>
        <v-row>
          <v-text-field
            v-model="caseData.address_street"
            solo-inverted
            disabled
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
            v-model="caseData.id_case_national"
            solo-inverted
            disabled
          />
        </v-row>
        <v-row class="input-label">
          {{ $t('label.related_case_id') }}
        </v-row>
        <v-row>
          <v-text-field
            v-model="caseData.id_case_related"
            solo-inverted
            disabled
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
            v-model="caseData.occupation"
            solo-inverted
            disabled
          />
        </v-row>
        <v-row class="input-label">
          {{ $t('label.office_address') }}
        </v-row>
        <v-row>
          <v-text-field
            v-model="caseData.office_address"
            solo-inverted
            disabled
          />
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mx-0 mt-0">
      <v-col class="mr-5 pt-0">
        <v-row class="input-label">
          {{ $t('label.citizenship') }}
        </v-row>
        <v-row>
          <v-text-field
            v-model="caseData.nationality"
            solo-inverted
            disabled
          />
        </v-row>
      </v-col>
      <v-col class="pt-0">
        <v-row class="input-label">
          {{ $t('label.country') }}
        </v-row>
        <v-row>
          <v-text-field
            v-model="caseData.nationality_name"
            solo-inverted
            disabled
          />
        </v-row>
      </v-col>
    </v-row>
    <hr>
    <v-row class="mx-0">
      <v-col>
        <v-row class="input-label">
          {{ $t('label.status') }}
        </v-row>
        <v-row>
          <div
            :class="statusLabel"
            class="status-label"
          >
            {{ caseData.status }}
          </div>
        </v-row>
      </v-col>
      <v-col :class="caseData.stage === $t('label.done') ? 'mx-5' : 'ml-5'">
        <v-row class="input-label">
          {{ $t('label.stages') }}
        </v-row>
        <v-row>
          <v-text-field
            v-model="caseData.stage"
            solo-inverted
            disabled
          />
        </v-row>
      </v-col>
      <v-col v-if="caseData.stage === $t('label.done')">
        <v-row class="input-label">
          {{ $t('label.results') }}
        </v-row>
        <v-row>
          <v-text-field
            v-model="caseData.final_result"
            solo-inverted
            disabled
          />
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mx-0">
      <v-col class="mr-5">
        <v-row class="input-label">
          {{ $t('label.current_location') }}
        </v-row>
        <v-row>
          <v-text-field
            v-model="caseData.last_history.current_location_type"
            solo-inverted
            disabled
          />
        </v-row>
        <v-row class="input-label">
          {{ $t('label.address') }}
        </v-row>
        <v-row>
          <v-text-field
            v-model="caseData.last_history.current_location_address"
            solo-inverted
            disabled
          />
        </v-row>
        <v-row class="input-label">
          {{ $t('label.history') }}
        </v-row>
        <v-row>
          <v-text-field
            v-model="caseData.last_history.historyList"
            solo-inverted
            disabled
          />
        </v-row>
        <v-row class="input-label">
          {{ $t('label.other_illness_history') }}
        </v-row>
        <v-row>
          <v-text-field
            v-model="caseData.last_history.history_notes"
            solo-inverted
            disabled
          />
        </v-row>
        <v-row class="input-label">
          {{ $t('label.other_additional_condition') }}
        </v-row>
        <v-row>
          <v-text-field
            v-model="caseData.last_history.diseases_other"
            solo-inverted
            disabled
          />
        </v-row>
        <v-row class="input-label">
          {{ $t('label.reporting_sources') }}
        </v-row>
        <v-row>
          <v-text-field
            v-if="caseData"
            v-model="caseData.last_history.report_source"
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
            v-model="caseData.last_history.first_symptom_date"
            solo-inverted
            disabled
          />
        </v-row>
        <v-row class="input-label">
          {{ $t('label.symptoms') }}
        </v-row>
        <v-row>
          <v-text-field
            v-model="caseData.last_history.diagnosis"
            solo-inverted
            disabled
          />
        </v-row>
        <v-row class="input-label">
          {{ $t('label.other_symptoms') }}
        </v-row>
        <v-row>
          <v-text-field
            v-model="caseData.last_history.diagnosis_other"
            solo-inverted
            disabled
          />
        </v-row>
        <v-row class="input-label">
          {{ $t('label.additional_condition') }}
        </v-row>
        <v-row>
          <v-text-field
            v-model="caseData.last_history.diseases"
            solo-inverted
            disabled
          />
        </v-row>
        <v-row class="input-label">
          {{ $t('label.postscript') }}
        </v-row>
        <v-row>
          <v-text-field
            v-model="caseData.last_history.other_notes"
            solo-inverted
            disabled
          />
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ViewVerification',
  props: {
    caseData: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles'
    ]),
    statusLabel() {
      return {
        'positif': this.caseData.status === 'POSITIF',
        'pdp': this.caseData.status === 'PDP',
        'odp': this.caseData.status === 'ODP',
        'otg': this.caseData.status === 'OTG'
      }
    }
  }
}
</script>
