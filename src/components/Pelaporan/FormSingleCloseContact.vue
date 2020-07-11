<template>
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
                <v-text-field v-model="formCloseContact.name" :error-messages="errors" solo-inverted />
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row align="start">
            <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
              <label class="required">{{ $t('label.phone_number') }}</label>
            </v-col>
            <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
              <ValidationProvider v-slot="{ errors }" rules="required|isPhoneNumber">
                <v-text-field v-model="formCloseContact.phone_number" :error-messages="errors" placeholder="08xxxxxxxxx" solo-inverted type="number" />
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
              <label class="required">{{ $t('label.gender') }}</label>
            </v-col>
            <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
              <ValidationProvider v-slot="{ errors }" rules="required">
                <v-radio-group v-model="formCloseContact.gender" :error-messages="errors" row>
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
                    <v-text-field v-model="formCloseContact.age" type="number" min="0" max="120" solo-inverted oninput="if(Number(this.value) > Number(this.max)) this.value = this.max" class="input-append-btn">
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
                    <v-text-field v-model="formCloseContact.month" type="number" min="0" max="11" solo-inverted oninput="if(Number(this.value) > Number(this.max)) this.value = this.max" class="input-append-btn">
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
                <v-textarea v-model="formCloseContact.address_street" solo :placeholder="$t('label.complete_address')" :error-messages="errors" />
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row align="start">
            <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
              <label class="required">{{ $t('label.relationship_with_primary_cases') }}</label>
            </v-col>
            <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
              <ValidationProvider v-slot="{ errors }" rules="required|isHtml">
                <v-text-field v-model="formCloseContact.relationship" type="text" solo-inverted :error-messages="errors" />
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row align="start">
            <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
              <label class="required">{{ $t('label.activities_carried_out') }}</label>
            </v-col>
            <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
              <ValidationProvider v-slot="{ errors }" rules="required|isHtml">
                <v-text-field v-model="formCloseContact.activity" type="text" solo-inverted :error-messages="errors" />
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row align="start">
            <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
              <label class="required">{{ $t('label.contact_date') }}</label>
            </v-col>
            <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
              <ValidationProvider v-slot="{ errors }">
                <input-date-picker :format-date="formatDate" :error-messages="errors" :label="$t('label.contact_date')" :date-value="formCloseContact.contact_date" :value-date.sync="formCloseContact.contact_date" @changeDate="handleChangeContactDate($event)" />
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-form>
      </ValidationObserver>
    </v-container>
  </v-row>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  name: 'FormSingleCloseContact',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    formCloseContact: {
      type: Object,
      default: null
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formatDate: 'YYYY/MM/DD'
    }
  },
  methods: {
    handleChangeContactDate(value) {
      this.formCloseContact.contact_date = value
    }
  }
}
</script>
