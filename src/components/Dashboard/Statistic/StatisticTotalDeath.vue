<template>
  <v-card
    class="statistic mx-auto"
    outlined
  >
    <v-card-title class="title ml-0">
      {{ $t('label.dead') }}
    </v-card-title>
    <v-card-subtitle class="subtitle pb-3">
      Jumlah kasus positif yang meninggal
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
  name: 'StatisticTotalDeath'
}
</script>

<style scoped>
  .statistic {
    background-color: #FFF3E0 !important;
    border: 1px solid #F2994A !important;
  }
  .statistic .title {
    color: #F2994A !important;
  }
  .statistic .subtitle {
    height: 69px;
    max-height: 69px;
    color: #F2994A !important;
  }
  .statistic .total {
    font-size: 2em;
    color: #F2994A !important;
  }
</style>
