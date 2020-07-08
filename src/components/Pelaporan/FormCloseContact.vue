<template>
  <v-container fluid>
    <ValidationObserver ref="observer">
      <v-card outlined>
        <v-row align="center" justify="space-between">
          <v-col>
            <div class="title ml-4">
              {{ $t('label.form_close_contact_title') }}
            </div>
          </v-col>
        </v-row>
        <hr class="table-divider">
        <div v-for="(data, index) in formPasien.close_contact_patient" :key="index">
          <v-container fluid>
            <v-card outlined>
              <v-row align="center" justify="space-between">
                <v-col cols="12" md="6" sm="12">
                  <div class="title ml-4">
                    {{ `${$t('label.form_contact_data_title')} ${index+1}` }}
                  </div>
                </v-col>
                <v-col cols="12" md="6" sm="12">
                  <v-btn class="ma-2 float-right" tile outlined small color="red" @click="handleDeleteFormCloseContact(index)">
                    <v-icon left>mdi-delete</v-icon> Hapus
                  </v-btn>
                </v-col>
              </v-row>
              <hr class="table-divider">
              <v-container fluid>
                <v-form ref="form" lazy-validation>
                  <v-row align="start">
                    <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                      <label class="required">{{ $t('label.name') }}</label>
                    </v-col>
                    <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                      <ValidationProvider v-slot="{ errors }" rules="required|isHtml">
                        <v-text-field v-model="data.name" :error-messages="errors" solo-inverted />
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                  <v-row align="start">
                    <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                      <label>{{ $t('label.phone_number') }}</label>
                    </v-col>
                    <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                      <ValidationProvider v-slot="{ errors }" rules="isPhoneNumber">
                        <v-text-field v-model="data.phone_number" :error-messages="errors" placeholder="08xxxxxxxxx" solo-inverted type="number" />
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                      <label>{{ $t('label.gender') }}</label>
                    </v-col>
                    <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                      <ValidationProvider>
                        <v-radio-group v-model="data.gender" row>
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
                          <label>{{ $t('label.year') }}</label>
                          <ValidationProvider>
                            <!--Todo: sesuaikan nama parameter dengan nama parameter api-->
                            <v-text-field v-model="data.years_old" type="number" min="0" max="120" solo-inverted oninput="if(Number(this.value) > Number(this.max)) this.value = this.max" />
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="6" class="pa-1">
                          <label>{{ $t('label.month') }}</label>
                          <ValidationProvider>
                            <!--Todo: sesuaikan nama parameter dengan nama parameter api-->
                            <v-text-field v-model="data.months_old" type="number" min="0" max="11" solo-inverted oninput="if(Number(this.value) > Number(this.max)) this.value = this.max" />
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row align="start">
                    <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                      <label>{{ $t('label.address') }}</label>
                    </v-col>
                    <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                      <ValidationProvider>
                        <v-textarea v-model="data.address" solo :placeholder="$t('label.complete_address')" />
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                  <v-row align="start">
                    <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                      <label>{{ $t('label.relationship_with_primary_cases') }}</label>
                    </v-col>
                    <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                      <ValidationProvider>
                        <v-text-field v-model="data.related" solo-inverted />
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                  <v-row align="start">
                    <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                      <label>{{ $t('label.activities_carried_out') }}</label>
                    </v-col>
                    <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                      <ValidationProvider>
                        <v-text-field v-model="data.activity" solo-inverted />
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                  <v-row align="start">
                    <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                      <label>{{ $t('label.contact_date') }}</label>
                    </v-col>
                    <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                      <input-date-picker :format-date="formatDate" :label="$t('label.contact_date')" :date-value="data.contact_date" :value-date.sync="data.contact_date" @changeDate="handeChangeContactDate($event, index)" />
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card>
          </v-container>
        </div>
        <v-container fluid>
          <v-card outlined class="text-center" color="#F5F5F5">
            <v-btn class="ma-2 mt-5" outlined small fab @click="handleAddFormCloseContact">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <p>Tambah Data Kontak</p>
          </v-card>
        </v-container>
      </v-card>
    </ValidationObserver>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'FormCloseContact',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    formPasien: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isAddCloseContactForm: false,
      totalCloseContact: 0,
      idCloseContactForm: 0,
      isValid: false,
      showAlert: false,
      formatDate: 'YYYY/MM/DD'
    }
  },
  mounted() {
    this.handleAddFormCloseContact()
  },
  methods: {
    handleAddFormCloseContact() {
      this.isValid = true
      this.showAlert = false
      this.idCloseContactForm = this.idCloseContactForm + 1
      this.formPasien.close_contact_patient.push({
        id: this.idCloseContactForm,
        name: '',
        phone_number: '',
        gender: '',
        years_old: '',
        months_old: '',
        address: '',
        related: '',
        activity: '',
        contact_date: ''
      })
    },
    handleDeleteFormCloseContact(index) {
      this.formPasien.close_contact_patient.splice(index, 1)
      if (this.formPasien.close_contact_patient.length === 0) {
        this.isValid = false
      }
    },
    handeChangeContactDate(value, index) {
      this.formPasien.close_contact_patient[index].contact_date = value
    }
  }
}
</script>
