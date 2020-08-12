<template>
  <v-container fluid>
    <v-form ref="form" lazy-validation>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.province') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-select
              v-model="formPasien.province"
              :items="listProvince"
              item-text="provinsi_nama"
              return-object
              solo
              @change="getListDistrictByProvince"
            />
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" md="3" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <label>{{ $t('label.city') }}</label>
        </v-col>
        <v-col cols="12" md="9" sm="12" :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}">
          <ValidationProvider>
            <v-select
              v-model="formPasien.city"
              :items="listDistrict"
              item-text="kota_nama"
              item-value="kota_nama"
              solo
            />
          </ValidationProvider>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
import { specimenType } from '@/utils/constantVariable'
export default {
  name: 'FormTransmissionArea',
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
      specimenType: specimenType,
      listProvince: [],
      listDistrict: [],
      formatDate: 'YYYY/MM/DD'
    }
  },
  async mounted() {
    await this.getListProvince()
  },
  methods: {
    async getListProvince() {
      const response = await this.$store.dispatch('region/getListProvince')
      this.listProvince = response.data
    },
    async getListDistrictByProvince(item) {
      this.formPasien.province = item.provinsi_nama
      const response = await this.$store.dispatch('region/getListDistrictCity', { provice_code: item.provinsi_kode })
      this.listDistrict = response.data
    }
  }
}
</script>
