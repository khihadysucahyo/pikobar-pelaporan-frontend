<template>
  <div>
    <participant-detail
      :title-detail="title"
      :id-data="this.$route.params.id"
    />
    <update-result-form
      :id-result="this.$route.params.id"
    />
  </div>
</template>

<script>
export default {
  name: 'UpdateResult',
  data() {
    return {
      title: 'Update Hasil Peserta'
    }
  }
}
</script>
