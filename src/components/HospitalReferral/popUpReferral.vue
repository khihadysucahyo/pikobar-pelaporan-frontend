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
              @click="closeData"
            >
              {{ $t('label.canceled') }}
            </v-btn>
            <v-btn
              color="primary"
              style="height: 40px;min-width: 120px;"
              @click="onHandleSave"
            >
              {{ $t('label.short_reference').toUpperCase() }}
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <dialog-refferal
      :show-dialog="dialogReferral"
      :show.sync="dialogReferral"
      :title-detail="$t('label.detail_case')"
    />
  </v-row>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { mapGetters } from 'vuex'
import { ResponseRequest } from '@/utils/constantVariable'
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
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialogReferral: false
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
      await this.$emit('update:referralForm', {})
    },
    async onHandleSave() {
      if (this.patientRegistered) {
        const data = {
          id: this.formReferral.case_id,
          data: {
            transfer_to_unit_id: this.formReferral.transfer_to_unit._id,
            transfer_to_unit_name: this.formReferral.transfer_to_unit.name
          }
        }
        const response = await this.$store.dispatch('reports/caseHospitalRefferal', data)
        if (response.status !== ResponseRequest.UNPROCESSABLE) {
          await this.$emit('update:dialogPopup', false)
          await this.$emit('update:referralForm', {})
        } else {
          await this.$emit('update:dialogPopup', false)
          await this.$emit('update:referralForm', {})
          this.dialogReferral = true
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
