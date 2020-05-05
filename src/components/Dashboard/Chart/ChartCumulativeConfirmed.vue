<template>
  <v-skeleton-loader
    :loading="loading"
    type="article"
  >
    <v-card
      class="chart mx-auto"
      outlined
    >
      <v-card-title class="title ml-0 black--text">
        {{ $t('label.cumulative') }} {{ $t('label.positive') }} {{ $t('label.covid19') }}
      </v-card-title>
      <v-divider class="mt-0 mb-2" />
      <v-card-text>
        <chart-line
          v-if="loaded"
          ref="lineChart"
          :chart-data="chartData"
          :options="chartOptions"
          :styles="chartStyles"
        />
      </v-card-text>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
export default {
  name: 'ChartCumulativeConfirmed',
  props: {
    chartHeight: {
      type: Number,
      default: 300
    },
    loading: {
      type: Boolean,
      default: true
    },
    cData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loaded: false,
      chartData: {
        labels: [],
        datasets: [
          {
            fill: false,
            label: this.$t('label.active'),
            backgroundColor: '#EB5757',
            borderColor: '#EB5757',
            pointBackgroundColor: '#EB5757',
            pointBorderColor: '#EB5757',
            radius: 0,
            data: []
          },
          {
            fill: false,
            label: this.$t('label.recovery'),
            backgroundColor: '#27AE60',
            borderColor: '#27AE60',
            pointBackgroundColor: '#27AE60',
            pointBorderColor: '#27AE60',
            radius: 0,
            data: []
          },
          {
            fill: false,
            label: this.$t('label.dead'),
            backgroundColor: '#F2994A',
            borderColor: '#F2994A',
            pointBackgroundColor: '#F2994A',
            pointBorderColor: '#F2994A',
            radius: 0,
            data: []
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
                precision: 0,
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
          }
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
  watch: {
    'cData': {
      handler(value) {
        this.chartData.labels = value.label
        this.chartData.datasets[0].data = value.active
        this.chartData.datasets[1].data = value.recovery
        this.chartData.datasets[2].data = value.dead
      },
      deep: true
    },
    '$refs'() {
      this.$refs.lineChart.update()
    }
  },
  async mounted() {
    this.loaded = true

    this.chartData.labels = this.cData.label
    this.chartData.datasets[0].data = this.cData.active
    this.chartData.datasets[1].data = this.cData.recovery
    this.chartData.datasets[2].data = this.cData.dead
  }
}
</script>

<style scoped>
.chart .title {
  text-transform: none;
}
</style>
