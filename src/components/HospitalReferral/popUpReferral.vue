<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogPopup"
      persistent
      :max-width="patientRegistered ? '380px':'980px'"
    >
      <v-card>
        <v-card-title class="justify-center">
          <img src="@/static/hospital_reference_1.svg">
        </v-card-title>
        <v-card-title class="justify-center">
          <div class="font-weight-bold" style="font-size: 16px">
            {{ patientRegistered ? `${ $t('label.patients_recorded_at') } ${fullName}`:`${ $t('label.patients_not_yet_recorded_in') } ${fullName}` }}
          </div>
        </v-card-title>
        <v-container>
          <ValidationObserver ref="observer">
            <div v-if="patientRegistered">
              <form-patient-registered
                :form-referral="formReferral"
              />
            </div>
            <div v-else>
              <form-patient-unregistered />
            </div>
          </ValidationObserver>
        </v-container>
        <v-card-actions>
          <v-col class="text-right">
            <v-btn
              class="mr-5"
              style="height: 40px;min-width: 120px;"
              @click="dialogPopup = false"
            >
              {{ $t('label.canceled') }}
            </v-btn>
            <v-btn
              color="primary"
              style="height: 40px;min-width: 120px;"
              @click="closeData"
            >
              {{ $t('label.short_reference').toUpperCase() }}
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { mapGetters } from 'vuex'

export default {
  name: 'PopUpReferral',
  components: {
    ValidationObserver
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    patientRegistered: {
      type: Boolean,
      default: false
    },
    formReferral: {
      type: Array,
      default: null
    }
  },
  computed: {
    dialogPopup: {
      get() {
        return this.dialog
      },
      set(val) {
        this.$emit('update:dialogPopup', val)
      }
    },
    ...mapGetters('user', [
      'fullName'
    ])
  },
  methods: {
    async closeData() {
      await this.$emit('update:dialogPopup', false)
    }
  }
}
</script>

<style scoped>

</style>
