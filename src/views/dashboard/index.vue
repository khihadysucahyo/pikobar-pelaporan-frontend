<template>
  <v-container fluid grid-list-xl py-0 mb-5>
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
    <v-row class="mb-3">
      <v-col
        cols="12"
        md="6"
      >
        <statistic-person-under-monitoring />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <statistic-patient-under-investigation />
      </v-col>
    </v-row>
    <v-tabs>
      <v-tab
        :key="'daily'"
        :href="'#tab-daily'"
      >
        Angka Harian
      </v-tab>
      <v-tab
        :key="'cumulative'"
        :href="'#tab-cumulative'"
      >
        Kumulatif
      </v-tab>
      <v-tab-item
        :key="'daily'"
        :value="'tab-daily'"
      >
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <chart-daily-person-under-monitoring />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <chart-daily-patient-under-investigation />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <chart-daily-confirmed />
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item
        :key="'cumulative'"
        :value="'tab-cumulative'"
      >
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <chart-cumulative-person-under-monitoring />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <chart-cumulative-patient-under-investigation />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <chart-cumulative-confirmed />
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs>
    <v-row>
      <v-col
        cols="12"
      >
        <map-point />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <chart-gender />
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <chart-age />
      </v-col>
    </v-row>
    <!-- <card-data /> -->
  </v-container>
</template>

<script>
export default {
}
</script>
