<template>
  <user-form
    :form-user="formUser"
    :id-data="idData"
    :is-edit="true"
  />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'EditUser',
  data: () => ({
    idData: null
  }),
  computed: {
    ...mapGetters('user', [
      'formUser'
    ])
  },
  async mounted() {
    let response
    if (this.$route.params.id) {
      this.idData = this.$route.params.id
      response = await this.$store.dispatch('user/detailUser', this.idData)
    } else {
      response = await this.$store.dispatch('user/infoCurrentUser')
      this.idData = response.data.id
      response.data['unit_id'] = response.data.unit_id._id
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
