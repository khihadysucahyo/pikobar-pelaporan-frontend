<template>
  <v-row>
    <v-col auto>
      <v-data-table
        :key="list.length"
        :headers="tableHeaders"
        :items="list"
        :mobile-breakpoint="NaN"
        :no-data-text="$t('label.data_empty')"
        :items-per-page="listQuery.limit"
        hide-default-footer
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DailyReportTable',
  props: {
    list: {
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
