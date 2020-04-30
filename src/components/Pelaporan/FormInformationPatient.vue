<template>
  <v-container>
    <ValidationObserver ref="observer">
      <v-form
        ref="form"
        lazy-validation
      >
        <v-row>
          <v-col
            cols="12"
            md="6"
            sm="12"
          >
            <ValidationProvider
              v-slot="{ errors }"
              rules="isHtml|sixteenDigits|numeric"
            >
              <label>{{ $t('label.nik') }}</label>
              <v-text-field
                v-model="formPasien.nik"
                type="number"
                :error-messages="errors"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
            >
              <v-label>{{ $t('label.related_case_name') }}</v-label>
              <v-autocomplete
                :no-data-text="$t('label.no_data_autocomplete_related_case')"
                :error-messages="errors"
                :items="listNameCases"
                :search-input.sync="searchRelatedCase"
                item-text="relateds"
                solo-inverted
                clearable
                return-object
                @change="handleChangeRelatedCase"
                @click:clear="clearListNameCases"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
            >
              <v-label>{{ $t('label.center_case_id') }}</v-label>
              <v-text-field
                v-model="formPasien.id_case_national"
                :error-messages="errors"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider>
              <v-label>{{ $t('label.profession') }}</v-label>
              <v-select
                v-model="formPasien.occupation"
                :items="occupationList"
                item-value="title"
                item-text="title"
                menu-props="auto"
                solo
              />
            </ValidationProvider>
            <ValidationProvider>
              <v-label>{{ $t('label.office_address') }}</v-label>
              <v-textarea
                v-model="formPasien.office_address"
                solo
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <label class="required">{{ $t('label.citizenship') }}</label>
              <v-radio-group
                v-model="formPasien.nationality"
                :error-messages="errors"
                row
                @change="handleChangeNationality"
              >
                <v-radio
                  :label="$t('label.wni')"
                  value="WNI"
                />
                <v-radio
                  :label="$t('label.wna')"
                  value="WNA"
                />
              </v-radio-group>
            </ValidationProvider>
            <ValidationProvider
              v-if="formPasien.nationality === 'WNA'"
              v-slot="{ errors }"
            >
              <v-autocomplete
                v-model="formPasien.nationality_name"
                :items="listCountry"
                item-text="name"
                item-value="name"
                :error-messages="errors"
                :placeholder="$t('label.country_origin')"
                clearable
                solo-inverted
              />
            </ValidationProvider>
          </v-col>
          <v-col
            cols="12"
            md="6"
            sm="12"
          >
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|isHtml"
            >
              <label class="required">{{ $t('label.name_case') }}</label>
              <v-text-field
                v-model="formPasien.name"
                :error-messages="errors"
                solo-inverted
              />
            </ValidationProvider>
            <label>{{ $t('label.birth_date') }}</label>
            <select-datetime
              :datetime="formPasien.birth_date"
              :date-time.sync="formPasien.birth_date"
              :formate-date="formatDate"
            />
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|numeric|isHtml"
            >
              <label class="required">{{ $t('label.age') }}</label>
              <v-text-field
                v-model="formPasien.age"
                :error-messages="errors"
                type="number"
                min="0"
                max="120"
                solo-inverted
                oninput="if(Number(this.value) > Number(this.max)) this.value = this.max;"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <label class="required">{{ $t('label.gender') }}</label>
              <v-radio-group
                v-model="formPasien.gender"
                :error-messages="errors"
                row
              >
                <v-radio
                  :label="$t('label.male')"
                  value="L"
                />
                <v-radio
                  :label="$t('label.female')"
                  value="P"
                />
              </v-radio-group>
            </ValidationProvider>
            <label class="required">{{ $t('label.address_home') }}</label>
            <address-region
              v-if="formPasien.address_district_name"
              :district-code="formPasien.address_district_code"
              :district-name="formPasien.address_district_name"
              :code-district.sync="formPasien.address_district_code"
              :name-district.sync="formPasien.address_district_name"
              :sub-district-code="formPasien.address_subdistrict_code"
              :sub-district-name="formPasien.address_subdistrict_name"
              :code-sub-district.sync="formPasien.address_subdistrict_code"
              :name-sub-district.sync="formPasien.address_subdistrict_name"
              :village-code="formPasien.address_village_code"
              :village-name="formPasien.address_village_name"
              :code-village.sync="formPasien.address_village_code"
              :name-village.sync="formPasien.address_village_name"
              :disabled-address="false"
              :required-address="true"
            />
            <ValidationProvider>
              <v-label>{{ $t('label.address_complete_home') }}</v-label>
              <v-textarea
                v-model="formPasien.address_street"
                solo
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|isPhoneNumber"
            >
              <label class="required">{{ $t('label.phone_number') }}n</label>
              <v-text-field
                v-model="formPasien.phone_number"
                :error-messages="errors"
                placeholder="08xxxxxxxxx"
                solo-inverted
                type="number"
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-container fluid>
          <v-row class="survey-bottom-form">
            <v-col>
              <v-btn
                color="success"
                bottom
                style="float: right;"
                @click="onNext"
              >
                {{ $t('label.continue') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </ValidationObserver>
    <dialog-duplicated-nik
      :show-dialog="showDuplicatedNikDialog"
      :nik-number="nikNumber"
      :nik-name="nikName"
      :nik-author="nikAuthor"
      :show.sync="showDuplicatedNikDialog"
    />
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import EventBus from '@/utils/eventBus'
import { getAge } from '@/utils/constantVariable'
import { mapGetters } from 'vuex'
export default {
  name: 'FormInformationPatient',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    steps: {
      type: Number,
      default: null
    },
    formPasien: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formatDate: 'YYYY/MM/DD',
      date: '',
      listCountry: [],
      listNameCases: [],
      listQuery: {
        'name': ''
      },
      searchRelatedCase: null,
      showDuplicatedNikDialog: false,
      nikNumber: null,
      nikName: null,
      nikAuthor: null
    }
  },
  computed: {
    ...mapGetters('user', [
      'fullName',
      'district_user',
      'district_name_user'
    ]),
    ...mapGetters('region', [
      'listDistrictCity'
    ]),
    ...mapGetters('occupation', [
      'occupationList'
    ])
  },
  watch: {
    'formPasien.birth_date': function(value) {
      this.formPasien.age = this.getAge(value)
    },
    async searchRelatedCase(value) {
      if (value) {
        this.listQuery.name = value
        const response = await this.$store.dispatch('reports/listNameCase', this.listQuery)
        this.listNameCases = response.data
      } else {
        this.listNameCases = []
      }
    }
  },
  async mounted() {
    const response = await this.$store.dispatch('region/listCountry')
    this.listCountry = response.data
  },
  async beforeMount() {
    await this.$store.dispatch('occupation/getListOccuption')
    this.formPasien.address_district_name = this.district_name_user
  },
  methods: {
    getAge,
    async onNext() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        const response = await this.$store.dispatch('reports/getNik', this.formPasien.nik)
        this.nikNumber = response.data.nik
        this.nikName = response.data.name
        this.nikAuthor = response.data.author.fullname
        this.showDuplicatedNikDialog = true
        return
      }
      await this.$store.dispatch('reports/resetRiwayatFormPasien')
      EventBus.$emit('nextSurveySteps', this.steps)
    },
    handleChangeNationality(value) {
      if (value === 'WNI') {
        this.formPasien.nationality_name = ''
      }
    },
    handleChangeRelatedCase(value) {
      this.formPasien.id_case_related = value.id_case
      this.formPasien.name_case_related = value.name
    },
    clearListNameCases() {
      this.listNameCases = []
    }
  }
}
</script>
