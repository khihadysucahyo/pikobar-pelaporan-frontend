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
            <div class="popup-detail-case-title ml-2">
              {{ titleDetail }}
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-tabs
            v-model="tab"
            background-color="#F5F5F5"
            centered
            style="margin-left: 1.5rem;margin-right: 1.5rem;"
          >
            <v-tab href="#tab-1">
              {{ $t('label.detail_profile_history') }}
            </v-tab>

            <v-tab href="#tab-2">
              {{ $t('label.case_history') }}
            </v-tab>

            <v-tab href="#tab-3">
              {{ $t('label.referral_history') }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item
              v-for="i in 3"
              :key="i"
              :value="'tab-' + i"
              style="min-width: 100%"
            >
              <v-card v-if="tab === 'tab-1'">
                <detail-case
                  :detail-case="detailCase"
                />
              </v-card>
              <v-card v-if="tab === 'tab-2'">
                <v-container>
                  <v-card
                    outlined=""
                  >
                    <case-history-list
                      :list-history-case="listHistoryCase"
                    />
                  </v-card>
                </v-container>
              </v-card>
              <v-card v-if="tab === 'tab-3'">
                <v-container>
                  <v-card
                    outlined=""
                  >
                    <case-history-list
                      :list-history-case="listHistoryCase"
                    />
                  </v-card>
                </v-container>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-row>
        <v-row
          v-if="userUnitType === 'rumahsakit' && detailTransfer.transfer_status !== 'approved'"
          class="ma-2"
        >
          <v-col
            auto
          >
            <v-btn
              color="#EB5757"
              outlined
              block
            >
              <span style="color: #EB5757;">{{ $t('label.reject_reference') }}</span>
            </v-btn>
          </v-col>
          <v-col
            auto
          >
            <v-btn
              color="primary"
              block
              @click="handleApprove"
            >
              <span>{{ $t('label.receive_references') }}</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'PopUpDetailCaseReferral',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    titleDetail: {
      type: String,
      default: ''
    },
    userUnitType: {
      type: String,
      default: null
    },
    detailTransfer: {
      type: Object,
      default: null
    },
    detailCase: {
      type: Object,
      default: null
    },
    listHistoryCase: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      tab: null,
      show: this.showDialog
    }
  },
  watch: {
    showDialog(value) {
      this.show = value
    },
    show(value) {
      this.$emit('update:show', value)
    }
  },
  mounted() {
    console.log(this.detailTransfer)
  },
  methods: {
    async handleApprove() {
      const data = {
        idCase: this.detailCase._id,
        idTransfer: this.detailTransfer._id,
        actions: 'approve',
        body: {
          transfer_comment: null
        }
      }
      const response = await this.$store.dispatch('reports/actionHospitalReferral', data)
      if (response) {
        this.$emit('update:caseDetail', {})
        this.$emit('update:transferDetail', {})
        this.$emit('update:show', false)
        await this.$store.dispatch('toast/successToast', this.$t('success.reference_successfully_verified'))
      }
    }
  }
}
</script>
<style scoped>
    .v-window.v-item-group.v-tabs-items {
      min-width: 100%;
    }
    .v-tab {
        width: 35% !important;
        color: #828282 !important;
    }
    .v-tab--active {
        background: #27AE60 !important;
        border-radius: 8px !important;
        color: #FFFFFF !important;
    }
    .popup-detail-case-title {
        font-weight: bold;
        font-size: 16px;
        color: #333333;
    }
</style>>
