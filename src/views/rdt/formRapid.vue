<template>
  <v-container>
    <h4 class="font-weight-bold" style="color:#43A047">{{ $t('label.participant_search') }}</h4>
    <v-divider />
    <ValidationObserver ref="observer">
      <v-form
        ref="form"
        lazy-validation
      >
        <v-row>
          <v-col>
            <label>{{ $t('label.search_participant_by_name_nik') }}</label>
            <autocomplete-cases
              :on-select-case="onSelectCase"
            />
          </v-col>
        </v-row>
        <h4 class="font-weight-bold" style="color:#43A047">
          {{ $t('label.participant_personal_data') }}
        </h4>
        <v-divider />
        <v-row>
          <v-col
            cols="12"
            md="6"
            sm="12"
          >
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <label class="required">{{ $t('label.category') }}</label>
              <v-select
                v-model="formRapid.category"
                :error-messages="errors"
                :items="items"
                item-text="label"
                item-value="value"
                solo
                @change="onChangeCategory"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <label class="required">{{ $t('label.mechanism') }}</label>
              <v-select
                v-model="formRapid.mechanism"
                :error-messages="errors"
                :items="mechanismOptions"
                solo
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="numeric"
            >
              <label>{{ $t('label.nik') }}</label>
              <v-text-field
                v-model="formRapid.nik"
                :error-messages="errors"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <label class="required">{{ $t('label.gender') }}</label>
              <v-radio-group
                v-model="formRapid.gender"
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
            <label>{{ $t('label.birth_date') }}</label>
            <select-datetime
              :datetime="formRapid.birth_date"
              :date-time.sync="formRapid.birth_date"
              :formate-date="formatDate"
            />
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|isHtml"
            >
              <label class="required">{{ $t('label.age') }}</label>
              <v-text-field
                v-model="formRapid.age"
                :error-messages="errors"
                min="0"
                solo-inverted
                type="number"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <label class="required">{{ $t('label.citizenship') }}</label>
              <v-radio-group
                v-model="formRapid.nationality"
                :error-messages="errors"
                row
                @change="handleChangeNationality"
              >
                <v-radio label="WNI" value="WNI" />
                <v-radio label="WNA" value="WNA" />
              </v-radio-group>
            </ValidationProvider>
            <ValidationProvider
              v-if="formRapid.nationality === 'WNA'"
              v-slot="{ errors }"
              rules="required"
            >
              <v-text-field
                v-model="formRapid.nationality_name"
                :error-messages="errors"
                placeholder="Negara Asal"
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
              rules="required"
            >
              <label class="required">{{ $t('label.goals') }}</label>
              <v-select
                v-model="formRapid.target"
                :error-messages="errors"
                :return-object="false"
                :items="targetOptions"
                item-text="targets"
                item-value="targets"
                solo
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|isHtml"
            >
              <label class="required">{{ $t('label.participant_name') }}</label>
              <v-text-field
                v-model="formRapid.name"
                :error-messages="errors"
                solo-inverted
              />
            </ValidationProvider>
            <label class="required">{{ $t('label.address_home') }}</label>
            <address-region
              v-model="formRapid.address_district_name"
              :district-code="formRapid.address_district_code"
              :district-name="formRapid.address_district_name"
              :code-district.sync="formRapid.address_district_code"
              :name-district.sync="formRapid.address_district_name"
              :sub-district-code="formRapid.address_subdistrict_code"
              :sub-district-name="formRapid.address_subdistrict_name"
              :code-sub-district.sync="formRapid.address_subdistrict_code"
              :name-sub-district.sync="formRapid.address_subdistrict_name"
              :village-code="formRapid.address_village_code"
              :village-name="formRapid.address_village_name"
              :code-village.sync="formRapid.address_village_code"
              :name-village.sync="formRapid.address_village_name"
              :disabled-address="false"
              :required-address="true"
            />
            <ValidationProvider>
              <label>{{ $t('label.address_complete_home') }}</label>
              <v-textarea
                v-model="formRapid.address_street"
                solo
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|isPhoneNumber"
            >
              <label class="required">{{ $t('label.phone_number') }}</label>
              <v-text-field
                v-model="formRapid.phone_number"
                :error-messages="errors"
                placeholder="08xxxxxxxxx"
                solo-inverted
                type="number"
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <form-result
          :form-result="formResult"
          :result-form.sync="formResult"
        />
        <v-container fluid>
          <v-row class="survey-bottom-form">
            <v-col cols="" md="4" sm="0" />
            <v-col cols="12" md="3" sm="12">
              <v-btn
                color="success"
                :disabled="formResult.final_result === 'POSITIF'"
                :loading="loading"
                bottom
                style="float: right; color: white"
                @click="saveData"
              >
                {{ $t('label.save') }}
              </v-btn>
            </v-col>
            <v-col cols="12" md="5" sm="12">
              <v-btn
                color="blue"
                :disabled="formResult.final_result !== 'POSITIF'"
                :loading="loading"
                bottom
                style="float: left; color: white"
                @click="saveRdtAndCase"
              >
                {{ $t('label.save_and_add_to_report_case') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </ValidationObserver>
  </v-container>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { getAge } from '@/utils/constantVariable'
import { mapGetters } from 'vuex'

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      loading: false,
      formatDate: 'YYYY/MM/DD',
      isODP: true,
      isEdit: false,
      idEdit: null,
      items: [
        {
          label: 'Kategori A',
          value: 'A'
        },
        {
          label: 'Kategori B',
          value: 'B'
        },
        {
          label: 'Kategori C',
          value: 'C'
        }
      ],
      mechanismOptions: [
        'Door to door',
        'Faskes',
        'Drive-Thru'
      ],
      targetOptions: [],
      formRapid: {
        id: '',
        id_case: '',
        target: '',
        nik: null,
        name: null,
        birth_date: '',
        age: null,
        gender: null,
        address_district_code: '',
        address_district_name: '',
        address_subdistrict_code: '',
        address_subdistrict_name: '',
        address_village_code: '',
        address_villagenationality_name: '',
        address_street: null,
        phone_number: null,
        category: null,
        mechanism: null,
        nationality: null,
        nationality_name: null
      },
      formResult: {
        final_result: null,
        test_location: null,
        test_location_type: '',
        test_other_location: '',
        test_address_district_code: '',
        test_address_district_name: '',
        test_address_subdistrict_code: '',
        test_address_subdistrict_name: '',
        test_address_village_code: '',
        test_address_village_name: '',
        test_address_detail: '',
        tool_tester: 'RAPID TEST',
        test_method: null,
        test_date: null,
        test_note: null
      }
    }
  },
  computed: {
    ...mapGetters('user', [
      'district_user'
    ])
  },
  watch: {
    'formRapid.birth_date': function(value) {
      if ((value !== '') && (value !== null) && (value !== 'Invalid date')) {
        this.formRapid.age = this.getAge(value)
      }
    }
  },
  async beforeMount() {
    await this.$store.dispatch('occupation/getListOccuption')
    const responseDetails = await this.$store.dispatch('region/getDetailDistrict', this.district_user)
    if (responseDetails.data[0]) {
      this.formRapid.address_district_name = responseDetails.data[0].kota_nama
    }
  },
  async mounted() {
    this.formRapid.address_district_code = this.district_user
    this.idEdit = this.$route.params.id
    if (this.$route.params && this.idEdit) {
      this.isEdit = true
      const response = await this.$store.dispatch('rdt/detailParticipant', this.$route.params.id)
      await Object.assign(this.formRapid, response.data)
      await Object.assign(this.formResult, response.data)
    }
  },
  methods: {
    getAge,
    async onSelectCase(value) {
      const getEndSearch = value.indexOf('/')
      const getName = value.slice(0, getEndSearch)
      const listQuery = {
        address_district_code: this.district_user,
        search: getName
      }
      const response = await this.$store.dispatch('rdt/getDetailRegister', listQuery)
      await Object.assign(this.formRapid, response.data)
      this.formRapid.address_street = response.data.address_detail
      if (this.formRapid.id_case) {
        this.formRapid.category = 'A'
        this.onChangeCategory(this.formRapid.category, 'ODP')
      } else {
        this.onChangeCategory(this.formRapid.category)
      }
    },
    async onChangeCategory(value, isODP) {
      const response = await this.$store.dispatch('rdt/getListTarget', value)
      this.targetOptions = response.data
      if (isODP === 'ODP') {
        this.formRapid.target = this.targetOptions[0].targets
      }
    },
    handleChangeNationality(value) {
      if (value === 'WNI') {
        this.formRapid.nationality_name = ''
      }
    },
    async saveData() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      } else if (this.formResult.test_date === null) {
        await this.$store.dispatch('toast/errorToast', 'Tanggal Harus Diisi')
        return
      }

      try {
        this.loading = true
        Object.assign(this.formRapid, this.formResult)
        delete this.formRapid._id

        if (this.isEdit) {
          const id = this.$route.params && this.$route.params.id
          await this.$store.dispatch('rdt/updateRDT', id, this.formRapid)
        } else {
          await this.$store.dispatch('rdt/createRDT', this.formRapid)
        }

        await this.$store.dispatch('toast/successToast', this.$t('success.create_date_success'))
        this.$router.push('/rdt/list')
        await this.$refs.form.reset()
      } catch {
        await this.$store.dispatch('toast/errorToast', 'Data gagal disimpan')
      } finally {
        this.loading = false
      }
    },
    async saveRdtAndCase() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      } else if (this.formResult.test_date === null) {
        await this.$store.dispatch('toast/errorToast', 'Tanggal Harus Diisi')
        return
      }

      try {
        this.loading = true
        Object.assign(this.formRapid, this.formResult)

        if (this.formRapid.final_result === 'POSITIF') {
          this.formRapid.status = 'PDP'
          this.formRapid.stage = '0'
          this.formRapid.is_test_masif = true
        }

        if (this.formRapid.id_case) {
          const updateCase = {
            case: this.formRapid.id,
            status: this.formRapid.status,
            stage: this.formRapid.stage,
            final_result: this.formRapid.final_result,
            is_test_masif: this.formRapid.is_test_masif
          }
          await this.$store.dispatch('reports/createHistoryCase', updateCase)
        } else {
          delete this.formRapid.id_case
          await this.$store.dispatch('reports/createReportCase', this.formRapid)
        }
        this.saveData()
      } catch {
        await this.$store.dispatch('toast/errorToast', 'Data gagal disimpan')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
