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
      <v-card-subtitle class="subtitle pb-3">
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
      default: 1290
    }
  }
}
</script>

<style scoped>
  .statistic {
    background-color: #FDEDED !important;
    border: 1px solid #EB5757 !important;
  }
  .statistic .title {
    color: #EB5757 !important;
  }
  .statistic .subtitle {
    height: 69px;
    max-height: 69px;
    color: #EB5757 !important;
  }
  .statistic .total {
    font-size: 2em;
    color: #EB5757 !important;
  }
</style>
