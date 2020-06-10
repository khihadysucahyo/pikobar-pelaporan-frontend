<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogPopUp"
      persistent
      max-width="440px"
    >
      <v-card>
        <div class="justify-center dialog-img-delete">
          <img src="@/static/hospital_reference_1.svg">
        </div>
        <v-card-title class="justify-center">
          <div class="font-weight-bold" style="font-size: 16px">
            Pasien Terdata Di [Nama RS-nya]
          </div>
        </v-card-title>
        <v-container>
          <ValidationObserver ref="observer">
            <v-form
              ref="form"
              lazy-validation
            >
              <v-row>
                <v-col>
                  <label>NIK</label>
                  <ValidationProvider
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="formReferral"
                      :error-messages="errors"
                      solo-inverted
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <label>Rumah Sakit Rujukan</label>
                  <ValidationProvider
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      v-model="formReferral"
                      :error-messages="errors"
                      solo-inverted
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-form>
          </ValidationObserver>
        </v-container>
        <v-card-actions>
          <v-col class="text-right">
            <v-btn
              class="mr-5"
              style="height: 40px;min-width: 120px;"
              @click="dialogPopUp = false"
            >
              {{ $t('label.canceled') }}
            </v-btn>
            <v-btn
              color="primary"
              style="height: 40px;min-width: 120px;"
            >
              RUJUK
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'PopUpReferral',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    formReferral: {
      type: Array,
      default: null
    }
  },
  computed: {
    dialogPopUp: {
      get() {
        return this.dialog
      },
      set(val) {
        this.$emit('update:dialogPopUp', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
