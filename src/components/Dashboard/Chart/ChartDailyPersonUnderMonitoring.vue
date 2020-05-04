<template>
  <v-card
    class="chart mx-auto"
    outlined
  >
    <v-card-title class="title ml-0 black--text">
      {{ $t('label.daily_number') }} {{ $t('label.odp') }}
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
</template>

<script>
export default {
  name: 'ChartDailyPersonUnderMonitoring',
  props: {
    chartHeight: {
      type: Number,
      default: 300
    },
    filterData: {
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
            label: this.$t('label.done'),
            backgroundColor: '#56CCF2',
            hoverBackgroundColor: '#56CCF2',
            data: []
          },
          {
            label: this.$t('label.process'),
            backgroundColor: '#2D9CDB',
            hoverBackgroundColor: '#2D9CDB',
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
      },
      listQuery: {
        address_district_code: null,
        address_subdistrict_code: null,
        address_village_code: null
      },
      filter: null
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
    'filterData': {
      handler(value) {
        this.filter = value
        this.setFilter()
        this.getChartDaily()
      },
      deep: true
    },
    '$refs'() {
      this.$refs.barChart.update()
    }
  },
  beforeMount() {
    this.filter = this.filterData
    this.setFilter()
    this.getChartDaily()
  },
  methods: {
    setFilter() {
      if (this.filter.isVillage) {
        this.listQuery = {
          address_district_code: this.filter.city,
          address_subdistrict_code: this.filter.district,
          address_village_code: this.filter.village
        }
      } else if (this.filter.isDistrict) {
        this.listQuery = {
          address_district_code: this.filter.city,
          address_subdistrict_code: this.filter.district,
          address_village_code: null
        }
      } else if (this.filter.isCity) {
        this.listQuery = {
          address_district_code: this.filter.city,
          address_subdistrict_code: null,
          address_village_code: null
        }
      } else {
        this.listQuery = {
          address_district_code: null,
          address_subdistrict_code: null,
          address_village_code: null
        }
      }
    },
    async getChartDaily() {
      this.loaded = false
      try {
        const res = await this.$store.dispatch('statistic/countDailyODP', this.listQuery)

        if (res) this.loaded = true

        const label = []
        const done = []
        const process = []
        res.data.map((data) => {
          let date = new Date(data.date).getTime()
          date = this.$moment(date).format('DD/MM')
          label.push(date)
          done.push(data.selesai)
          process.push(data.proses)
        })
        this.chartData.labels = label
        this.chartData.datasets[0].data = done
        this.chartData.datasets[1].data = process
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>
.chart .title {
  text-transform: none;
}
</style>
