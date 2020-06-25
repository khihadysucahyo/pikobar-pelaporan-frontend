<template>
  <v-dialog v-model="show" max-width="60%">
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <div class="popup-detail-case-title ml-2">{{ titleDetail }}</div>
          </v-col>
        </v-row>
        <v-row>
          <v-tabs
            v-model="tab"
            background-color="#F5F5F5"
            centered
            hide-slider
            class="tab-detail-case"
          >
            <v-tab href="#tab-1">
              <v-icon class="mr-2">mdi-account</v-icon>
              {{ $t('label.rdt_participant_detail') }}
            </v-tab>

            <v-tab href="#tab-2">
              <v-icon class="mr-2">library_books</v-icon>
              {{ $t('label.rdt_history_test') }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="i in 2" :key="i" :value="'tab-' + i" style="min-width: 100%">
              <v-card v-if="tab === 'tab-1'">
                <v-container>
                  <participant-detail :title-detail="title" :id-data="detailTest._id" />
                </v-container>
              </v-card>
              <v-card v-if="tab === 'tab-2'">
                <v-container>
                  <v-card outlined>tab 2</v-card>
                </v-container>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogDetailTest',
  props: {
    showDialogDetailTest: {
      type: Boolean,
      default: false
    },
    titleDetail: {
      type: String,
      default: ''
    },
    detailTest: {
      type: Object,
      default: null
    },
    listHistoryTest: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      title: 'Daftar Peserta',
      tab: null,
      show: this.showDialogDetailTest
    }
  },
  watch: {
    showDialogDetailTest(value) {
      this.show = value
    },
    show(value) {
      this.$emit('update:show', value)
    }
  }
}
</script>
<style scoped>
.v-window.v-item-group.v-tabs-items {
  min-width: 100%;
}
.tab-detail-case {
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  border-radius: 8px;
}
.v-tab {
  width: 50% !important;
  color: #828282 !important;
}
.v-tab--active {
  background: #27ae60 !important;
  border-radius: 8px !important;
  color: #ffffff !important;
}
.popup-detail-case-title {
  font-weight: bold;
  font-size: 16px;
  color: #333333;
}
</style>
