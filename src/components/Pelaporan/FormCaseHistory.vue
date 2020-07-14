<template>
  <v-container fluid>
    <v-form ref="form" lazy-validation>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label class="required">{{ $t('label.criteria') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-radio-group v-model="formPasien.status" :error-messages="errors" row>
              <v-radio :label="$t('label.OTG')" value="OTG" />
              <v-radio :label="$t('label.ODP')" value="ODP" />
              <v-radio :label="$t('label.PDP')" value="PDP" />
              <v-radio :label="$t('label.positif').toUpperCase()" value="POSITIF" />
            </v-radio-group>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label class="required">{{ $t('label.stages') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-radio-group v-model="formPasien.stage" :error-messages="errors" row>
              <v-radio :label="$t('label.process')" value="0" />
              <v-radio :label="$t('label.done')" value="1" />
            </v-radio-group>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row v-if="formPasien.stage === '1'" align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.results') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }">
            <v-radio-group v-model="formPasien.final_result" :error-messages="errors" row>
              <v-radio v-if="formPasien.status !== 'POSITIF'" :label="$t('label.negatif')" value="0" @click.prevent="uncheck('0')" />
              <v-radio :label="$t('label.recovery')" value="1" @click.prevent="uncheck('1')" />
              <v-radio :label="$t('label.dead')" value="2" @click.prevent="uncheck('2')" />
            </v-radio-group>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label class="required">{{ $t('label.current_location') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-radio-group v-model="formPasien.current_location_type" :error-messages="errors" row @change="handleChangeLocationNow">
              <v-radio :label="$t('label.home')" value="RUMAH" />
              <v-radio :label="$t('label.hospital')" value="RS" />
              <v-radio :label="$t('label.other_places')" value="others" />
            </v-radio-group>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row v-if="formPasien.current_location_type === 'RUMAH'" align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-radio-group v-model="formPasien.according_address" :error-messages="errors" row @change="handleChangeAccordingAddress">
              <v-radio :label="$t('label.according_address')" value="1" />
              <v-radio :label="$t('label.doesnt_according_address')" value="0" />
            </v-radio-group>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row v-if="formPasien.current_location_type === 'RUMAH'" align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label class="grey--text font-italic">({{ $t('label.house_address') }})</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <address-region :district-code="formPasien.current_location_district_code" :code-district.sync="formPasien.current_location_district_code" :sub-district-code="formPasien.current_location_subdistrict_code" :code-sub-district.sync="formPasien.current_location_subdistrict_code" :village-code="formPasien.current_location_village_code" :village-name="formPasien.current_location_village_name" :code-village.sync="formPasien.current_location_village_code" :name-village.sync="formPasien.current_location_village_name" :disabled-address="false" :required-address="true" />
        </v-col>
      </v-row>
      <v-row v-if="formPasien.current_location_type === 'RUMAH'" align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label class="grey--text font-italic">({{ $t('label.complete_house_address') }})</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-text-field v-model="formPasien.current_location_address" :error-messages="errors" solo-inverted />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row v-if="formPasien.current_location_type === 'RS'" align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label class="grey--text font-italic">({{ $t('label.location_hospital') }})</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-autocomplete
              v-model="formPasien.current_location_address"
              :items="hospitalWestJavaList"
              :error-messages="errors"
              :return-object="true"
              :label="$t('label.location_hospital')"
              menu-props="auto"
              item-text="name"
              item-value="name"
              single-line
              solo
              autocomplete
              @change="onSelectHospital"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row v-if="formPasien.current_location_type === 'others'" align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label class="grey--text font-italic">({{ $t('label.other_places') }})</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-if="formPasien.current_location_type === 'others'" v-slot="{ errors }" rules="required">
            <v-autocomplete
              v-model="formPasien.current_location_address"
              :items="hospitalNonWestJavaList"
              :error-messages="errors"
              :return-object="true"
              :label="$t('label.others')"
              menu-props="auto"
              item-text="name"
              item-value="name"
              single-line
              solo
              autocomplete
              @change="onSelectHospital"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label :class="formPasien.status !== 'OTG' ? 'required' : ''">{{ $t('label.date_symptoms') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <input-date-picker
            :format-date="formatDate"
            :required="true"
            :date-value="formPasien.first_symptom_date"
            :value-date.sync="formPasien.first_symptom_date"
            @changeDate="formPasien.first_symptom_date = $event"
          />
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
          <label :class="formPasien.status !== 'OTG' ? 'required' : ''">{{ $t('label.symptoms') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider v-slot="{ errors }" :rules="formPasien.status !== 'OTG' ? 'required' : ''">
            <v-row>
              <v-col v-for="item in symptomOptions" :key="item" cols="6" sm="6" md="4">
                <label class="material-checkbox-custom">
                  <input v-model="formPasien.diagnosis" :value="item" type="checkbox">
                  <span v-if="errors.length" class="error--text">{{ item }}</span>
                  <span v-else>{{ item }}</span>
                </label>
              </v-col>
            </v-row>
            <span v-if="errors.length" class="v-messages error--text">{{ errors[0] }}</span>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="start" class="mt-4">
        <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-text-field v-model="formPasien.diagnosis_other" :placeholder="$t('label.mention_other_symptoms')" solo-inverted />
          </ValidationProvider>
        </v-col>
      </v-row>
    </v-form>
    <v-row align="start">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
        <label>{{ $t('label.additional_condition') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider v-slot="{ errors }">
          <v-row>
            <v-col v-for="item in additionalConditionOptions" :key="item" cols="6" sm="6" md="4">
              <label class="material-checkbox-custom">
                <input v-model="formPasien.diseases" :value="item" type="checkbox">
                <span v-if="errors.length" class="error--text">{{ item }}</span>
                <span v-else>{{ item }}</span>
              </label>
            </v-col>
          </v-row>
          <span v-if="errors.length" class="v-messages error--text">{{ errors[0] }}</span>
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row align="start" class="mt-4">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-text-field v-model="formPasien.diseases_other" :placeholder="$t('label.mention_other_additional_condition')" solo-inverted />
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
        <label>{{ $t('label.diagnosis_ards') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-container>
            <v-row>
              <v-radio-group v-model="formPasien.diagnosis_ards" row>
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
        <label>{{ $t('label.diagnosis_covid') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-container>
            <v-row>
              <v-radio-group v-model="formPasien.diagnosis_covid" row>
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
        <label>{{ $t('label.diagnosis_pneumonia') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-container>
            <v-row>
              <v-radio-group v-model="formPasien.diagnosis_pneumonia" row>
                <span v-for="(item, index) in answerList" :key="index">
                  <v-radio :label="item.text" :value="item.value" />
                </span>
              </v-radio-group>
            </v-row>
          </v-container>
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row align="start" class="mt-4">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}" />
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-text-field v-model="formPasien.other_diagnosis" :placeholder="$t('label.mention_other_additional_condition')" solo-inverted />
        </ValidationProvider>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="3" sm="12" :class="{'py-0': $vuetify.breakpoint. smAndDown}">
        <label>{{ $t('label.serum_check') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-container>
            <v-row>
              <v-radio-group v-model="formPasien.serum_check" row>
                <span v-for="(item, index) in yesOrNoAnswer" :key="index">
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
        <label>{{ $t('label.sputum_check') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-container>
            <v-row>
              <v-radio-group v-model="formPasien.sputum_check" row>
                <span v-for="(item, index) in yesOrNoAnswer" :key="index">
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
        <label>{{ $t('label.swab_check') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <ValidationProvider>
          <v-container>
            <v-row>
              <v-radio-group v-model="formPasien.swab_check" row>
                <span v-for="(item, index) in yesOrNoAnswer" :key="index">
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
        <label>{{ $t('label.physical_check') }}</label>
      </v-col>
      <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
        <v-row align="center" class="ma-0">
          <v-col cols="12" sm="4" class="pa-1">
            <ValidationProvider>
              <v-text-field v-model="formPasien.physical_check_temperature" class="input-append-btn" type="number" solo-inverted :placeholder="$t('label.temperature')">
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    &#778;C
                  </v-btn>
                </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="4" class="pa-1">
            <ValidationProvider>
              <v-text-field v-model="formPasien.physical_check_blood_pressure" class="input-append-btn" type="number" solo-inverted :placeholder="$t('label.blood_pressure')">
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    mmHg
                  </v-btn>
                </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="4" class="pa-1">
            <ValidationProvider>
              <v-text-field v-model="formPasien.physical_check_pulse" class="input-append-btn" type="number" solo-inverted :placeholder="$t('label.pulse')">
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    {{ $t('label.x_minute') }}
                  </v-btn>
                </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row align="center" class="ma-0">
          <v-col cols="12" sm="4" class="pa-1">
            <ValidationProvider>
              <v-text-field v-model="formPasien.physical_check_respiration" class="input-append-btn" type="number" solo-inverted :placeholder="$t('label.respiration')">
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    {{ $t('label.x_minute') }}
                  </v-btn>
                </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="4" class="pa-1">
            <ValidationProvider>
              <v-text-field v-model="formPasien.physical_check_height" class="input-append-btn" type="text" solo-inverted :placeholder="$t('label.height')">
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    Cm
                  </v-btn>
                </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="4" class="pa-1">
            <ValidationProvider>
              <v-text-field v-model="formPasien.physical_check_weight" class="input-append-btn" type="text" solo-inverted :placeholder="$t('label.weight')">
                <template v-slot:append>
                  <v-btn depressed tile min-width="20">
                    Kg
                  </v-btn>
                </template>
              </v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
import { symptomOptions, additionalConditionOptions, answerList, yesOrNoAnswer } from '@/utils/constantVariable'
import { mapGetters } from 'vuex'
export default {
  name: 'FormCaseHistory',
  components: {
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
      loading: false,
      symptomOptions: symptomOptions,
      formatDate: 'YYYY/MM/DD',
      disabledReportResource: false,
      hospitalWestJavaList: [],
      hospitalNonWestJavaList: [],
      additionalConditionOptions: additionalConditionOptions,
      answerList: answerList,
      yesOrNoAnswer: yesOrNoAnswer
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles',
      'fullName'
    ])
  },
  async mounted() {
    this.formPasien.diagnosis_ards = 2
    this.formPasien.diagnosis_covid = 2
    this.formPasien.diagnosis_pneumonia = 2
    this.formPasien.serum_check = 0
    this.formPasien.sputum_check = 0
    this.formPasien.swab_check = 0
    const paramHospitalWestJava = { 'rs_jabar': true }
    const paramHospitalNonWestJava = { 'rs_jabar': false }
    const responseWestJava = await this.$store.dispatch('region/getListHospital', paramHospitalWestJava)
    this.hospitalWestJavaList = responseWestJava.data
    const responseNonWestJava = await this.$store.dispatch('region/getListHospital', paramHospitalNonWestJava)
    this.hospitalNonWestJavaList = responseNonWestJava.data
    if (this.roles[0] === 'faskes') {
      this.formPasien.report_source = this.fullName
      this.disabledReportResource = true
    }
  },
  methods: {
    onSelectHospital(value) {
      this.formPasien.current_hospital_id = value._id
      this.formPasien.current_location_address = value.name
    },
    uncheck(value) {
      if (value === this.formPasien.final_result) {
        this.formPasien.final_result = ''
      } else {
        this.formPasien.final_result = value
      }
    },
    handleChangeLocationNow(value) {
      if (value === 'RUMAH') {
        this.formPasien.current_location_address = ''
      } else {
        this.formPasien.current_hospital_id = ''
        this.formPasien.current_location_address = ''
        this.formPasien.current_location_district = ''
        this.formPasien.current_location_subdistrict = ''
        this.formPasien.current_location_village = ''
      }
    },
    handleChangeAccordingAddress(value) {
      if (value === '1') {
        this.formPasien.current_location_district_code = this.formPasien.address_district_code
        this.formPasien.current_location_subdistrict_code = this.formPasien.address_subdistrict_code
        this.formPasien.current_location_village_code = this.formPasien.address_village_code
        this.formPasien.current_location_village_name = this.formPasien.address_village_name
        this.formPasien.current_location_address = this.formPasien.address_street
      } else {
        this.formPasien.current_location_district_code = ''
        this.formPasien.current_location_subdistrict_code = ''
        this.formPasien.current_location_village_code = ''
        this.formPasien.current_location_village_name = ''
        this.formPasien.current_location_address = ''
      }
    }
  }
}
</script>
