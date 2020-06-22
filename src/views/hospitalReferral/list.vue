<template>
  <div>
    <v-card class="d-block pa-1 mx-auto header-application-logistic">
      <v-row class="mt-2">
        <v-col auto>
          <v-card-text>
            <div class="header-user-title">{{ $t('label.total_list_referral_patients') }} : {{ summaryReferral }}</div>
            <div class="header-user-text">{{ fullName }}</div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
    <v-card>
      <v-row class="mx-0 mt-5">
        <v-tabs
          v-model="tab"
          class="elevation-2"
          background-color="white"
          active-class="active-class"
          color="red"
          hide-slider
        >
          <v-tab @click="onTabChanges('')">{{ tabLabel[0] }}</v-tab>
          <v-tab @click="onTabChanges('pending')">{{ tabLabel[1] }}</v-tab>
          <v-tab @click="onTabChanges('declined')">{{ tabLabel[2] }}</v-tab>
          <v-tab @click="onTabChanges('approved')">{{ tabLabel[3] }}</v-tab>
          <v-tab-item v-for="(tabItem, index) in tabLabel" :key="index">
            <v-row>
              <v-col class="ml-4">
                <search
                  :list-query="listQuery"
                  :handle-search="handleSearch"
                />
              </v-col>
              <v-col class="pb-4">
                <v-btn
                  color="primary"
                  class="mr-4"
                  style="float: right;"
                  @click="handleFilter"
                >
                  {{ $t('label.filter') }}
                  <v-icon v-if="!showFilter">mdi-chevron-right</v-icon>
                  <v-icon v-else>mdi-chevron-down</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row
              v-if="showFilter"
              class="ma-2"
            >
              <filter-hospital-referral
                :list-query="listQuery"
                :on-search="handleSearch"
              />
            </v-row>
            <v-row>
              <verification-table-referral
                :list-referral="listReferral"
                :table-headers="headers"
                :list-query="listQuery"
              />
            </v-row>
          </v-tab-item>
        </v-tabs>
      </v-row>
    </v-card>
    <pagination
      :total="totalList"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :on-next="handleSearch"
    />
  </div>
</template>

<script>
import EventBus from '@/utils/eventBus'
import { mapGetters } from 'vuex'
export default {
  name: 'ListHospitalReferral',
  data() {
    return {
      listQuery: {
        search: '',
        transfer_from_unit_id: '',
        address_district_code: '',
        address_subdistrict_code: '',
        address_village_code: '',
        status: '',
        final_result: '',
        createdAt: '',
        transfer_status: null,
        page: 1,
        limit: 100
      },
      totalList: 0,
      showFilter: false,
      summaryReferral: 0,
      listReferral: [],
      tab: null,
      tabLabel: [
        this.$t('label.all'),
        this.$t('label.waiting_for_verification'),
        this.$t('label.patient_rejected'),
        this.$t('label.reference_received')
      ],
      headers: [
        { text: this.$t('label.number').toUpperCase(), value: '_id', sortable: false },
        { text: this.$t('label.nik').toUpperCase(), value: 'case.id_case' },
        { text: this.$t('label.name').toUpperCase(), value: 'case.name' },
        { text: this.$t('label.age').toUpperCase(), value: 'case.age' },
        { text: this.$t('label.short_gender_abbreviation'), value: 'case.gender' },
        { text: this.$t('label.status').toUpperCase(), value: 'case.status' },
        { text: this.$t('label.stages').toUpperCase(), value: 'case.stages' },
        { text: this.$t('label.reference').toUpperCase(), value: 'transfer_from_unit_name' },
        { text: this.$t('label.reference_status').toUpperCase(), value: 'transfer_status' },
        { text: this.$t('label.action').toUpperCase(), value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    ...mapGetters('user', [
      'fullName',
      'unitType'
    ])
  },
  watch: {
    'listQuery.search'() {
      this.handleSearch()
    }
  },
  async mounted() {
    EventBus.$on('refreshPageListReferral', (value) => {
      if (value) {
        this.handleSearch()
      }
    })
    this.handleSearch()
    this.handleSummary()
  },
  methods: {
    async handleSearch() {
      let data
      if (this.unitType === 'rumahsakit') {
        data = {
          type: 'in',
          params: this.listQuery
        }
      } else {
        data = {
          type: 'out',
          params: this.listQuery
        }
      }
      const response = await this.$store.dispatch('reports/caseHospitalReferralInOut', data)

      this.listReferral = response.data.cases
      this.totalList = response.data._meta.totalPages
    },
    async handleSummary() {
      let data
      if (this.unitType === 'rumahsakit') {
        data = {
          type: 'in'
        }
      } else {
        data = {
          type: 'out'
        }
      }
      const response = await this.$store.dispatch('reports/caseHospitalReferralSummary', data)
      if (response) {
        this.summaryReferral = response.data.PENDING + response.data.DECLINED + response.data.APPROVED
      }
    },
    handleFilter() {
      this.showFilter = !this.showFilter
    },
    onTabChanges(value) {
      this.showFilter = false
      const ids = this.headers.length
      if (this.unitType === 'rumahsakit' && value === 'declined') {
        this.headers.splice(9, 1)
      } else if (ids === 9) {
        this.headers.push(
          { text: this.$t('label.action').toUpperCase(), value: 'actions', sortable: false }
        )
      }
      this.listQuery.transfer_status = value
      this.handleSearch()
    }
  }
}
</script>

<style scoped type="scss">
  .header-application-logistic {
    background: linear-gradient(82.33deg, #27AE60 0%, #58DA8F 100%);
  }
  .header-user-text {
    font-size: 14px;
    color: #FFFFFF;
  }
  .header-user-title {
    font-size: 26px;
    color: #FFFFFF;
    margin-bottom: 10px;
  }
</style>
