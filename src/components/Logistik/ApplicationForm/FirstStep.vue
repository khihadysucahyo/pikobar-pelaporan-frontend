<template>
  <v-container>
    <ValidationObserver ref="observer">
      <v-form
        ref="form"
        lazy-validation
      >
        <v-row>
          <center><v-label class="title"><b>{{ $t('label.applicant_form_header') }}</b></v-label></center>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="6">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <v-label class="title"><b>{{ $t('label.instance_type') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-autocomplete
                v-model="formApplicant.instanceType"
                solo
                :error-messages="errors"
                item-value="id"
                item-text="name"
                :items="faskesTypeList"
                :placeholder="$t('label.autocomplete_instance_placeholder')"
                @change="onSelectFaskesType"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <v-label class="title"><b>{{ $t('label.instance_name') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-autocomplete
                v-model="formApplicant.instanceName"
                :items="hospitalList"
                item-value="_id"
                item-text="name"
                single-line
                solo
                autocomplete
                :error-messages="errors"
                :placeholder="$t('label.example_instance_name')"
                @input.native="querySearchFaskes"
                @change="onSelectFaskes"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="isPhoneNumber"
            >
              <v-label class="title"><b>{{ $t('label.instance_phone_number') }}</b></v-label>
              <v-text-field
                v-model="formApplicant.instancePhoneNumber"
                solo
                :error-messages="errors"
                :placeholder="$t('label.example_phone_number')"
                solo-inverted
              />
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="12" md="6">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <v-label class="title"><b>{{ $t('label.district_city') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-autocomplete
                v-model="formApplicant.cityNameId"
                solo
                :error-messages="errors"
                :items="listDistrictCity"
                :placeholder="$t('label.autocomplete_city_placeholder')"
                @change="getListDistrict"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <v-label class="title"><b>{{ $t('label.subdistrict') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-autocomplete
                v-model="formApplicant.districtNameId"
                solo
                :error-messages="errors"
                :items="listSubDistrict"
                :placeholder="$t('label.autocomplete_capital_placeholder')"
                @change="getListVillage"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <v-label class="title"><b>{{ $t('label.village') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-autocomplete
                v-model="formApplicant.villageNameId"
                solo
                :error-messages="errors"
                :items="listVillage"
                :placeholder="$t('label.autocomplete_capital_placeholder')"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <v-label class="title"><b>{{ $t('label.complete_address') }}</b> <i class="text-small-first-step">{{ $t('label.must_fill') }}</i></v-label>
              <v-textarea
                v-model="formApplicant.fullAddress"
                :height="100"
                :no-resize="true"
                :error-messages="errors"
                :placeholder="$t('label.example_full_address')"
                solo-inverted
              />
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-container fluid>
          <div>
            <v-col cols="12" sm="3" md="3" class="float-right-first-step">
              <v-btn
                block
                class="btn-margin-positive"
                color="primary"
                @click="onNext()"
              >{{ $t('label.next') }}</v-btn>
            </v-col>
          </div>
        </v-container>
      </v-form>
    </ValidationObserver>
  </v-container>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import EventBus from '@/utils/eventBus'
import { mapGetters } from 'vuex'

export default {
  name: 'IdentitasInstansiPemohon',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    formApplicant: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      step: 1,
      nameFaskes: '',
      listQueryFaskes: {
        nama_faskes: null,
        id_tipe_faskes: null
      },
      listDistrictCity: [],
      listSubDistrict: [],
      listVillage: [],
      faskesDetail: '',
      showForm: false
    }
  },
  computed: {
    ...mapGetters('region', [
      'hospitalList'
    ]),
    ...mapGetters('logistic', [
      'faskesTypeList'
    ])
  },
  async created() {
    await this.getListCity()
    await this.$store.dispatch('logistic/getListFaskesType')
    await this.$store.dispatch('region/getListHospital')
    // await this.getListFaskes()
    EventBus.$on('dialogHide', (value) => {
      this.showForm = value
    })
  },
  methods: {
    async onNext() {
      this.faskesTypeList.forEach(element => {
        if (element.id === this.formApplicant.instanceType) {
          this.formApplicant.instanceTypeName = element.name
        }
      })
      this.hospitalList.forEach(element => {
        if (element.id === this.formApplicant.instance) {
          this.formApplicant.instanceName = element.name
          return
        }
      })
      const valid = await this.$refs.observer.validate()
      if (!valid) {
        return
      }
      EventBus.$emit('nextStep', this.step)
    },
    async getListCity() {
      const response = await this.$store.dispatch('region/getListDistrictCity')
      this.listDistrictCity = await response.data
      this.listDistrictCity.forEach(element => {
        element.value = {
          id: element.kota_kode,
          name: element.kota_nama
        }
        element.text = element.kota_nama
      })
    },
    async getListDistrict() {
      const response = await this.$store.dispatch('region/getListSubDistrict', this.formApplicant.cityNameId.id)
      this.listSubDistrict = await response.data
      this.listSubDistrict.forEach(element => {
        element.value = {
          id: element.kecamatan_kode,
          name: element.kecamatan_nama
        }
        element.text = element.kecamatan_nama
      })
    },
    async getListVillage() {
      const response = await this.$store.dispatch('region/getListVillage', this.formApplicant.districtNameId.id)
      this.listVillage = await response.data
      this.listVillage.forEach(element => {
        element.value = {
          id: element.desa_kode,
          name: element.desa_nama
        }
        element.text = element.desa_nama
      })
    },
    async onSelectFaskesType(id) {
      this.listQueryFaskes.id_tipe_faskes = id
      await this.getListFaskes()
    },
    async getListFaskes() {
      // await this.$store.dispatch('faskes/getListFaskes', this.listQueryFaskes)
    },
    async querySearchFaskes(event) {
      this.listQueryFaskes.nama_faskes = event.target.value
      await this.getListFaskes()
    },
    async onSelectFaskes(id) {
      if (id) {
        // await this.$store.dispatch('faskes/getDetailFaskes', id)
      }
    },
    hideDialog(value) {

    }
  }
}
</script>
<style>
.text-small-first-step {
  font-size: 13px;
}
.float-right-first-step {
  float: right;
}
</style>
