<template>
  <detail-patient
    :title-detail="$t('label.detail_case')"
    :id-data="this.$route.params.id"
  />
</template>

<script>
export default {
  name: 'Detail'
}
</script>
