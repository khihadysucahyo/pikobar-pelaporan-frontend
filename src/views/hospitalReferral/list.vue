<template>
  <div>
    <v-card class="d-block pa-1 mx-auto header-application-logistic">
      <v-row class="mt-2">
        <v-col auto>
          <v-card-text>
            <div class="header-user-title">{{ $t('label.make_referrals_for_patients') }}</div>
            <div class="header-user-text">{{ $t('label.choose_one_below') }}</div>
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
          <v-tab @click="onTabChanges('pending,declined')">{{ tabLabel[0] }}</v-tab>
          <v-tab @click="onTabChanges('pending')">{{ tabLabel[1] }}</v-tab>
          <v-tab @click="onTabChanges('declined')">{{ tabLabel[2] }}</v-tab>
          <v-tab @click="onTabChanges('received')">{{ tabLabel[3] }}</v-tab>
          <v-tab-item v-for="(tabItem, index) in tabLabel" :key="index">
            <v-container>
              <v-row>
                <verification-table-referral
                  :list-referral="listReferral"
                  :table-headers="headers"
                  :list-query="listQuery"
                />
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ListHospitalReferral',
  data() {
    return {
      listQuery: {
        verified_status: null
      },
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
        { text: this.$t('label.nik').toUpperCase(), value: 'id_case' },
        { text: this.$t('label.name').toUpperCase(), value: 'name' },
        { text: this.$t('label.age').toUpperCase(), value: 'age' },
        { text: this.$t('label.short_gender_abbreviation'), value: 'gender' },
        { text: this.$t('label.status').toUpperCase(), value: 'phone_number' },
        { text: this.$t('label.stages').toUpperCase(), value: 'status' },
        { text: this.$t('label.results').toUpperCase(), value: 'stage' },
        { text: this.$t('label.reference').toUpperCase(), value: 'final_result' },
        { text: this.$t('label.reference_status').toUpperCase(), value: 'author' },
        { text: this.$t('label.action').toUpperCase(), value: 'actions', sortable: false }
      ]
    }
  },
  methods: {
    onTabChanges(value) {
      this.listQuery.verified_status = value
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
