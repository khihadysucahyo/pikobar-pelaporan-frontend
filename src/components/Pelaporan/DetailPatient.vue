<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        md="6"
        sm="12"
        class="row-detail-label"
      >
        <div style="font-size: 1.5rem;">
          {{ titleDetail }}
        </div>
      </v-col>
      <v-col
        cols="12"
        md="6"
        sm="12"
      >
        <v-btn
          color="success"
          bottom
          style="float: right;"
          @click="backList"
        >
          {{ $t('label.back_to_list') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-card
      outlined
    >
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
          class="row-detail-label"
        >
          <label style="font-weight: bold;font-size: 20px;line-height: 20px;">
            {{ $t('label.case_id') }}
          </label>
        </v-col>
        <v-col auto />
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
          class="row-detail-label"
        >
          <label>{{ $t('label.case_id') }}</label>
        </v-col>
        <v-col auto>
          <v-text-field
            v-model="detailCase"
            disabled
            hide-details
            solo-inverted
          />
        </v-col>
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
          class="row-detail-label"
        >
          <label>{{ $t('label.related_case_id') }}</label>
        </v-col>
        <v-col auto>
          <v-text-field
            v-model="detailData.id_case_related"
            disabled
            hide-details
            solo-inverted
          />
        </v-col>
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
          class="row-detail-label"
        >
          <label>{{ $t('label.center_case_id') }}</label>
        </v-col>
        <v-col auto>
          <v-text-field
            v-model="detailData.id_case_national"
            disabled
            hide-details
            solo-inverted
          />
        </v-col>
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
          class="row-detail-label"
        >
          <label style="font-weight: bold;font-size: 20px;line-height: 20px;">
            {{ $t('label.identity') }}
          </label>
        </v-col>
        <v-col auto />
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
          class="row-detail-label"
        >
          <label>{{ $t('label.nik') }}</label>
        </v-col>
        <v-col auto>
          <v-text-field
            v-model="detailData.nik"
            disabled
            hide-details
            solo-inverted
          />
        </v-col>
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
          class="row-detail-label"
        >
          <label>{{ $t('label.name_case') }}</label>
        </v-col>
        <v-col auto>
          <v-text-field
            v-model="detailData.name"
            disabled
            hide-details
            solo-inverted
          />
        </v-col>
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
          class="row-detail-label"
        >
          <label>{{ $t('label.birth_date') }}</label>
        </v-col>
        <v-col auto>
          <v-text-field
            v-model="birthDate"
            disabled
            hide-details
            solo-inverted
          />
        </v-col>
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
          class="row-detail-label"
        >
          <label>{{ $t('label.gender') }}</label>
        </v-col>
        <v-col auto>
          <v-text-field
            v-model="detailGender"
            disabled
            hide-details
            solo-inverted
          />
        </v-col>
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
          class="row-detail-label"
        >
          <label>{{ $t('label.address') }}</label>
        </v-col>
        <v-col auto>
          <v-textarea
            v-model="detailAddres"
            disabled
            hide-details
            solo-inverted
          />
        </v-col>
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
          class="row-detail-label"
        >
          <label>{{ $t('label.phone_number') }}</label>
        </v-col>
        <v-col auto>
          <v-text-field
            v-model="detailData.phone_number"
            disabled
            hide-details
            solo-inverted
          />
        </v-col>
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="6"
          sm="12"
          class="row-detail-label"
        >
          <v-row>
            <v-col>
              <label>{{ $t('label.citizenship') }}</label>
            </v-col>
            <v-col auto>
              <v-text-field
                v-model="detailData.nationality"
                disabled
                hide-details
                solo-inverted
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
          md="6"
          sm="12"
          class="row-detail-label"
        >
          <v-row v-if="detailData.nationality === 'WNA'">
            <v-col>
              <label>{{ $t('label.country') }}</label>
            </v-col>
            <v-col auto>
              <v-text-field
                v-model="detailData.nationality_name"
                disabled
                hide-details
                solo-inverted
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
          class="row-detail-label"
        >
          <label style="font-weight: bold;font-size: 20px;line-height: 20px;">
            {{ $t('label.profession') }}
          </label>
        </v-col>
        <v-col auto />
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
          class="row-detail-label"
        >
          <label>{{ $t('label.profession') }}</label>
        </v-col>
        <v-col auto>
          <v-text-field
            v-model="detailData.occupation"
            disabled
            hide-details
            solo-inverted
          />
        </v-col>
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
          class="row-detail-label"
        >
          <label>{{ $t('label.office_address') }}</label>
        </v-col>
        <v-col auto>
          <v-textarea
            v-model="detailData.office_address"
            disabled
            hide-details
            solo-inverted
          />
        </v-col>
      </v-row>
    </v-card>
    <v-card
      style="margin-top: 2rem;"
      outlined
    >
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
    <loading-bar
      :loading="loadingBar"
    />
  </div>
</template>

<script>
import { formatDatetime } from '@/utils/parseDatetime'
import { completeAddress } from '@/utils/utilsFunction'

export default {
  name: 'DetailPatient',
  props: {
    titleDetail: {
      type: String,
      default: null
    },
    idData: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loadingBar: false,
      listHistoryCase: null,
      panelListRiwayat: [0],
      birthDate: '',
      detailGender: '',
      detailCase: '',
      detailData: '',
      detailAddres: ''
    }
  },
  async mounted() {
    this.loadingBar = true
    const response = await this.$store.dispatch('reports/detailReportCase', this.idData)
    if (response) this.loadingBar = false
    const responseHistory = await this.$store.dispatch('reports/listHistoryCase', this.idData)
    this.listHistoryCase = responseHistory.data
    this.detailData = await response.data
    this.detailCase = await response.data.id_case.toUpperCase()
    if (this.detailData) {
      if (this.detailData.birth_date) {
        this.birthDate = await formatDatetime(this.detailData.birth_date, 'DD-MM-YYYY')
      }
      this.detailGender = await this.detailData.gender === 'L' ? 'Laki-Laki' : 'Perempuan'
      this.detailAddres = this.completeAddress(
        this.detailData.address_district_name,
        this.detailData.address_subdistrict_name,
        this.detailData.address_village_name,
        this.detailData.address_street
      )
    }
  },
  methods: {
    formatDatetime,
    completeAddress,
    backList() {
      this.$router.push('/laporan/list')
    }
  }
}
</script>

<style scoped>
.row-detail {
  padding-left: 2rem;
  padding-right: 2rem;
}
.row-detail-label {
  margin: auto;
}
</style>
