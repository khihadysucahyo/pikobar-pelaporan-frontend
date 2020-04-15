<template>
  <v-card
    class="chart mx-auto"
    outlined
  >
    <v-card-title class="title ml-0 black--text">
      Angka Harian ODP
    </v-card-title>
    <v-card-subtitle class="subtitle mb-3">
      (Orang Dalam Pemantauan)
    </v-card-subtitle>
    <v-card-text>
      <chart-bar
        v-if="loaded"
        :chartdata="chartData"
        :options="chartOptions"
        :styles="chartStyles"
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ChartDailyPersonUnderMonitoring',
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
            label: 'Selesai Pemantauan',
            backgroundColor: '#89D06E',
            hoverBackgroundColor: '#89D06E',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          },
          {
            label: 'Proses Pemantauan',
            backgroundColor: '#5AB55B',
            hoverBackgroundColor: '#5AB55B',
            data: [40, 20, 12, 39, 10, 40, 39, 10, 40, 20, 12, 11]
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
          }
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
        height: `325px`,
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
