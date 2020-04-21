<template>
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
        :chart-data="chartData"
        :options="chartOptions"
        :styles="chartStyles"
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ChartAge',
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
          // '90 - 100',
          // '80 - 90',
          // '70 - 80',
          // '60 - 70',
          // '50 - 60',
          // '40 - 50',
          // '30 - 40',
          // '20 - 30',
          // '10 - 20',
          // '0 - 10'
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
            label: 'Perempuan',
            backgroundColor: 'rgba(255, 124, 143, 1)',
            data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
          },
          {
            label: 'Laki-laki',
            backgroundColor: 'rgba(102, 164, 251, 1)',
            data: [-5, -10, -30, -40, -50, -60, -70, -80, -80, -85]
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
