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
              rules="required"
            >
              <label class="required">Kriteria</label>
              <v-radio-group
                v-model="formPasien.status"
                :error-messages="errors"
                row
              >
                <v-radio label="OTG" value="OTG" />
                <v-radio label="ODP" value="ODP" />
                <v-radio label="PDP" value="PDP" />
                <v-radio label="POSITIF" value="POSITIF" />
              </v-radio-group>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <label class="required">Tahapan</label>
              <v-radio-group
                v-model="formPasien.stage"
                :error-messages="errors"
                row
              >
                <v-radio label="Proses" value="0" />
                <v-radio label="Selesai" value="1" />
              </v-radio-group>
            </ValidationProvider>
            <ValidationProvider
              v-if="formPasien.status !== 'OTG' && formPasien.status !== 'ODP'"
              v-slot="{ errors }"
            >
              <label>Hasil</label>
              <v-radio-group
                v-model="formPasien.final_result"
                :error-messages="errors"
                row
              >
                <v-radio
                  v-if="formPasien.status !== 'POSITIF'"
                  label="Negatif"
                  value="0"
                  @click.prevent="uncheck('0')"
                />
                <v-radio
                  label="Sembuh"
                  value="1"
                  @click.prevent="uncheck('1')"
                />
                <v-radio
                  label="Meninggal"
                  value="2"
                  @click.prevent="uncheck('2')"
                />
              </v-radio-group>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <label class="required">Lokasi Saat Ini</label>
              <v-radio-group
                v-model="formPasien.current_location_type"
                :error-messages="errors"
                row
                @change="handleChangeLocationNow"
              >
                <v-radio label="Rumah" value="RUMAH" />
                <v-radio label="Rumah Sakit" value="RS" />
              </v-radio-group>
            </ValidationProvider>
            <div v-if="formPasien.current_location_type === 'RUMAH'">
              <address-region
                :district-code="formPasien.current_location_district_code"
                :code-district.sync="formPasien.current_location_district_code"
                :sub-district-code="formPasien.current_location_subdistrict_code"
                :code-sub-district.sync="formPasien.current_location_subdistrict_code"
                :village-code="formPasien.current_location_village_code"
                :village-name="formPasien.current_location_village_name"
                :code-village.sync="formPasien.current_location_village_code"
                :name-village.sync="formPasien.current_location_village_name"
                :disabled-address="false"
                :required-address="true"
              />
            </div>
            <ValidationProvider
              v-if="formPasien.current_location_type === 'RUMAH'"
              v-slot="{ errors }"
            >
              <v-label>Alamat Lengkap lokasi saat ini</v-label>
              <v-text-field
                v-model="formPasien.current_location_address"
                :error-messages="errors"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-if="formPasien.current_location_type === 'RS'"
              v-slot="{ errors }"
              rules="required"
            >
              <v-autocomplete
                v-model="formPasien.current_location_address"
                :items="hospitalList"
                :error-messages="errors"
                :return-object="true"
                label="Lokasi Rumah Sakit"
                menu-props="auto"
                item-text="name"
                item-value="name"
                single-line
                solo
                autocomplete
                @change="onSelectHospital"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
            >
              <v-label>Sumber Pelaporan</v-label>
              <v-text-field
                v-model="formPasien.report_source"
                :error-messages="errors"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider>
              <v-label>Catatan Tambahan</v-label>
              <v-textarea
                v-model="formPasien.other_notes"
                solo
              />
            </ValidationProvider>
          </v-col>
          <v-col
            cols="12"
            md="6"
            sm="12"
          >
            <ValidationProvider>
              <v-label>Riwayat</v-label>
              <v-checkbox
                v-model="formPasien.is_went_abroad"
                label="Dari Luar Negeri"
              />
            </ValidationProvider>
            <ValidationProvider
              v-if="formPasien.is_went_abroad === true"
              v-slot="{ errors }"
              rules="required"
            >
              <v-text-field
                v-model="formPasien.visited_country"
                :error-messages="errors"
                placeholder="Negara Yang Dikunjungi"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider>
              <v-checkbox
                v-model="formPasien.is_went_other_city"
                label="Perjalanan ke luar kota"
              />
            </ValidationProvider>
            <ValidationProvider
              v-if="formPasien.is_went_other_city === true"
              v-slot="{ errors }"
              rules="required"
            >
              <v-text-field
                v-model="formPasien.visited_city"
                :error-messages="errors"
                placeholder="Kota Yang Dikunjungi"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider>
              <v-checkbox
                v-model="formPasien.is_contact_with_positive"
                label="Kontak Dengan Pasien Positif"
              />
            </ValidationProvider>
            <ValidationProvider>
              <v-text-field
                v-model="formPasien.history_notes"
                placeholder="Masukkan Riwayat Lainnya Jika Ada"
                solo-inverted
              />
            </ValidationProvider>
            <label>Tanggal Gejala</label>
            <select-datetime
              :datetime="formPasien.first_symptom_date"
              :date-time.sync="formPasien.first_symptom_date"
              :formate-date="formatDate"
            />
            <ValidationProvider v-slot="{ errors }">
              <label>Gejala</label>
              <div v-for="(item, index) in optionGejala" :key="index">
                <label class="material-checkbox-custom">
                  <input
                    v-model="formPasien.diagnosis"
                    :value="item.value"
                    type="checkbox"
                  >
                  <span v-if="errors.length" class="error--text">{{ item.text }}</span>
                  <span v-else>{{ item.text }}</span>
                </label>
              </div>
              <span
                v-if="errors.length"
                class="v-messages error--text"
              >{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider>
              <v-text-field
                v-model="formPasien.diagnosis_other"
                placeholder="Sebutkan gelaja lainnya (jika ada)"
                solo-inverted
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-container fluid>
          <v-row class="survey-bottom-form">
            <v-col>
              <v-btn
                :loading="loading"
                bottom
                outlined
                @click="backStep()"
              >
                Kembali
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                color="success"
                :loading="loading"
                bottom
                style="float: right;"
                @click="handleSave"
              >
                Simpan
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
import EventBus from '@/utils/eventBus'
import { optionGejala } from '@/utils/constantVariable'
import { mapGetters } from 'vuex'
export default {
  name: 'FormInformationHistory',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
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
      loading: false,
      optionGejala: optionGejala,
      formatDate: 'YYYY/MM/DD'
    }
  },
  computed: {
    ...mapGetters('region', [
      'hospitalList'
    ])
  },
  async mounted() {
    await this.$store.dispatch('region/getListHospital')
  },
  methods: {
    backStep() {
      EventBus.$emit('backSurveySteps', this.steps)
    },
    async handleSave() {
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      this.loading = true
      const response = await this.$store.dispatch('reports/createReportCase', this.formPasien)
      if (response.status !== 422) {
        await this.$store.dispatch('reports/resetFormPasien')
        await this.$store.dispatch('toast/successToast', this.$t('success.create_date_success'))
        this.$router.push('/laporan/list')
        await this.$refs.form.reset()
        this.loading = false
      }
    },
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
    }
  }
}
</script>

<style scoped>

</style>
