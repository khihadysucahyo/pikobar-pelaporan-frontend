<template>
  <ValidationProvider
    v-slot="{ errors }"
    :rules="required ? 'required': ''"
  >
    <v-autocomplete
      v-model="nameVillage"
      :items="listVillage"
      :label="$t('label.select_village')"
      :error-messages="errors"
      :disabled="disable"
      :return-object="true"
      menu-props="auto"
      item-text="desa_nama"
      single-line
      solo
      autocomplete
      @change="onSelectVillage"
    />
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'SelectAreaVillage',
  components: {
    ValidationProvider
  },
  props: {
    village: {
      type: Object,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    codeSubDistrict: {
      type: String,
      default: null
    },
    onSelectVillage: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      listVillage: [],
      disable: true,
      nameVillage: ''
    }
  },
  watch: {
    'village': function(value) {
      if (value && value.desa_kode) {
        this.nameVillage = value
      } else {
        this.nameVillage = ''
      }
    },
    codeSubDistrict: async function(value) {
      if (value && value.length > 0) {
        const response = await this.$store.dispatch('region/getListVillage', value)
        this.listVillage = response.data
        this.disable = false
      } else {
        this.disable = true
      }
    }
  },
  async created() {
    if (this.village.desa_kode) {
      this.nameVillage = this.village
    }
    if (this.codeSubDistrict) {
      const response = await this.$store.dispatch('region/getListVillage', this.codeSubDistrict)
      this.listVillage = response.data
      this.disable = false
    }
  }
}
</script>
