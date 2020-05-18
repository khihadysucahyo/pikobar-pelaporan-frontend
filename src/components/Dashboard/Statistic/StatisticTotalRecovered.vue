<template>
  <v-skeleton-loader
    :loading="loading"
    type="article"
  >
    <v-card
      class="statistic mx-auto"
      outlined
    >
      <v-card-title class="title ml-0">
        {{ $t('label.recovery') }}
      </v-card-title>
      <v-card-subtitle class="sub-title pb-3">
        {{ $t('label.total_positive_case_recovered') }}
      </v-card-subtitle>
      <v-card-text class="mt-2">
        <span class="total black--text font-weight-bold">
          {{ totalRecovered | number }} {{ $t('label.people') | capitalize }}
        </span>
      </v-card-text>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
export default {
  name: 'StatisticTotalRecovered',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    totalRecovered: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
.statistic {
  background-color: rgba(127, 215, 164, 0.2) !important;
  border: 1px solid #2f9e5f !important;
}
.statistic .title {
  color: #2f9e5f !important;
}
.statistic .sub-title {
  height: 69px;
  max-height: 69px;
  color: #2f9e5f !important;
}
.statistic .total {
  font-size: 2em;
  color: #2f9e5f !important;
}
</style>
