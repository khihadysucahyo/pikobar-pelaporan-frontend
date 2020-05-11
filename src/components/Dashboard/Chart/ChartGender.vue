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
        {{ $t("label.gender") }}
      </v-card-title>
      <v-card-subtitle>
        {{ $t('label.positive') }} {{ $t('label.active') }}
      </v-card-subtitle>
      <v-divider class="mt-0 mb-2" />
      <v-card-text>
        <chart-doughnut
          v-if="loaded"
          ref="doughnutChart"
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
  name: 'ChartGender',
  props: {
    chartHeight: {
      type: Number,
      default: 300
    },
    loading: {
      type: Boolean,
      default: true
    },
    dataGender: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loaded: false,
      chartData: {
        labels: [this.$t('label.female'), this.$t('label.male')],
        datasets: [
          {
            data: [],
            backgroundColor: [
              '#F2C94C',
              '#27AE60'
            ]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
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
            title: (tooltipItem, data) => {
              return data['labels'][tooltipItem[0]['index']]
            },
            label: (tooltipItem, data) => {
              return 'Jumlah: ' + data['datasets'][0]['data'][tooltipItem['index']]
            },
            afterLabel: (tooltipItem, data) => {
              var dataset = data.datasets[tooltipItem.datasetIndex]
              var total = dataset.data.reduce((previousValue, currentValue, currentIndex, array) => {
                return previousValue + currentValue
              })
              var currentValue = dataset.data[tooltipItem.index]
              var percentage = Math.floor(((currentValue / total) * 100) + 0.5)
              return 'Persen: ' + percentage + '%'
            }
          }
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        animation: {
          animateScale: true,
          animateRotate: true
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
    dataGender: {
      handler(value) {
        const array = []
        array.push(value.female)
        array.push(value.male)

        this.chartData.datasets[0].data = array
      },
      deep: true
    },
    $refs() {
      this.$refs.doughnutChart.update()
    }
  },
  mounted() {
    this.loaded = true

    const array = []
    array.push(this.dataGender.female)
    array.push(this.dataGender.male)

    this.chartData.datasets[0].data = array
  }
}
</script>

<style scoped>
.chart .title {
  text-transform: none;
}
</style>
