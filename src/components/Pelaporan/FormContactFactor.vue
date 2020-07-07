<template>
  <v-container fluid>
    <ValidationObserver ref="observer">
      <v-card outlined>
        <v-row align="center" justify="space-between">
          <v-col>
            <div class="title ml-4">
              {{ $t('label.form_eposure_factor_title') }}
            </div>
          </v-col>
        </v-row>
        <hr class="table-divider">
        <v-container fluid>
          <v-form ref="form" lazy-validation>
            <v-row align="center">
              <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                <label>{{ $t('label.travel_history') }}</label>
              </v-col>
              <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <v-radio-group v-model="formPasien.travel_history" :error-messages="errors" row>
                    <v-radio :label="$t('label.from_out_of_country')" value="LUAR NEGERI" />
                    <v-radio :label="$t('label.from_out_of_city')" value="LUAR KOTA" />
                  </v-radio-group>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row v-if="formPasien.travel_history === 'LUAR NEGERI'" align="start">
              <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
              <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <v-text-field v-model="formPasien.country_visited" :error-messages="errors" type="text" solo-inverted :placeholder="$t('label.country_visited')" />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row v-if="formPasien.travel_history === 'LUAR KOTA'" align="start">
              <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
              <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <v-text-field v-model="formPasien.city_visited" :error-messages="errors" type="text" solo-inverted :placeholder="$t('label.city_visited')" />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row v-if="formPasien.travel_history === 'LUAR NEGERI' || formPasien.travel_history === 'LUAR KOTA'" align="start">
              <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                <label class="required">{{ $t('label.date_of_departure') }}</label>
              </v-col>
              <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <input-date-picker :format-date="formatDate" :error-messages="errors" :label="$t('label.date_of_departure')" :date-value="formPasien.date_of_departure" :value-date.sync="formPasien.date_of_departure" />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row v-if="formPasien.travel_history === 'LUAR NEGERI' || formPasien.travel_history === 'LUAR KOTA'" align="start">
              <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                <label class="required">{{ $t('label.date_of_return') }}</label>
              </v-col>
              <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <input-date-picker :format-date="formatDate" :error-messages="errors" :label="$t('label.date_of_return')" :date-value="formPasien.date_of_return" :value-date.sync="formPasien.date_of_return" />
                </ValidationProvider>
              </v-col>
            </v-row>

            <v-row align="center">
              <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                <label>{{ $t('label.closely_contact_with_suspect_cases') }}</label>
              </v-col>
              <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                <ValidationProvider>
                  <v-container>
                    <v-row>
                      <v-radio-group v-model="formPasien.closelyContactWithSuspectCases" row>
                        <span v-for="(item, index) in answerList" :key="index">
                          <v-radio :label="item.text" :value="item.value" />
                        </span>
                      </v-radio-group>
                    </v-row>
                  </v-container>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row v-if="formPasien.closely_contact_with_suspect_cases === 'YES'" align="start">
              <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
              <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <v-text-field v-model="formPasien.name_suspect_patient" :error-messages="errors" type="text" solo-inverted :placeholder="$t('label.enter_name_suspect_patient')" />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                <label>{{ $t('label.closely_contact_with_confirmed_cases') }}</label>
              </v-col>
              <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                <ValidationProvider>
                  <v-container>
                    <v-row>
                      <v-radio-group v-model="formPasien.closelyContactWithConfirmedCases" row>
                        <span v-for="(item, index) in answerList" :key="index">
                          <v-radio :label="item.text" :value="item.value" />
                        </span>
                      </v-radio-group>
                    </v-row>
                  </v-container>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                <label>{{ $t('label.visit_animal_market') }}</label>
              </v-col>
              <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                <ValidationProvider>
                  <v-container>
                    <v-row>
                      <v-radio-group v-model="formPasien.visitAnimalMarket" row>
                        <span v-for="(item, index) in answerList" :key="index">
                          <v-radio :label="item.text" :value="item.value" />
                        </span>
                      </v-radio-group>
                    </v-row>
                  </v-container>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                <label>{{ $t('label.visit_public_place') }}</label>
              </v-col>
              <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                <ValidationProvider>
                  <v-container>
                    <v-row>
                      <v-radio-group v-model="formPasien.visit_public_place" row>
                        <span v-for="(item, index) in answerList" :key="index">
                          <v-radio :label="item.text" :value="item.value" />
                        </span>
                      </v-radio-group>
                    </v-row>
                  </v-container>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                <label>{{ $t('label.visit_health_facility') }}</label>
              </v-col>
              <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                <ValidationProvider>
                  <v-container>
                    <v-row>
                      <v-radio-group v-model="formPasien.visitHealthFacility" row>
                        <span v-for="(item, index) in answerList" :key="index">
                          <v-radio :label="item.text" :value="item.value" />
                        </span>
                      </v-radio-group>
                    </v-row>
                  </v-container>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                <label>{{ $t('label.heavy_ispa_group') }}</label>
              </v-col>
              <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                <ValidationProvider>
                  <v-container>
                    <v-row>
                      <v-radio-group v-model="formPasien.heavyIspaGroup" row>
                        <span v-for="(item, index) in answerList" :key="index">
                          <v-radio :label="item.text" :value="item.value" />
                        </span>
                      </v-radio-group>
                    </v-row>
                  </v-container>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                <label>{{ $t('label.health_worker') }}</label>
              </v-col>
              <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                <ValidationProvider>
                  <v-container>
                    <v-row>
                      <v-radio-group v-model="formPasien.healthWorker" row>
                        <span v-for="(item, index) in answerList" :key="index">
                          <v-radio :label="item.text" :value="item.value" />
                        </span>
                      </v-radio-group>
                    </v-row>
                  </v-container>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row align="start">
              <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
                <label>{{ $t('label.protective_equipment_used') }}</label>
              </v-col>
              <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                <ValidationProvider v-slot="{ errors }">
                  <v-row>
                    <v-col v-for="item in apdList" :key="item" sm="4" md="4">
                      <label class="material-checkbox-custom">
                        <input v-model="formPasien.diagnosis" :value="item" type="checkbox">
                        <span v-if="errors.length" class="error--text">{{ item }}</span>
                        <span v-else>{{ item }}</span>
                      </label>
                      <span v-if="errors.length" class="v-messages error--text">{{ errors[0] }}</span>
                    </v-col>
                  </v-row>
                </ValidationProvider>
              </v-col>
            </v-row>
            <br>
          </v-form>
        </v-container>
      </v-card>
    </ValidationObserver>
  </v-container>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { answerList } from '@/utils/constantVariable'
import { apd } from '@/utils/constantVariable'
export default {
  name: 'FormContactFactor',
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
      apdList: apd,
      formatDate: 'YYYY/MM/DD',
      answerList: answerList
    }
  }
}
</script>
