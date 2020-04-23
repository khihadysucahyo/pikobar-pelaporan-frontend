<template>
  <user-form
    :form-user="formUser"
  />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FormUser',
  computed: {
    ...mapGetters('user', [
      'formUser'
    ]),
    ...mapGetters('user', [
      'roles',
      'district_user',
      'district_name_user'
    ])
  },
  async mounted() {
    await this.$store.dispatch('user/resetForm')
    if (this.roles[0] !== 'dinkesprov') {
      this.formUser.code_district_city = this.district_user
      this.formUser.name_district_city = this.district_name_user
    }
  }
}
</script>
