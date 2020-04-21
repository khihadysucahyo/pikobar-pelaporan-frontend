<template>
  <v-card
    class="statistic mx-auto"
    outlined
  >
    <v-card-title class="title ml-0">
      {{ $t('label.recovery') }}
    </v-card-title>
    <v-card-subtitle class="subtitle pb-3">
      Jumlah kasus positif yang sembuh
    </v-card-subtitle>
    <v-card-text class="mt-2">
      <span class="total black--text font-weight-bold">
        {{ 1290 | number }} {{ $t('label.people') | capitalize }}
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'StatisticTotalRecovered'
}
</script>

<style scoped>
  .statistic {
    background-color: rgba(127, 215, 164, 0.2) !important;
    border: 1px solid #2F9E5F !important;
  }
  .statistic .title {
    color: #2F9E5F !important;
  }
  .statistic .subtitle {
    height: 69px;
    max-height: 69px;
    color: #2F9E5F !important;
  }
  .statistic .total {
    font-size: 2em;
    color: #2F9E5F !important;
  }
</style>
