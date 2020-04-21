<template>
  <v-card
    class="statistic mx-auto"
    outlined
  >
    <v-card-title class="title ml-0 black--text">
      PDP (Pasien Dalam Pengawasan)
    </v-card-title>
    <v-divider class="ma-0" />
    <v-card-text>
      <v-row class="align-md-end">
        <v-col cols="12" md="4">
          <div>
            <span class="total total-process font-weight-bold">12.456</span>
            &nbsp;
            <span class="black--text">(33.34%)</span>
            <br>
            Proses
            <br>
            Pengawasan
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div>
            <span class="total total-done font-weight-bold">2.456</span>
            &nbsp;
            <span class="black--text">(33.34%)</span>
            <br>
            Selesai
            <br>
            Pengawasan
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div>
            <span class="total total-all font-weight-bold">12.456</span>
            <br>
            Total
            <br>
            PDP
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'StatisticPatientUnderInvestigation'
}
</script>

<style scoped>
  .statistic .title {
    text-transform: none;
  }
  .statistic .total {
    color: #5AAA4E;
  }
  .statistic .total-process {
    font-size: 1.75rem;
  }
  .statistic .total-done {
    font-size: 1.55rem;
  }
  .statistic .total-all {
    font-size: 1.55rem;
  }
</style>
