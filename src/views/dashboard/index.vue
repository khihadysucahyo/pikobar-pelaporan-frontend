<template>
  <v-container fluid grid-list-xl py-0>
    <v-row>
      <v-col
        cols="12"
        md="3"
        sm="6"
      >
        <statistic-total-confirmed />
      </v-col>
      <v-col
        cols="12"
        md="3"
        sm="6"
      >
        <statistic-total-active />
      </v-col>
      <v-col
        cols="12"
        md="3"
        sm="6"
      >
        <statistic-total-recovered />
      </v-col>
      <v-col
        cols="12"
        md="3"
        sm="6"
      >
        <statistic-total-death />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <chart-daily-person-under-monitoring />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <chart-daily-patient-under-investigation />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
      >
        <map-point />
      </v-col>
    </v-row>
    <!-- <card-data /> -->
  </v-container>
</template>

<script>
export default {
}
</script>
