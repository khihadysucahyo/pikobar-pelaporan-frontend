
<template>
  <v-card outlined>
    <v-container>
      <v-card
        class="warning-background pa-1"
        outlined
        color="#6FCF97"
        min-height="90px"
      >
        <div
          class="ml-10 mt-6"
          style="color: #FFFFFF;"
        >
          <div class="font-weight-bold">
            {{ $t('label.primary_case_id_related_case') }}
          </div>
          <div>
            {{ $t('label.redaction_create_related_case') }}
          </div>
        </div>
      </v-card>
      <ValidationObserver ref="observer">
        <v-form
          ref="form"
          lazy-validation
        >
          <v-container>
            <v-row>
              <v-col auto>
                <v-expansion-panels
                  v-model="caseSelect"
                  multiple
                >
                  <v-expansion-panel>
                    <v-expansion-panel-header class="font-weight-bold text-lg">
                      {{ $t('label.primary_case_id_related_case_lookfor_primary_case') }}
                    </v-expansion-panel-header>
                    <v-divider />
                    <v-expansion-panel-content>
                      <v-row align="start">
                        <v-col
                          cols="12"
                          md="3"
                          sm="12"
                          :class="{'py-0': $vuetify.breakpoint. smAndDown}"
                        >
                          <label class="required">{{ $t('label.look_for_primary_case_id') }}</label>
                        </v-col>
                        <v-col
                          cols="12"
                          md="9"
                          sm="12"
                          :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
                        >
                          <ValidationProvider
                            v-slot="{ errors }"
                            rules="required"
                          >
                            <v-autocomplete
                              v-model="idCase"
                              :no-data-text="$t('label.no_data_autocomplete_related_case')"
                              :error-messages="errors"
                              :items="listCase"
                              :search-input.sync="searchCase"
                              item-text="relateds"
                              item-value="_id"
                              solo-inverted
                              clearable
                              :return-object="false"
                              @click:clear="clearListCases"
                            />
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
          </v-container>
          <form-close-contact-case
            :is-edit="isEdit"
            :form-body="formCloseContact"
          />
        </v-form>
      </ValidationObserver>
      <v-row class="mb-3">
        <v-col>
          <v-btn
            color="#FFFFFF"
            block
            :loading="isLoading"
            @click="handleBack"
          >
            {{ $t('label.back') }}
          </v-btn>
        </v-col>
        <v-spacer />
        <v-col>
          <v-btn
            color="primary"
            block
            :loading="isLoading"
            @click="handleSave"
          >
            {{ $t('label.save') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import { formatDatetime } from '@/utils/parseDatetime'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'CreateCloseContactCase',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      isLoading: false,
      idCase: '',
      searchCase: null,
      listCase: [],
      caseSelect: [0],
      listQuery: {
        name_case_related: ''
      },
      isEdit: false
    }
  },
  computed: {
    ...mapGetters('user', [
      'fullName'
    ]),
    ...mapState('closeContactCase', [
      'formCloseContact'
    ])
  },
  watch: {
    async searchCase(value) {
      if (value) {
        this.listQuery.name_case_related = value
        const response = await this.$store.dispatch('reports/listNameCase', this.listQuery)
        this.listCase = response.data
      } else {
        this.listCase = []
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('closeContactCase/resetStateCloseContactCase')
    this.formCloseContact.interviewer_name = this.fullName
  },
  methods: {
    formatDatetime,
    async handleBack() {
      await this.$store.dispatch('closeContactCase/resetStateCloseContactCase')
      await this.$router.push(`/close-contact/list`)
    },
    async handleSave() {
      const valid = await this.$refs.observer.validate()
      this.isLoading = true
      if (!valid) {
        this.isLoading = false
        return
      }
      delete this.formCloseContact['yearsOld']
      const data = {
        idCase: this.idCase,
        body: this.formCloseContact
      }
      const response = await this.$store.dispatch('closeContactCase/postListCloseContactByCase', data)
      if (response.status === 200) {
        await this.$store.dispatch('toast/successToast', this.$t('success.create_data_success'))
        await this.$store.dispatch('closeContactCase/resetStateCloseContactCase')
        await this.$router.push(`/close-contact/list`)
        this.isLoading = false
      } else {
        await this.$store.dispatch('toast/errorToast', this.$t('errors.create_data_errors'))
        this.isLoading = false
      }
    },
    clearListCases() {
      this.listCase = []
    }
  }
}
</script>
<style scoped>
  .warning-background {
    background-image: url('../../static/warning_green_icon.svg')
  }
</style>
