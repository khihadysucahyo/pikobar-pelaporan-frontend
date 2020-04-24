<template>
  <v-card
    class="chart mx-auto"
    outlined
  >
    <v-card-title class="title ml-0 black--text">
      {{ $t('label.cumulative') }} {{ $t('label.odp') }}
    </v-card-title>
    <v-divider class="mt-0 mb-2" />
    <v-card-text>
      <chart-line
        v-if="loaded"
        :chart-data="chartData"
        :options="chartOptions"
        :styles="chartStyles"
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ChartCumulativePersonUnderMonitoring',
  props: {
    chartHeight: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      loaded: false,
      chartData: {
        labels: [
          '01/04',
          '02/04',
          '03/04',
          '04/04',
          '05/04',
          '06/04',
          '07/04',
          '08/04',
          '09/04',
          '10/04',
          '11/04',
          '12/04'
        ],
        datasets: [
          {
            fill: false,
            label: this.$t('label.done'),
            backgroundColor: '#56CCF2',
            borderColor: '#56CCF2',
            pointBackgroundColor: '#56CCF2',
            pointBorderColor: '#56CCF2',
            radius: 0,
            data: [10, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100]
          },
          {
            fill: false,
            label: this.$t('label.process'),
            backgroundColor: '#2D9CDB',
            borderColor: '#2D9CDB',
            pointBackgroundColor: '#2D9CDB',
            pointBorderColor: '#2D9CDB',
            radius: 0,
            data: [30, 35, 40, 45, 50, 55, 60, 70, 80, 90, 120, 130]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                min: 0
              },
              gridLines: {
                drawBorder: false
              },
              scaleLabel: {
                display: true,
                labelString: 'Value'
              }
            }
          ]
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 10
          },
          reverse: true
        },
        tooltips: {
          displayColors: false,
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: true
        }
      }
    }
  },
  computed: {
    chartStyles() {
      return {
        height: `${this.chartHeight}px`,
        position: 'relative'
      }
    }
  },
  async mounted() {
    this.loaded = true
  }
}
</script>

<style scoped>
  .chart .title {
    text-transform: none;
  }
</style>
