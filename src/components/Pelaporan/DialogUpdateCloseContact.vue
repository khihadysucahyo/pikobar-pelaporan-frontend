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
        <v-row>
          <v-container fluid>
            <ValidationObserver ref="observer">
              <v-form ref="form" lazy-validation>
                <v-row align="start">
                  <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                    <label class="required">{{ $t('label.name') }}</label>
                  </v-col>
                  <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                    <ValidationProvider v-slot="{ errors }" rules="required|isHtml">
                      <v-text-field v-model="formUpdateCloseContact.name" :error-messages="errors" solo-inverted />
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <v-row align="start">
                  <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                    <label class="required">{{ $t('label.phone_number') }}</label>
                  </v-col>
                  <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                    <ValidationProvider v-slot="{ errors }" rules="required|isPhoneNumber">
                      <v-text-field v-model="formUpdateCloseContact.phone_number" :error-messages="errors" placeholder="08xxxxxxxxx" solo-inverted type="number" />
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                    <label class="required">{{ $t('label.gender') }}</label>
                  </v-col>
                  <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <v-radio-group v-model="formUpdateCloseContact.gender" :error-messages="errors" row>
                        <v-radio :label="$t('label.male')" value="L" />
                        <v-radio :label="$t('label.female')" value="P" />
                      </v-radio-group>
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <v-row align="start">
                  <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                    <label>{{ $t('label.age') }}</label>
                  </v-col>
                  <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                    <v-row align="center" class="ma-0">
                      <v-col cols="12" sm="6" class="pa-1">
                        <ValidationProvider>
                          <v-text-field v-model="formUpdateCloseContact.age" type="number" min="0" max="120" solo-inverted oninput="if(Number(this.value) > Number(this.max)) this.value = this.max" class="input-append-btn">
                            <template v-slot:append>
                              <v-btn depressed tile min-width="20">
                                {{ $t('label.year') }}
                              </v-btn>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12" sm="6" class="pa-1">
                        <ValidationProvider>
                          <v-text-field v-model="formUpdateCloseContact.month" type="number" min="0" max="11" solo-inverted oninput="if(Number(this.value) > Number(this.max)) this.value = this.max" class="input-append-btn">
                            <template v-slot:append>
                              <v-btn depressed tile min-width="20">
                                {{ $t('label.month') }}
                              </v-btn>
                            </template>
                          </v-text-field>
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row align="start">
                  <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                    <label class="required">{{ $t('label.address') }}</label>
                  </v-col>
                  <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                    <ValidationProvider v-slot="{ errors }" rules="required|isHtml">
                      <v-textarea v-model="formUpdateCloseContact.address_street" solo :placeholder="$t('label.complete_address')" :error-messages="errors" />
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <v-row align="start">
                  <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                    <label class="required">{{ $t('label.relationship_with_primary_cases') }}</label>
                  </v-col>
                  <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                    <ValidationProvider v-slot="{ errors }" rules="required|isHtml">
                      <v-text-field v-model="formUpdateCloseContact.relationship" type="text" solo-inverted :error-messages="errors" />
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <v-row align="start">
                  <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                    <label class="required">{{ $t('label.activities_carried_out') }}</label>
                  </v-col>
                  <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                    <ValidationProvider v-slot="{ errors }" rules="required|isHtml">
                      <v-text-field v-model="formUpdateCloseContact.activity" type="text" solo-inverted :error-messages="errors" />
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <v-row align="start">
                  <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                    <label class="required">{{ $t('label.contact_date') }}</label>
                  </v-col>
                  <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                    <ValidationProvider v-slot="{ errors }">
                      <input-date-picker :format-date="formatDate" :error-messages="errors" :label="$t('label.contact_date')" :date-value="formUpdateCloseContact.contact_date" :value-date.sync="formUpdateCloseContact.contact_date" @changeDate="handleChangeContactDate($event, index)" />
                    </ValidationProvider>
                  </v-col>
                </v-row>
                <v-container fluid>
                  <v-row>
                    <v-col class="text-right">
                      <v-btn
                        :loading="loading"
                        bottom
                        @click="handleBack"
                      >
                        {{ $t('label.cancel') }}
                      </v-btn>
                      <v-btn
                        :loading="loading"
                        class="ml-2"
                        color="success"
                        bottom
                        @click="handleSave"
                      >
                        {{ $t('label.save') }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </ValidationObserver>
          </v-container>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import EventBus from '@/utils/eventBus'
export default {
  name: 'DialogUpdateCloseContact',
  components: {
    ValidationObserver,
    ValidationProvider
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
    idCloseContact: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showFormUpdateCloseContact: this.showDialogUpdateCloseContact,
      loading: false,
      formatDate: 'YYYY/MM/DD'
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
      const updateFinalCloseContact = {
        id: this.formUpdateCloseContact._id,
        data: this.formUpdateCloseContact
      }
      const response = await this.$store.dispatch('reports/updateCloseContact', updateFinalCloseContact)
      this.loading = false
      if (response && (response.status === 200 || response.status === 201)) {
        await this.$store.dispatch('closeContactCase/resetStateCloseContactCase')
        await this.$store.dispatch('toast/successToast', this.$t('success.data_success_edit'))
      } else {
        await this.$store.dispatch('toast/errorToast', this.$t('error.data_failed_edit'))
      }
      this.$emit('update:showFormUpdateCloseContact', false)
      EventBus.$emit('refreshPageListReport', true)
    },
    handleChangeContactDate(value, index) {
      this.formUpdateCloseContact.contact_date = value
    }
  }
}
</script>
