<template>
  <user-detail
    :title-detail="$t('label.detail_user')"
    :id-data="this.$route.params.id"
  />
</template>

<script>
export default {
  name: 'Detail'
}
</script>
