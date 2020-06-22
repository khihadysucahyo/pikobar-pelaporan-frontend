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
              <label class="required">{{ $t('label.name_instansi') }}</label>
              <v-text-field
                v-model="formUser.fullname"
                :error-messages="errors"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|email|isEmailUsed"
            >
              <label class="required">{{ $t('label.email') }}</label>
              <v-text-field
                v-model="formUser.email"
                :error-messages="errors"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|isPhoneNumber"
            >
              <label class="required">{{ $t('label.phone_number') }}</label>
              <v-text-field
                v-model="formUser.phone_number"
                :error-messages="errors"
                placeholder="08xxxxxxxxx"
                solo-inverted
                type="number"
              />
            </ValidationProvider>
            <label class="required">{{ $t('label.address') }}</label>
            <address-region
              :disabled-district="disabledDistrict"
              :district-code="formUser.code_district_city"
              :district-name="formUser.name_district_city"
              :code-district.sync="formUser.code_district_city"
              :name-district.sync="formUser.name_district_city"
              :sub-district-code="formUser.address_subdistrict_code"
              :sub-district-name="formUser.address_subdistrict_name"
              :code-sub-district.sync="formUser.address_subdistrict_code"
              :name-sub-district.sync="formUser.address_subdistrict_name"
              :village-code="formUser.address_village_code"
              :village-name="formUser.address_village_name"
              :code-village.sync="formUser.address_village_code"
              :name-village.sync="formUser.address_village_name"
              :disabled-address="false"
              :required-address="true"
            />
            <ValidationProvider>
              <v-label>{{ $t('label.complete_address') }}</v-label>
              <v-textarea
                v-model="formUser.address_street"
                solo
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
              rules="required|isHtml|isWhiteSpaces"
            >
              <label class="required">{{ $t('label.username') }}</label>
              <v-text-field
                v-model="formUser.username"
                :error-messages="errors"
                solo-inverted
              />
            </ValidationProvider>
            <ValidationProvider
              v-if="roles[0] !== 'faskes'"
              v-slot="{ errors }"
              rules="required"
            >
              <label class="required">{{ $t('label.roles') }}</label>
              <v-select
                v-model="formUser.role"
                :items="listRoles"
                :error-messages="errors"
                solo
              />
            </ValidationProvider>
            <ValidationProvider
              v-if="formUser.role !== 'dinkeskota'"
              v-slot="{ errors }"
              rules="required"
            >
              <label class="required">{{ $t('label.work_unit') }}</label>
              <v-autocomplete
                v-model="formUser.unit_id"
                :items="unitList"
                :error-messages="errors"
                :loading="isUnitLoading"
                :search-input.sync="searchUnit"
                :label="$t('label.work_unit')"
                menu-props="auto"
                item-text="name"
                item-value="_id"
                single-line
                solo
                autocomplete
              />
            </ValidationProvider>
            <div v-if="!isEdit">
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
              >
                <label class="required">{{ $t('label.password') }}</label>
                <v-text-field
                  v-model="formUser.password"
                  :rules="passwordRules"
                  :append-icon="typePassword ? 'visibility' : 'visibility_off'"
                  :type="typePassword ? 'password' : 'text'"
                  :error-messages="errors"
                  name="password"
                  solo-inverted
                  @click:append="() => (typePassword = !typePassword)"
                />
              </ValidationProvider>
              <ValidationProvider>
                <label class="required">{{ $t('label.repeat_password') }}</label>
                <v-text-field
                  :rules="repeatPasswordRules"
                  :append-icon="typeRepeatPassword ? 'visibility' : 'visibility_off'"
                  :type="typeRepeatPassword ? 'password' : 'text'"
                  name="repeat_password"
                  solo-inverted
                  @click:append="() => (typeRepeatPassword = !typeRepeatPassword)"
                />
              </ValidationProvider>
            </div>
          </v-col>
        </v-row>
        <v-container fluid>
          <v-row class="survey-bottom-form">
            <v-col>
              <v-btn
                v-if="!isEdit"
                color="success"
                bottom
                style="float: right;"
                @click="handleCreate"
              >
                {{ $t('label.create_account') }}
              </v-btn>
              <v-btn
                v-else-if="isEdit"
                color="success"
                bottom
                style="float: right;"
                @click="handleCreate"
              >
                {{ $t('route.user_edit') }}
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
import { mapGetters } from 'vuex'
export default {
  name: 'UserForm',
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
    formUser: {
      type: Object,
      default: null
    },
    idData: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      date: '',
      disabledDistrict: true,
      unitList: [],
      listRoles: [
        'dinkeskota',
        'faskes'
      ],
      queryUnit: {
        search: ''
      },
      searchUnit: null,
      isUnitLoading: false,
      typePassword: String,
      typeRepeatPassword: String,
      passwordRules: [
        v => !!v || this.$t('errors.new_password_must_be_filled'),
        v => (v && v.length >= 5) || this.$t('errors.new_password_must_be_more_than_characters')
      ],
      repeatPasswordRules: [
        v => !!v || this.$t('errors.confirm_new_password_must_be_filled'),
        v => (v && v.length >= 5) || this.$t('errors.confirm_new_password_must_be_more_than_characters'),
        v => (v && v === this.formUser.password) || this.$t('errors.confirm_new_password_not_same')
      ]
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles'
    ])
  },
  watch: {
    async searchUnit(value) {
      this.isUnitLoading = true
      this.queryUnit.search = value
      const response = await this.$store.dispatch('region/listUnit', this.queryUnit)
      this.unitList = response.data.itemsList
      this.isUnitLoading = false
    }
  },
  async mounted() {
    this.disabledDistrict = await this.roles[0] === 'dinkeskota'
    const response = await this.$store.dispatch('region/listUnit', this.queryUnit)
    this.unitList = response.data.itemsList
    if (this.isEdit) {
      const response = await this.$store.dispatch('user/detailUser', this.idData)
      await delete response.data['__v']
      await delete response.data['updatedAt']
      await delete response.data['createdAt']
      await delete response.data['hash']
      await delete response.data['salt']
      await Object.assign(this.formUser, response.data)
      const detailUnit = await this.$store.dispatch('region/detailUnit', this.formUser.unit_id)
      this.unitList.push(detailUnit.data)
    }
  },
  methods: {
    async handleCreate() {
      const valid = await this.$refs.observer.validate()
      // if (this.isEdit && this.formUser.username.length > 0) {
      //   valid = true
      // }
      if (!valid) {
        return
      } else if (this.$refs.form.validate()) {
        if (this.isEdit) {
          await delete this.formUser['password']
          const update = {
            id: this.idData,
            data: this.formUser
          }
          await this.$store.dispatch('user/editUser', update)
        } else {
          await this.$store.dispatch('user/createUser', this.formUser)
        }
        await this.$router.push(`/user/list`)
      }
    }
  }
}
</script>
