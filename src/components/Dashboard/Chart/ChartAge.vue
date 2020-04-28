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
        {{ $t('label.age') }}
      </v-card-title>
      <v-divider class="mt-0 mb-2" />
      <v-card-text>
        <chart-bar-horizontal
          v-if="loaded"
          ref="horizontalBarChart"
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
  name: 'ChartAge',
  props: {
    chartHeight: {
      type: Number,
      default: 300
    },
    loading: {
      type: Boolean,
      default: true
    },
    dataAge: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loaded: false,
      chartData: {
        labels: [
          '0 - 10',
          '10 - 20',
          '20 - 30',
          '30 - 40',
          '40 - 50',
          '50 - 60',
          '60 - 70',
          '70 - 80',
          '80 - 90',
          '90 - 100'
        ],
        datasets: [
          {
            label: this.$t('label.female'),
            backgroundColor: 'rgba(255, 124, 143, 1)',
            data: []
          },
          {
            label: this.$t('label.male'),
            backgroundColor: 'rgba(102, 164, 251, 1)',
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
                drawBorder: false
              },
              ticks: {
                precision: 0,
                callback: function(value, index, values) {
                  return Math.abs(value)
                }
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              },
              stacked: true,
              ticks: {
                reverse: true
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
          intersect: false,
          callbacks: {
            label: function(items, data) {
              return data.datasets[items.datasetIndex].label + ': ' + Math.abs(items.xLabel)
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
    'dataAge': {
      handler(value) {
        this.chartData.datasets[0].data = value.female
        this.chartData.datasets[1].data = value.male
        this.$refs.horizontalBarChart.update()
      },
      deep: true
    }
  },
  mounted() {
    this.loaded = true

    this.chartData.datasets[0].data = this.dataAge.female
    this.chartData.datasets[1].data = this.dataAge.male
  }
}
</script>

<style scoped>
  .chart .title {
    text-transform: none;
  }
</style>
