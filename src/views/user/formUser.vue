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
    ])
  }
}
</script>
