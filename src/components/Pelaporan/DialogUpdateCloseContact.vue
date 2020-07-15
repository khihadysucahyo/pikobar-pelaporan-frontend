<template>
  <v-dialog v-model="showFormUpdateCloseContact" max-width="70%">
    <v-card>
      <v-container>
        <v-card-title>
          {{ titleDetail }}
          <v-spacer />
          <v-icon @click="showFormUpdateCloseContact = false">mdi-close</v-icon>
        </v-card-title>
        <v-divider />
        <ValidationObserver ref="observer">
          <v-form ref="form" lazy-validation>
            <form-single-close-contact :form-close-contact="formUpdateCloseContact" :is-edit="isEdit" />
          </v-form>
        </ValidationObserver>
        <v-row>
          <v-container fluid>
            <v-row>
              <v-col class="text-right">
                <v-btn :loading="loading" bottom @click="handleBack">{{ $t('label.cancel') }}</v-btn>
                <v-btn :loading="loading" class="ml-2" color="success" bottom @click="handleSave">{{ $t('label.save') }}</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import EventBus from '@/utils/eventBus'
export default {
  name: 'DialogUpdateCloseContact',
  components: {
    ValidationObserver
  },
  props: {
    showDialogUpdateCloseContact: {
      type: Boolean,
      default: false
    },
    titleDetail: {
      type: String,
      default: ''
    },
    formUpdateCloseContact: {
      type: Object,
      default: null
    },
    idCase: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showFormUpdateCloseContact: this.showDialogUpdateCloseContact,
      loading: false,
      formatDate: 'YYYY/MM/DD',
      isEdit: true
    }
  },
  watch: {
    showDialogUpdateCloseContact(value) {
      this.showFormUpdateCloseContact = value
    },
    showFormUpdateCloseContact(value) {
      this.$emit('update:showFormUpdateCloseContact', value)
    }
  },
  methods: {
    handleBack(value) {
      if (value) {
        this.$emit('update:showFormUpdateCloseContact', false)
      }
    },
    async handleSave() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      this.loading = true
      delete this.formUpdateCloseContact['latest_history']
      const updateFinalCloseContact = {
        id: this.formUpdateCloseContact._id,
        data: this.formUpdateCloseContact
      }
      const response = await this.$store.dispatch('reports/updateCloseContact', updateFinalCloseContact)
      this.loading = false
      if (response.status === 200 || response.status === 201) {
        await this.$store.dispatch('closeContactCase/resetStateCloseContactCase')
        await this.$store.dispatch('toast/successToast', this.$t('success.data_success_edit'))
      } else {
        await this.$store.dispatch('toast/errorToast', this.$t('errors.data_failed_edit'))
      }
      this.$emit('update:showFormUpdateCloseContact', false)
      EventBus.$emit('refreshPageListCloseContact', true)
    }
  }
}
</script>
