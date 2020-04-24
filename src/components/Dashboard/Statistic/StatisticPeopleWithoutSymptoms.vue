<template>
  <v-card
    class="statistic mx-auto"
    outlined
  >
    <v-card-title class="title ml-0 black--text">
      {{ $t('label.otg') }} <br> ({{ $t('label.people_without_symptoms') }})
    </v-card-title>
    <v-divider class="ma-0" />
    <v-card-text>
      <v-row>
        <v-col cols="12" md="12">
          <div>
            <span class="total total-process font-weight-bold">{{ 12495 | number }}</span>
            &nbsp;
            <span class="black--text">({{ (12.252).toFixed(2) | decimal }}%)</span>
            <br>
            {{ $t('label.process') }}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="7">
          <div>
            <span class="total total-done font-weight-bold">{{ 12495 | number }}</span>
            &nbsp;
            <span class="black--text">({{ (33.34).toFixed(2) | decimal }}%)</span>
            <br>
            {{ $t('label.done') }}
          </div>
        </v-col>
        <v-col cols="12" md="5">
          <div>
            <span class="total total-all font-weight-bold">{{ 12495 | number }}</span>
            <br>
            {{ $t('label.total_otg') }}
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'StatisticPeopleWithoutSymptoms'
}
</script>

<style scoped>
  .statistic .title {
    text-transform: none;
  }
  .statistic .total {
    color: #616161;
  }
  .statistic .total-process {
    font-size: 2rem;
  }
  .statistic .total-done {
    font-size: 1.5rem;
  }
  .statistic .total-all {
    font-size: 1.5rem;
  }
</style>
