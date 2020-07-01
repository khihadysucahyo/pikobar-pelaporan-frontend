<template>
  <user-form
    :form-user="formUser"
    :id-data="this.$route.params.id"
    :is-edit="true"
  />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'EditUser',
  computed: {
    ...mapGetters('user', [
      'formUser'
    ])
  },
  async mounted() {
    let response
    if (this.$route.params.id) {
      response = await this.$store.dispatch('user/detailUser', this.$route.params.id)
    } else {
      response = await this.$store.dispatch('user/infoCurrentUser')
    }
    await delete response.data['__v']
    await delete response.data['updatedAt']
    await delete response.data['createdAt']
    await delete response.data['hash']
    await delete response.data['salt']
    await Object.assign(this.formUser, response.data)
  }
}
</script>
