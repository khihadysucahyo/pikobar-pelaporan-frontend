<template>
  <form>
    <v-text-field
      v-model="listQuery.search"
      :label="$t('label.search')"
      solo-inverted
      flat
      hide-details
      clearable
      prepend-inner-icon="search"
      @keyup.enter.native="handleSearch"
    />
  </form>
</template>

<script>
export default {
  name: 'Search',
  props: {
    listQuery: {
      type: Object,
      default: null
    },
    handleSearch: {
      type: Function,
      default: null
    }
  }
}
</script>
