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
              rules="required|email"
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
            <label class="required">{{ $t('label.address_home') }}</label>
            <address-region
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
              <v-label>{{ $t('label.address_complete_home') }}</v-label>
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
            <label class="required">{{ $t('label.password') }}</label>
            <v-text-field
              v-model="formUser.password"
              :rules="passwordRules"
              :append-icon="typePassword ? 'visibility' : 'visibility_off'"
              :type="typePassword ? 'password' : 'text'"
              name="password"
              solo-inverted
              @click:append="() => (typePassword = !typePassword)"
            />
            <label class="required">{{ $t('label.repeat_password') }}</label>
            <v-text-field
              :rules="repeatPasswordRules"
              :append-icon="typeRepeatPassword ? 'visibility' : 'visibility_off'"
              :type="typeRepeatPassword ? 'password' : 'text'"
              name="repeat_password"
              solo-inverted
              @click:append="() => (typeRepeatPassword = !typeRepeatPassword)"
            />
          </v-col>
        </v-row>
        <v-container fluid>
          <v-row class="survey-bottom-form">
            <v-col>
              <v-btn
                color="success"
                bottom
                style="float: right;"
                @click="handleCreate"
              >
                {{ $t('label.create_account') }}
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
    }
  },
  data() {
    return {
      date: '',
      listRoles: [
        'dinkesprov',
        'dinkeskota',
        'faskes'
      ],
      typePassword: String,
      typeRepeatPassword: String,
      passwordRules: [
        v => !!v || 'Password baru harus diisi',
        v => (v && v.length >= 5) || 'Password baru harus lebih dari 5 karakter'
      ],
      repeatPasswordRules: [
        v => !!v || 'Konfirmasi password baru harus diisi',
        v => (v && v.length >= 5) || 'Konfirmasi password baru harus lebih dari 5 karakter',
        v => (v && v === this.formUser.password) || 'Konfirmasi password tidak sama'
      ]
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles'
    ])
  },
  async mounted() {
    // console.log(this.formUser)
  },
  methods: {
    async handleCreate() {
      if (this.$refs.form.validate()) {
        await this.$store.dispatch('user/createUser', this.formUser)
        await this.$router.push(`/user/list`)
      }
    }
  }
}
</script>
