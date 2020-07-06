<template>
  <v-dialog v-model="show" max-width="80%">
    <v-card>
      <v-card-title>
        {{ titleDetail }}
        <v-spacer />
        <v-icon @click="show = false">mdi-close</v-icon>
      </v-card-title>
      <div class="warning-background">
        <v-card
          class="ma-4"
          outlined
          min-height="90px"
        >
          <div
            class="ml-10 mt-6"
          >
            <div style="font-weight: bold;font-size: 16px;">
              {{ $t('label.rejection_note') }}
            </div>
            <div>
              ID Kasus Primer/Kasus Terkait:
            </div>
          </div>
        </v-card>
      </div>
      <v-container>
        <v-expansion-panels
          v-model="closeContactIdentity"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header>
              {{ $t('label.close_contact_identity') }}
            </v-expansion-panel-header>
            <v-divider />
            <v-expansion-panel-content>
              <information-form-close-contact
                :form-body="formBody"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'DialogCreateCloseContact',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    titleDetail: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: this.showDialog,
      closeContactIdentity: [0],
      formBody: {},
      dialogDecline: false,
      refreshPageList: false
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
  methods: {
    //
  }
}
</script>
<style scoped>
  .warning-background {
    background-image: url('../../../static/warning_icon.svg')
  }
  .border-card {
    color: #828282;
    border: 1px dashed #E0E0E0 !important;
    box-sizing: border-box !important;
    border-radius: 8px !important;
  }
</style>
