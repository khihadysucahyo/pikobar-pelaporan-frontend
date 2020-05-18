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
      <v-card-subtitle>
        {{ $t('label.positive') }} {{ $t('label.active') }}
      </v-card-subtitle>
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
          '<5',
          '6 - 19',
          '20 - 29',
          '30 - 39',
          '40 - 49',
          '50 - 59',
          '60 - 69',
          '70 - 79',
          '>80'
        ],
        datasets: [
          {
            label: this.$t('label.female'),
            backgroundColor: '#F2C94C',
            data: []
          },
          {
            label: this.$t('label.male'),
            backgroundColor: '#27AE60',
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
                callback: (value, index, values) => {
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
            label: (items, data) => {
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
        this.setMinMax(value.female, value.male)
      },
      deep: true
    },
    '$refs'() {
      this.$refs.horizontalBarChart.update()
    }
  },
  mounted() {
    this.loaded = true

    this.chartData.datasets[0].data = this.dataAge.female
    this.chartData.datasets[1].data = this.dataAge.male
    this.setMinMax(this.dataAge.female, this.dataAge.male)
  },
  methods: {
    setMinMax(female, male) {
      const maxFemale = Math.max(...female)
      const maxMale = Math.max(...male)
      const max = (maxFemale > maxMale) ? maxFemale : maxMale

      this.chartOptions.scales.xAxes[0].ticks.min = -Math.abs(max)
      this.chartOptions.scales.xAxes[0].ticks.max = max
    }
  }
}
</script>

<style scoped>
.chart .title {
  text-transform: none;
}
</style>
