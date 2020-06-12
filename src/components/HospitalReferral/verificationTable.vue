<template>
  <v-col auto>
    <v-data-table
      :key="listReferral.length"
      :headers="tableHeaders"
      :items="listReferral"
      :mobile-breakpoint="NaN"
      :no-data-text="$t('label.data_empty')"
      :items-per-page="listQuery.limit"
      hide-default-footer
    />
  </v-col>
</template>

<script>
export default {
  name: 'VerificationTableReferral',
  props: {
    listReferral: {
      type: Array,
      default: null
    },
    listQuery: {
      type: Object,
      default: null
    },
    tableHeaders: {
      type: Array,
      default: null
    }
  }
}
</script>

<style scoped>

</style>
