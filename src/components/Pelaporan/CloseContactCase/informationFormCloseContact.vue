<template>
  <div>
    <v-form
      ref="form"
      lazy-validation
    >
      <v-row align="start">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label class="required">{{ $t('label.nik') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|isHtml|sixteenDigits|numeric|provinceCode"
          >
            <v-text-field
              v-model="formBody.nik"
              type="number"
              :error-messages="errors"
              solo-inverted
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label class="required">{{ $t('label.name') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|isHtml"
          >
            <v-text-field
              v-model="formBody.name"
              :error-messages="errors"
              solo-inverted
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label class="required">{{ $t('label.phone_number') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider
            v-slot="{ errors }"
            rules="isPhoneNumber"
          >
            <v-text-field
              v-model="formBody.phone_number"
              :error-messages="errors"
              placeholder="08xxxxxxxxx"
              solo-inverted
              type="number"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label>{{ $t('label.birth_date') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <select-datetime
            :datetime="formBody.birth_date"
            :date-time.sync="formBody.birth_date"
            :formate-date="formatDate"
          />
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label class="required">{{ $t('label.age') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <v-row align="center" class="ma-0">
            <v-col cols="12" sm="6" class="pa-1">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|numeric|isHtml"
              >
                <v-text-field
                  v-model="formBody.yearsOld"
                  :error-messages="errors"
                  type="number"
                  min="0"
                  max="120"
                  solo-inverted
                  oninput="if(Number(this.value) > Number(this.max)) this.value = this.max"
                  class="input-append-btn"
                >
                  <template v-slot:append>
                    <v-btn
                      depressed
                      tile
                      min-width="20"
                    >
                      {{ $t('label.year') }}
                    </v-btn>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" class="pa-1">
              <ValidationProvider
                v-slot="{ errors }"
                rules="numeric|isHtml"
              >
                <v-text-field
                  v-model="formBody.monthsOld"
                  :error-messages="errors"
                  type="number"
                  min="0"
                  max="11"
                  solo-inverted
                  oninput="if(Number(this.value) > Number(this.max)) this.value = this.max"
                  class="input-append-btn"
                >
                  <template v-slot:append>
                    <v-btn
                      depressed
                      tile
                      min-width="20"
                    >
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
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label class="required">{{ $t('label.address_home') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <address-region
            :district-code="formBody.address_district_code"
            :district-name="formBody.address_district_name"
            :code-district.sync="formBody.address_district_code"
            :name-district.sync="formBody.address_district_name"
            :sub-district-code="formBody.address_subdistrict_code"
            :sub-district-name="formBody.address_subdistrict_name"
            :code-sub-district.sync="formBody.address_subdistrict_code"
            :name-sub-district.sync="formBody.address_subdistrict_name"
            :village-code="formBody.address_village_code"
            :village-name="formBody.address_village_name"
            :code-village.sync="formBody.address_village_code"
            :name-village.sync="formBody.address_village_name"
            :disabled-address="false"
            :required-address="true"
          />
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        />
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <v-row align="center" class="ma-0">
            <v-col cols="12" sm="6" class="pa-1">
              <ValidationProvider
                v-slot="{ errors }"
                rules="numeric|isHtml"
              >
                <v-text-field
                  v-model="formBody.address_rt"
                  :error-messages="errors"
                  type="number"
                  min="0"
                  max="8"
                  solo-inverted
                  oninput="if(Number(this.value) > Number(this.max)) this.value = this.max"
                  class="input-append-btn"
                >bi
                  <template v-slot:append>
                    <v-btn
                      depressed
                      tile
                      min-width="20"
                    >
                      {{ $t('label.rt') }}
                    </v-btn>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" sm="6" class="pa-1">
              <ValidationProvider
                v-slot="{ errors }"
                rules="numeric|isHtml"
              >
                <v-text-field
                  v-model="formBody.address_rw"
                  :error-messages="errors"
                  type="number"
                  min="0"
                  max="8"
                  solo-inverted
                  oninput="if(Number(this.value) > Number(this.max)) this.value = this.max"
                  class="input-append-btn"
                >
                  <template v-slot:append>
                    <v-btn
                      depressed
                      tile
                      min-width="20"
                    >
                      {{ $t('label.rw') }}
                    </v-btn>
                  </template>
                </v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        />
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider>
            <v-textarea
              v-model="formBody.address_street"
              solo
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col
          cols="12"
          md="3"
          sm="12"
          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
        >
          <label class="required">{{ $t('label.relationship_with_primary_cases') }}</label>
        </v-col>
        <v-col
          cols="12"
          md="9"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
        >
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|isHtml"
          >
            <v-text-field
              v-model="formBody.relationship"
              :error-messages="errors"
              solo-inverted
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start" class="pb-4">
        <v-col>
          <v-card outlined>
            <v-card-title class="font-weight-bold">
              Kontak Darurat
            </v-card-title>
            <v-divider />
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="3"
                  sm="12"
                  :class="{'py-0': $vuetify.breakpoint. smAndDown}"
                >
                  <label class="required">{{ $t('label.name') }}</label>
                </v-col>
                <v-col
                  cols="12"
                  md="9"
                  sm="12"
                  :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
                >
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required|isHtml"
                  >
                    <v-text-field
                      v-model="formBody.emergency_contact_name"
                      :error-messages="errors"
                      solo-inverted
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  md="3"
                  sm="12"
                  :class="{'py-0': $vuetify.breakpoint. smAndDown}"
                >
                  <label class="required">{{ $t('label.phone_number') }}</label>
                </v-col>
                <v-col
                  cols="12"
                  md="9"
                  sm="12"
                  :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
                >
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="isPhoneNumber"
                  >
                    <v-text-field
                      v-model="formBody.emergency_contact_phone"
                      :error-messages="errors"
                      placeholder="08xxxxxxxxx"
                      solo-inverted
                      type="number"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  md="3"
                  sm="12"
                  :class="{'py-0': $vuetify.breakpoint. smAndDown}"
                >
                  <label>Hubungan Dengan Kontak</label>
                </v-col>
                <v-col
                  cols="12"
                  md="9"
                  sm="12"
                  :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
                >
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="isHtml"
                  >
                    <v-text-field
                      v-model="formBody.emergency_contact_relationship"
                      :error-messages="errors"
                      solo-inverted
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
import { getAgeWithMonth } from '@/utils/constantVariable'

export default {
  name: 'InformationFormCloseContact',
  components: {
    ValidationProvider
  },
  props: {
    formBody: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formatDate: 'YYYY/MM/DD'
    }
  },
  watch: {
    'formBody.birth_date': function(value) {
      if (value.length > 0) {
        const age = this.getAgeWithMonth(value)
        this.formBody.yearsOld = age.year
        this.formBody.monthsOld = age.month
        this.formBody.age = Number((this.formBody.yearsOld + (this.formBody.monthsOld / 12)).toFixed(2))
      }
    },
    'formBody.yearsOld'(value) {
      if (this.formBody.monthsOld !== '') {
        this.formBody.age = Number((Number(this.formBody.yearsOld) + (Number(this.formBody.monthsOld) / 12)).toFixed(2))
      } else {
        this.formBody.age = Number(this.formBody.yearsOld)
      }
    },
    'formBody.monthsOld'(value) {
      if (this.formBody.yearsOld !== '') {
        this.formBody.age = Number((Number(this.formBody.yearsOld) + (Number(this.formBody.monthsOld) / 12)).toFixed(2))
      }
    }
  },
  methods: {
    getAgeWithMonth
  }
}
</script>
