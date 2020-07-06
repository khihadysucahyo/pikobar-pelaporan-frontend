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
            <ValidationProvider>
              <v-radio-group v-model="formPasien.physical_activity" row>
                <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                  <v-row>
                    <v-col cols="12" md="12" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                      <v-radio :label="$t('label.sedentary')" value="ya" />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="12" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                      <v-radio :label="$t('label.more_physical_exercise')" value="ya" />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="12" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
                      <v-radio :label="$t('label.less_physical_exercise')" value="ya" />
                    </v-col>
                  </v-row>
                </v-col>
              </v-radio-group>
            </ValidationProvider>
          </v-row>
          <v-row align="center">
            <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
              <label>{{ $t('label.smoke') }}</label>
            </v-col>
            <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
              <ValidationProvider>
                <v-radio-group v-model="formPasien.smoke" row>
                  <v-radio :label="$t('label.yes')" value="ya" />
                  <v-radio :label="$t('label.no')" value="tidak" />
                  <v-radio :label="$t('label.dont_know')" value="tidak_tahu" />
                </v-radio-group>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
              <label>{{ $t('label.consumption_of_alcoholic_drink') }}</label>
            </v-col>
            <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
              <ValidationProvider>
                <v-radio-group v-model="formPasien.consumption_of_alcoholic_drink" row>
                  <v-radio :label="$t('label.yes')" value="ya" />
                  <v-radio :label="$t('label.no')" value="tidak" />
                  <v-radio :label="$t('label.dont_know')" value="tidak_tahu" />
                </v-radio-group>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
              <label>{{ $t('label.income') }}</label>
            </v-col>
            <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
              <ValidationProvider>
                <v-radio-group v-model="formPasien.consumption_of_alcoholic_drink" row>
                  <v-radio label="< 1 Juta" value="ya" />
                  <v-radio label="1 s/d 3 Juta" value="tidak" />
                  <v-radio label="> 3 s/d 5 Juta" value="tidak_tahu" />
                  <v-radio label="> 5 Juta" value="tidak_tahu" />
                  <v-radio label="Tidak Berpenghasilan" value="tidak_tahu" />
                </v-radio-group>
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
      formatDate: 'YYYY/MM/DD'
    }
  }
}
</script>
