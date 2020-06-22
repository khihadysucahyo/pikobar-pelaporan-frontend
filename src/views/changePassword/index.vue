<template>
  <div class="change-password">
    <v-row>
      <v-col auto>
        <v-card
          class="mx-auto"
          max-width="600"
          outlined
        >
          <v-list-item>
            <v-list-item-content>
              <v-form
                id="change-password-form"
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-text-field
                  v-model="changePasswordForm.password"
                  :rules="passwordRules"
                  :append-icon="typePassword ? 'visibility' : 'visibility_off'"
                  :type="typePassword ? 'password' : 'text'"
                  label="Password baru"
                  name="password"
                  solo
                  @click:append="() => (typePassword = !typePassword)"
                />
                <v-text-field
                  v-model="changePasswordForm.repeat_password"
                  :rules="repeatPasswordRules"
                  :append-icon="typeRepeatPassword ? 'visibility' : 'visibility_off'"
                  :type="typeRepeatPassword ? 'password' : 'text'"
                  label="Konfirmasi password baru"
                  name="repeat_password"
                  solo
                  @click:append="() => (typeRepeatPassword = !typeRepeatPassword)"
                  @keyup.enter.native="handleChangePassword"
                />
              </v-form>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="justify-center">
            <v-btn
              color="primary"
              @click="handleChangePassword"
            >
              Ganti Password
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ChangePassword',
  data() {
    return {
      valid: true,
      typePassword: String,
      typeRepeatPassword: String,
      loading: false,
      changePasswordForm: {
        password: '',
        repeat_password: ''
      },
      passwordRules: [
        v => !!v || this.$t('errors.new_password_must_be_filled'),
        v => (v && v.length >= 5) || this.$t('errors.new_password_must_be_more_than_characters')
      ],
      repeatPasswordRules: [
        v => !!v || this.$t('errors.confirm_new_password_must_be_filled'),
        v => (v && v.length >= 5) || this.$t('errors.confirm_new_password_must_be_more_than_characters'),
        v => (v && v === this.changePasswordForm.password) || this.$t('errors.confirm_new_password_not_same')
      ]
    }
  },
  methods: {
    handleChangePassword() {
      if (this.$refs.form.validate()) {
        this.loading = true
        if (this.$route.params.id) {
          this.$store.dispatch('user/editUser', { id: this.$route.params.id, data: { password: this.changePasswordForm.password }})
            .then(() => {
              this.$store.dispatch('toast/successToast', 'Password berhasil dirubah')
              this.$router.push({ path: '/user/list' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
              this.$refs.form.reset()
            })
        } else {
          this.$store.dispatch('user/changePasswordUser', { password: this.changePasswordForm.password })
            .then(() => {
              this.$store.dispatch('toast/successToast', 'Password berhasil dirubah')
              this.$store.dispatch('user/resetToken')
              this.$router.push({ path: '/login' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
              this.$refs.form.reset()
            })
        }
      }
    }
  }
}
</script>
