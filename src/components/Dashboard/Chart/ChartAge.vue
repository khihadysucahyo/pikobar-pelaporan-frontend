<template>
  <v-skeleton-loader
    :loading="loading"
    type="article"
  >
    <v-card
      class="chart mx-auto"
      outlined
    >
      <v-card-title class="title ml-0 mb-3 black--text">
        {{ $t('label.age') }}
      </v-card-title>
      <v-card-subtitle>
        <v-col
          cols="5"
          class="pa-0"
        >
          <select-status
            :selected-status="selectedStatus"
            :on-select-status="onSelectStatus"
          />
        </v-col>
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
    listQuery: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
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
      },
      params: null,
      selectedStatus: 'POSITIF-0'
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
    listQuery: {
      handler(value) {
        this.params = value
        this.getStatisticGender()
      },
      deep: true
    },
    '$refs'() {
      this.$refs.horizontalBarChart.update()
    }
  },
  mounted() {
    this.loaded = true
    this.params = this.listQuery
    this.getStatisticGender()
  },
  methods: {
    async getStatisticGender() {
      this.params.status = (this.selectedStatus === 'POSITIF-0') ? null : this.selectedStatus

      this.loading = true
      const res = await this.$store.dispatch('statistic/countAgeGender', this.params)

      if (res) this.loading = false

      const male_age = []
      const female_age = []
      const groupMale = res.data.ageGroupMale
      const groupFemale = res.data.ageGroupFemale
      const m1 = groupMale.find(x => x._id === 'bawah_5')
      const m2 = groupMale.find(x => x._id === '6_19')
      const m3 = groupMale.find(x => x._id === '20_29')
      const m4 = groupMale.find(x => x._id === '30_39')
      const m5 = groupMale.find(x => x._id === '40_49')
      const m6 = groupMale.find(x => x._id === '50_59')
      const m7 = groupMale.find(x => x._id === '60_69')
      const m8 = groupMale.find(x => x._id === '70_79')
      const m9 = groupMale.find(x => x._id === 'atas_80')
      const f1 = groupFemale.find(x => x._id === 'bawah_5')
      const f2 = groupFemale.find(x => x._id === '6_19')
      const f3 = groupFemale.find(x => x._id === '20_29')
      const f4 = groupFemale.find(x => x._id === '30_39')
      const f5 = groupFemale.find(x => x._id === '40_49')
      const f6 = groupFemale.find(x => x._id === '50_59')
      const f7 = groupFemale.find(x => x._id === '60_69')
      const f8 = groupFemale.find(x => x._id === '70_79')
      const f9 = groupFemale.find(x => x._id === 'atas_80')

      male_age.push(-Math.abs(this.checkVariable(m1)))
      male_age.push(-Math.abs(this.checkVariable(m2)))
      male_age.push(-Math.abs(this.checkVariable(m3)))
      male_age.push(-Math.abs(this.checkVariable(m4)))
      male_age.push(-Math.abs(this.checkVariable(m5)))
      male_age.push(-Math.abs(this.checkVariable(m6)))
      male_age.push(-Math.abs(this.checkVariable(m7)))
      male_age.push(-Math.abs(this.checkVariable(m8)))
      male_age.push(-Math.abs(this.checkVariable(m9)))
      female_age.push(this.checkVariable(f1))
      female_age.push(this.checkVariable(f2))
      female_age.push(this.checkVariable(f3))
      female_age.push(this.checkVariable(f4))
      female_age.push(this.checkVariable(f5))
      female_age.push(this.checkVariable(f6))
      female_age.push(this.checkVariable(f7))
      female_age.push(this.checkVariable(f8))
      female_age.push(this.checkVariable(f9))

      this.chartData.datasets[0].data = female_age
      this.chartData.datasets[1].data = male_age
      this.setMinMax(female_age, male_age)
    },
    async onSelectStatus(value) {
      this.selectedStatus = value
      this.getStatisticGender()
    },
    setMinMax(female, male) {
      const maxFemale = Math.max(...female)
      const minMale = Math.min(...male)
      const max = (maxFemale > Math.abs(minMale)) ? maxFemale : Math.abs(minMale)

      let plus = 0
      const last = max % 10
      if (max > 10) {
        plus = (last < 5) ? 10 - last : 15 - last
      }

      this.chartOptions.scales.xAxes[0].ticks.min = -Math.abs(max + plus)
      this.chartOptions.scales.xAxes[0].ticks.max = max + plus
    },
    checkVariable(variable) {
      if (typeof variable === 'undefined' || variable === null) {
        return 0
      }
      return Number(variable.count)
    }
  }
}
</script>

<style scoped>
.chart .title {
  text-transform: none;
}
</style>
