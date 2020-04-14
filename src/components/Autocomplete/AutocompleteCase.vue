<template>
  <div>
    <ValidationProvider
      v-slot="{ errors }"
    >
      <v-autocomplete
        :no-data-text="$t('label.no_data_autocomplete_case')"
        :search-input.sync="search"
        :disabled="disabledCase"
        :error-messages="errors"
        :return-object="false"
        :loading="loading"
        :items="listKasus"
        item-value="display"
        item-text="display"
        menu-props="auto"
        autocomplete
        single-line
        solo
        @change="onSelectCase"
      />
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import { mapGetters } from 'vuex'

export default {
  name: 'AutocompleteCases',
  components: {
    ValidationProvider
  },
  props: {
    requiredValidation: {
      type: Boolean,
      default: false
    },
    onSelectCase: {
      type: Function,
      default: null
    },
    disabledCase: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      search: null,
      listKasus: [],
      listQuery: {
        address_district_code: null,
        search: null
      }
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles',
      'district_user'
    ])
  },
  watch: {
    async search(value) {
      this.loading = true
      this.listQuery.search = value
      const response = await this.$store.dispatch('rdt/getCases', this.listQuery)
      this.listKasus = response.data
      this.loading = false
    }
  },
  async mounted() {
    this.listQuery.address_district_code = this.district_user
  }
}
</script>
