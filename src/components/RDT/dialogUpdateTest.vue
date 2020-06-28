<template>
  <v-dialog v-model="show" max-width="70%">
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <div class="title ml-2">{{ titleDetail }}</div>
          </v-col>
        </v-row>
        <v-row>
          <v-card class="mt-5 pa-7 ml-5 mr-5" outlined width="100%">
            <h4 class="font-weight-bold section-title">{{ $t('label.rdt_participant_detail') }}</h4>
            <v-divider />
            <participant-detail :title-detail="titleDetail" :id-data="idHistoryTest" />
          </v-card>
          <v-card class="mt-5 pa-7 ml-5 mr-5" outlined width="100%">
            <h4 class="font-weight-bold section-title">{{ $t('label.test_results') }}</h4>
            <v-divider />
            <update-result-form :id-result="idHistoryTest" @closeDialog="handleCloseDialog" />
          </v-card>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import EventBus from '@/utils/eventBus'
export default {
  name: 'DialogUpdateTest',
  props: {
    showDialogUpdateTest: {
      type: Boolean,
      default: false
    },
    titleDetail: {
      type: String,
      default: ''
    },
    idHistoryTest: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      show: this.showDialogUpdateTest
    }
  },
  watch: {
    showDialogUpdateTest(value) {
      this.show = value
    },
    show(value) {
      this.$emit('update:show', value)
    }
  },
  methods: {
    handleCloseDialog(value) {
      if (value) {
        this.$emit('update:show', false)
        EventBus.$emit('refreshPageListTest', true)
      }
    }
  }
}
</script>
<style scoped>
.section-title {
  color: #43a047;
}
</style>
