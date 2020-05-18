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
        {{ $t('label.positive') }} {{ $t('label.active') }}
      </v-card-title>
      <v-card-subtitle class="sub-title pb-3">
        {{ $t('label.positive_active_redaction') }}
      </v-card-subtitle>
      <v-card-text class="mt-2">
        <span class="total font-weight-bold">
          {{ totalActive | number }} {{ $t('label.people') | capitalize }}
        </span>
      </v-card-text>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
export default {
  name: 'StatisticTotalActive',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    totalActive: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
.statistic {
  background-color: #fdeded !important;
  border: 1px solid #eb5757 !important;
}
.statistic .title {
  color: #eb5757 !important;
}
.statistic .sub-title {
  height: 69px;
  max-height: 69px;
  color: #eb5757 !important;
}
.statistic .total {
  font-size: 2em;
  color: #eb5757 !important;
}
</style>
