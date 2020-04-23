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
  }
}
</script>
