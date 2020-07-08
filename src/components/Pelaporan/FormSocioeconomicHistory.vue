<template>
  <v-container fluid>
    <ValidationObserver ref="observer">
      <v-card outlined>
        <v-row align="center" justify="space-between">
          <v-col>
            <div class="title ml-4">
              {{ $t('label.form_socioeconomic_title') }}
            </div>
          </v-col>
        </v-row>
        <hr class="table-divider">
        <v-container fluid>
          <v-row align="center">
            <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
              <label>{{ $t('label.physical_activity') }}</label>
            </v-col>
            <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
              <ValidationProvider>
                <v-radio-group v-model="formPasien.pysichal_activity" row>
                  <v-row v-for="itemPhysicalActivity in listPhysicalActivity" :key="itemPhysicalActivity.value">
                    <v-col cols="12" md="12" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                      <v-radio :label="itemPhysicalActivity.text" :value="itemPhysicalActivity.value" />
                    </v-col>
                  </v-row>
                </v-radio-group>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
              <label>{{ $t('label.smoking') }}</label>
            </v-col>
            <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
              <ValidationProvider>
                <v-container>
                  <v-row>
                    <v-radio-group v-model="formPasien.smoking" row>
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
              <label>{{ $t('label.consume_alcohol') }}</label>
            </v-col>
            <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
              <ValidationProvider>
                <v-container>
                  <v-row>
                    <v-radio-group v-model="formPasien.consume_alcohol" row>
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
              <label>{{ $t('label.income') }}</label>
            </v-col>
            <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
              <ValidationProvider>
                <v-container>
                  <v-row>
                    <v-radio-group v-model="formPasien.income" row>
                      <span v-for="(item, index) in incomeList" :key="index">
                        <v-radio :label="item.text" :value="item.value" />
                      </span>
                    </v-radio-group>
                  </v-row>
                </v-container>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </ValidationObserver>
  </v-container>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { answerList, listPhysicalActivity, incomeList } from '@/utils/constantVariable'
export default {
  name: 'FormSocioeconomicHistory',
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
      formatDate: 'YYYY/MM/DD',
      answerList: answerList,
      listPhysicalActivity: listPhysicalActivity,
      incomeList: incomeList
    }
  }
}
</script>
