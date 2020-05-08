<template>
  <v-dialog v-model="show" max-width="50%">
    <v-card class="pa-7">
      <v-row class="mx-0 font-weight-bold headline mb-5">
        {{ $t('label.detail_case') }}
      </v-row>
      <v-row class="mx-0">
        <v-col class="mr-5 pb-0">
          <v-row class="font-weight-bold subtitle">
            {{ $t('label.identity') }}
          </v-row>
          <v-row class="input-label">
            {{ $t('label.name') }}
          </v-row>
          <v-row>
            <v-text-field
              v-if="caseDetail"
              v-model="caseDetail.name"
              solo-inverted
              disabled
            />
          </v-row>
          <v-row class="input-label">
            {{ $t('label.birth_date') }}
          </v-row>
          <v-row>
            <v-text-field
              v-if="caseDetail"
              v-model="caseDetail.birth_date"
              solo-inverted
              disabled
            />
          </v-row>
          <v-row class="input-label">
            {{ $t('label.age') }}
          </v-row>
          <v-row>
            <v-text-field
              v-if="caseDetail"
              v-model="caseDetail.age"
              solo-inverted
              disabled
            />
          </v-row>
          <v-row class="input-label">
            {{ $t('label.gender') }}
          </v-row>
          <v-row>
            <v-text-field
              v-if="caseDetail"
              v-model="caseDetail.gender"
              solo-inverted
              disabled
            />
          </v-row>
          <v-row class="input-label">
            {{ $t('label.phone_number') }}
          </v-row>
          <v-row>
            <v-text-field
              v-if="caseDetail"
              v-model="caseDetail.phone_number"
              solo-inverted
              disabled
            />
          </v-row>
          <v-row class="input-label">
            {{ $t('label.address') }}
          </v-row>
          <v-row>
            <v-text-field
              v-if="caseDetail"
              v-model="caseDetail.address_street"
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
              v-if="caseDetail"
              v-model="caseDetail.id_case_national"
              solo-inverted
              disabled
            />
          </v-row>
          <v-row class="input-label">
            {{ $t('label.related_case_id') }}
          </v-row>
          <v-row>
            <v-text-field
              v-if="caseDetail"
              v-model="caseDetail.id_case_related"
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
              v-if="caseDetail"
              v-model="caseDetail.occupation"
              solo-inverted
              disabled
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
              v-if="caseDetail"
              v-model="caseDetail.nationality"
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
              v-if="caseDetail"
              v-model="caseDetail.nationality_name"
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
      <v-row class="mx-0">
        <v-col class="mr-5">
          <v-row class="input-label">
            {{ $t('label.current_location') }}
          </v-row>
          <v-row>
            <v-text-field
              v-if="caseDetail"
              v-model="caseDetail.last_history.current_location_type"
              solo-inverted
              disabled
            />
          </v-row>
          <v-row class="input-label">
            {{ $t('label.address') }}
          </v-row>
          <v-row>
            <v-text-field
              v-if="caseDetail"
              v-model="caseDetail.last_history.current_location_address"
              solo-inverted
              disabled
            />
          </v-row>
          <v-row class="input-label">
            {{ $t('label.history') }}
          </v-row>
          <v-row>
            <v-text-field
              v-if="caseDetail"
              v-model="caseDetail.last_history.disaeses"
              solo-inverted
              disabled
            />
          </v-row>
          <v-row class="input-label">
            {{ $t('label.country_visited') }}
          </v-row>
          <v-row>
            <v-text-field
              v-if="caseDetail"
              v-model="caseDetail.last_history.visited_country"
              solo-inverted
              disabled
            />
          </v-row>
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
            {{ $t('label.date_of_beginning_symptoms') }}
          </v-row>
          <v-row>
            <v-text-field
              v-if="caseDetail"
              v-model="caseDetail.last_history.first_symptom_date"
              solo-inverted
              disabled
            />
          </v-row>
          <v-row class="input-label">
            {{ $t('label.symptoms') }}
          </v-row>
          <v-row>
            <v-text-field
              v-if="caseDetail"
              v-model="caseDetail.last_history.diagnosis"
              solo-inverted
              disabled
            />
          </v-row>
          <v-row class="input-label">
            {{ $t('label.postscript') }}
          </v-row>
          <v-row>
            <v-text-field
              v-if="caseDetail"
              v-model="caseDetail.last_history.other_notes"
              solo-inverted
              disabled
            />
          </v-row>
        </v-col>
      </v-row>
      <v-row class="mx-0">
        <v-col class="pa-0 mr-6">
          <v-btn
            color="grey"
            width="100%"
            outlined
            @click="onClose(false)"
          >
            <span class="input-label text-capitalize decline">{{ $t('label.decline') }}</span>
          </v-btn>
        </v-col>
        <v-col class="pa-0">
          <v-btn
            color="#2ead64"
            width="100%"
            @click="onClose(true)"
          >
            <span class="text-capitalize verify">{{ $t('label.verify_case') }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
import { formatDatetime } from '@/utils/parseDatetime'
export default {
  name: 'VerificationForm',
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
      show: false
    }
  },
  computed: {
    statusLabel() {
      return {
        'positif': this.caseDetail.status === 'POSITIF',
        'pdp': this.caseDetail.status === 'PDP',
        'odp': this.caseDetail.status === 'ODP',
        'otg': this.caseDetail.status === 'OTG'
      }
    }
  },
  watch: {
    showForm(value) {
      this.show = value
      if (value) {
        this.caseDetail = this.caseData
        if (this.caseDetail.birth_date) {
          this.caseDetail.birth_date = formatDatetime(this.caseDetail.birth_date, 'DD MMMM YYYY')
        }
        this.caseDetail.gender = this.caseDetail.gender === 'L' ? this.$t('label.male') : this.$t('label.female')
        if (this.caseDetail.last_history.current_location_type === 'RUMAH') {
          this.caseDetail.last_history.current_location_type = this.$t('label.home')
        } else if (this.caseDetail.last_history.current_location_type === 'RS') {
          this.caseDetail.last_history.current_location_type = this.$t('label.hospital')
        } else {
          this.caseDetail.last_history.current_location_type = this.$t('label.other')
        }
        if (this.caseDetail.last_history.first_symptom_date) {
          this.caseDetail.last_history.first_symptom_date = formatDatetime(this.caseDetail.last_history.first_symptom_date, 'DD MMMM YYYY')
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
        this.query = this.queryData
      }
    },
    show(value) {
      this.$emit('update:show', value)
    }
  },
  methods: {
    formatDatetime,
    onClose(isVerified) {
      this.query.id = this.caseDetail._id
      this.query.data.verified_status = isVerified ? 'verified' : 'declined'
      this.$emit('update:query', this.query)
      this.show = false
      this.$emit('update:showConfirmation', true)
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
</style>
