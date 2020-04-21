<template>
  <v-card
    class="statistic mx-auto"
    outlined
  >
    <v-card-title class="title ml-0">
      {{ $t('label.positive') }} {{ $t('label.covid19') }}
    </v-card-title>
    <v-card-subtitle class="subtitle pb-3">
      Jumlah Kasus yang terkonfirmasi COVID-19
    </v-card-subtitle>
    <v-card-text class="mt-2">
      <span class="total font-weight-bold">
        {{ 1290 | number }} {{ $t('label.people') | capitalize }}
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'StatisticTotalConfirmed'
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
