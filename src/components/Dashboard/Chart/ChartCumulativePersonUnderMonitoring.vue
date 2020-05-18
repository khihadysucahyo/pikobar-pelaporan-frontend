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
        {{ $t('label.cumulative') }} {{ $t('label.odp') }}
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
  name: 'ChartCumulativePersonUnderMonitoring',
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
            label: this.$t('label.done'),
            backgroundColor: '#56CCF2',
            borderColor: '#56CCF2',
            pointBackgroundColor: '#56CCF2',
            pointBorderColor: '#56CCF2',
            radius: 0,
            data: []
          },
          {
            fill: false,
            label: this.$t('label.process'),
            backgroundColor: '#2D9CDB',
            borderColor: '#2D9CDB',
            pointBackgroundColor: '#2D9CDB',
            pointBorderColor: '#2D9CDB',
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
                labelString: this.$t('label.total_case')
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
          mode: 'label',
          intersect: false,
          callbacks: {
            label: (tooltipItem, data) => {
              const status = data.datasets[tooltipItem.datasetIndex].label
              const valor = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]

              let total = 0
              for (let i = 0; i < data.datasets.length; i++) { total += data.datasets[i].data[tooltipItem.index] }

              if (tooltipItem.datasetIndex !== data.datasets.length - 1) {
                return status + ' : ' + valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
              } else {
                return [status + ' : ' + valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '), 'Total : ' + total]
              }
            }
          }
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
        this.chartData.datasets[0].data = value.done
        this.chartData.datasets[1].data = value.process
      },
      deep: true
    },
    '$refs'() {
      this.$refs.lineChart.update()
    }
  },
  mounted() {
    this.loaded = true

    this.chartData.labels = this.cData.label
    this.chartData.datasets[0].data = this.cData.done
    this.chartData.datasets[1].data = this.cData.process
  }
}
</script>

<style scoped>
.chart .title {
  text-transform: none;
}
</style>
