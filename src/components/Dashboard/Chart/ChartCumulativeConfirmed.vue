<template>
  <v-card
    class="chart mx-auto"
    outlined
  >
    <v-card-title class="title ml-0 black--text">
      Kumulatif Terkonfirmasi
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
  name: 'ChartCumulativeConfirmed',
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
            label: 'Aktif',
            backgroundColor: '#EB5757',
            borderColor: '#EB5757',
            pointBackgroundColor: '#EB5757',
            pointBorderColor: '#EB5757',
            radius: 0,
            data: [30, 35, 40, 45, 50, 55, 60, 70, 80, 90, 120, 130]
          },
          {
            fill: false,
            label: 'Sembuh',
            backgroundColor: '#27AE60',
            borderColor: '#27AE60',
            pointBackgroundColor: '#27AE60',
            pointBorderColor: '#27AE60',
            radius: 0,
            data: [10, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100]
          },
          {
            fill: false,
            label: 'Meninggal',
            backgroundColor: '#F2994A',
            borderColor: '#F2994A',
            pointBackgroundColor: '#F2994A',
            pointBorderColor: '#F2994A',
            radius: 0,
            data: [5, 10, 15, 20, 25, 30, 35, 36, 37, 40, 50, 70]
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
        height: `300px`,
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
