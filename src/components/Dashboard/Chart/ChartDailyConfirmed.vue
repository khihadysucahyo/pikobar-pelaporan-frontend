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
        {{ $t('label.daily_number') }} {{ $t('label.positive') }} {{ $t('label.covid19') }}
      </v-card-title>
      <v-divider class="mt-0 mb-2" />
      <v-card-text>
        <chart-bar
          v-if="loaded"
          ref="barChart"
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
  name: 'ChartDailyConfirmed',
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
            label: this.$t('label.dead'),
            backgroundColor: '#F2994A',
            hoverBackgroundColor: '#F2994A',
            data: []
          },
          {
            label: this.$t('label.recovery'),
            backgroundColor: '#27AE60',
            hoverBackgroundColor: '#27AE60',
            data: []
          },
          {
            label: this.$t('label.active'),
            backgroundColor: '#EB5757',
            hoverBackgroundColor: '#EB5757',
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
              },
              stacked: true
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
              },
              stacked: true
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
        this.chartData.datasets[0].data = value.dead
        this.chartData.datasets[1].data = value.recovery
        this.chartData.datasets[2].data = value.active
      },
      deep: true
    },
    '$refs'() {
      this.$refs.barChart.update()
    }
  },
  mounted() {
    this.loaded = true

    this.chartData.labels = this.cData.label
    this.chartData.datasets[0].data = this.cData.dead
    this.chartData.datasets[1].data = this.cData.recovery
    this.chartData.datasets[2].data = this.cData.active
  }
}
</script>

<style scoped>
.chart .title {
  text-transform: none;
}
</style>
