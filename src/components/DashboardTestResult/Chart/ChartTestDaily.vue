<template>
  <v-card
    class="chart-test-daily"
    outlined
  >
    <v-card-title class="title ml-0 black--text">
      {{ $t('label.growth') }} {{ $t('label.total_test_result') }} {{ label }}
      <div
        v-if="tabActive === 'rapid'"
        class="sample d-flex ml-auto"
      >
        <div class="mr-3">{{ $t('label.sample_taken') }}</div>
        <v-checkbox
          v-model="sampleActive"
          class="vena pt-0 mr-3"
          :label="$t('label.vena')"
          value="vena"
          @change="filterSample()"
        />
        <v-checkbox
          v-model="sampleActive"
          class="kapiler pt-0"
          :label="$t('label.kapiler')"
          value="kapiler"
          @change="filterSample()"
        />
      </div>
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
  name: 'ChartTestDaily',
  props: {
    tabActive: {
      type: String,
      default: null
    },
    chartHeight: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      loaded: false,
      label: null,
      sampleActive: ['vena', 'kapiler'],
      chartData: {
        labels: [],
        datasets: []
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
              ticks: {
                callback: (label) => {
                  return this.$moment(new Date(label)).format('DD/MM')
                }
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
                labelString: this.$t('label.total_test_result')
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
          callbacks: {
            title: (item) => {
              return this.$moment(item[0].label).format('DD/MM')
            }
          }
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
    'tabActive': {
      handler(value) {
        this.tabActive = value
        this.filterTab()
        this.$refs.barChart.update()
      },
      deep: true
    },
    '$refs'() {
      this.$refs.barChart.update()
    }
  },
  mounted() {
    this.filterTab()
  },
  methods: {
    filterTab() {
      this.loaded = true
      if (this.tabActive === 'all') {
        this.label = null
        this.getDataAll()
      } else if (this.tabActive === 'rapid') {
        this.label = this.$t('label.rapid')
        this.getDataRapid()
      } else if (this.tabActive === 'pcr') {
        this.label = this.$t('label.pcr')
        this.getDataPCR()
      }
    },
    filterSample() {
      this.getDataRapid()
      this.$refs.barChart.update()
    },
    getDataAll() {
      const date = []
      const one = []
      const two = []

      for (let index = 0; index <= 9; index++) {
        date.push('2020-07-1' + index)
        one.push(this.randomNumber())
        two.push(this.randomNumber())
      }

      this.chartData.labels = date

      this.chartData.datasets = []
      this.chartData.datasets.push(
        {
          label: this.$t('label.rapid_test_id'),
          backgroundColor: '#27AE60',
          hoverBackgroundColor: '#27AE60',
          data: one
        },
        {
          label: this.$t('label.pcr'),
          backgroundColor: '#F2C94C',
          hoverBackgroundColor: '#F2C94C',
          data: two
        }
      )
    },
    getDataRapid() {
      const date = []
      const one = []
      const two = []
      const three = []

      for (let index = 0; index <= 9; index++) {
        date.push('2020-07-1' + index)
        one.push(this.randomNumber())
        two.push(this.randomNumber())
        three.push(this.randomNumber())
      }

      this.chartData.labels = date

      this.chartData.datasets = []
      this.chartData.datasets.push(
        {
          label: this.$t('label.reaktif'),
          backgroundColor: '#27AE60',
          hoverBackgroundColor: '#27AE60',
          data: one
        },
        {
          label: this.$t('label.non_reaktif'),
          backgroundColor: '#F2C94C',
          hoverBackgroundColor: '#F2C94C',
          data: two
        },
        {
          label: this.$t('label.inkonklusif'),
          backgroundColor: '#2F80ED',
          hoverBackgroundColor: '#2F80ED',
          data: two
        }
      )
    },
    getDataPCR() {
      const date = []
      const one = []
      const two = []
      const three = []

      for (let index = 0; index <= 9; index++) {
        date.push('2020-07-1' + index)
        one.push(this.randomNumber())
        two.push(this.randomNumber())
        three.push(this.randomNumber())
      }

      this.chartData.labels = date

      this.chartData.datasets = []
      this.chartData.datasets.push(
        {
          label: this.$t('label.positif'),
          backgroundColor: '#27AE60',
          hoverBackgroundColor: '#27AE60',
          data: one
        },
        {
          label: this.$t('label.negatif'),
          backgroundColor: '#F2C94C',
          hoverBackgroundColor: '#F2C94C',
          data: two
        },
        {
          label: this.$t('label.invalid'),
          backgroundColor: '#2F80ED',
          hoverBackgroundColor: '#2F80ED',
          data: two
        }
      )
    },
    randomNumber() {
      return Math.floor(Math.random() * 101)
    }
  }
}
</script>

<style lang="scss">
.chart-test-daily {
  .title {
    font-size: 16px !important;

    .sample {
      font-size: 0.875rem;
      font-weight: normal;

      .vena,
      .kapiler {
        margin-top: 2px;

        .v-input__slot {
          margin-bottom: 0;
        }

        .v-messages {
          display: none;
        }
      }
    }
  }
}
</style>
