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
      <v-row>
        <v-col
          cols="12"
          md="6"
          sm="12"
        >
          <v-row class="row-detail">
            <v-col
              cols="12"
              md="6"
              sm="12"
              class="row-detail-label"
            >
              <label style="font-weight: bold;font-size: 20px;line-height: 20px;">
                {{ $t('label.test_mechanism') }}
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
              <label>{{ $t('label.category') }}</label>
            </v-col>
            <v-col auto>
              <v-text-field
                v-model="detailData.category"
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
              <label>{{ $t('label.mechanism') }}</label>
            </v-col>
            <v-col auto>
              <v-text-field
                v-model="detailData.mechanism"
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
              <label>{{ $t('label.goals') }}</label>
            </v-col>
            <v-col auto>
              <v-text-field
                v-model="detailData.target"
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
              <label style="font-weight: bold;font-size: 20px;line-height: 20px;">
                {{ $t('label.test_result') }}
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
              <label>{{ $t('label.implementation_date') }}</label>
            </v-col>
            <v-col auto>
              <v-text-field
                v-model="testDate"
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
              <label>{{ $t('label.test_place') }}</label>
            </v-col>
            <v-col auto>
              <v-text-field
                v-model="detailData.test_location"
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
              <label>{{ $t('label.name_test_place') }}</label>
            </v-col>
            <v-col auto>
              <v-text-field
                v-model="detailData.test_other_location"
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
                v-model="testAddres"
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
              <label>{{ $t('label.results') }}</label>
            </v-col>
            <v-col auto>
              <status :status="detailData.final_result" />
            </v-col>
          </v-row>
          <v-row class="row-detail">
            <v-col
              cols="12"
              md="3"
              sm="12"
              class="row-detail-label"
            >
              <label>{{ $t('label.type_test_tool') }}</label>
            </v-col>
            <v-col auto>
              <v-text-field
                v-model="detailData.tool_tester"
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
              <label>{{ $t('label.method_used') }}</label>
            </v-col>
            <v-col auto>
              <v-text-field
                v-model="detailData.test_method"
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
              <label>{{ $t('label.information') }}</label>
            </v-col>
            <v-col auto>
              <v-textarea
                v-model="detailData.test_note"
                disabled
                hide-details
                solo-inverted
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col auto>
          <v-row class="row-detail">
            <v-col
              cols="12"
              md="6"
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
              <label>{{ $t('label.participant_id') }}</label>
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
              <label>{{ $t('label.participant_name') }}</label>
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
              <label>{{ $t('label.age') }}</label>
            </v-col>
            <v-col auto>
              <v-text-field
                v-model="detailData.age"
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
          <v-row
            v-if="detailData.nationality === 'WNA'"
            class="row-detail"
          >
            <v-col
              cols="12"
              md="3"
              sm="12"
              class="row-detail-label"
            >
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
    </v-card>
    <v-card
      style="margin-top: 2rem;"
      outlined
    >
      <v-row>
        <v-col>
          <v-expansion-panels
            v-model="panelListRiwayat"
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header>{{ $t('label.test_history') }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <test-history-list
                  :list-history-test="listHistoryTest"
                />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
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
  name: 'ParticipantDetail',
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
      panelListRiwayat: [0],
      listHistoryTest: [],
      birthDate: '',
      testDate: '',
      detailGender: '',
      detailCase: '',
      detailData: '',
      detailAddres: '',
      testAddres: ''
    }
  },
  async mounted() {
    this.loadingBar = true
    const response = await this.$store.dispatch('rdt/detailParticipant', this.idData)
    if (response) this.loadingBar = false
    this.detailData = await response.data
    this.detailCase = await response.data.id_case ? response.data.id_case.toUpperCase() : ''
    if (this.detailData) {
      if (this.detailData.birth_date) {
        this.birthDate = await formatDatetime(this.detailData.birth_date, 'DD MMMM YYYY')
      }
      if (this.detailData.test_date) {
        this.testDate = await formatDatetime(this.detailData.test_date, 'DD MMMM YYYY')
      }
      this.detailGender = await this.detailData.gender === 'L' ? 'Laki-Laki' : 'Perempuan'
      this.detailAddres = this.completeAddress(
        this.detailData.address_district_name,
        this.detailData.address_subdistrict_name,
        this.detailData.address_village_name,
        this.detailData.address_street
      )
      this.testAddres = this.completeAddress(
        this.detailData.test_address_district_name,
        this.detailData.test_address_subdistrict_name,
        this.detailData.test_address_village_name,
        this.detailData.test_address_detail
      )
    }
  },
  methods: {
    formatDatetime,
    completeAddress,
    getTableRowNumbering(index) {
      return (index + 1)
    },
    backList() {
      this.$router.push('/rdt/list')
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
