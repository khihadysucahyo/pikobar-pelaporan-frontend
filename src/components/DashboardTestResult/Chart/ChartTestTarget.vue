<template>
  <v-card
    class="chart-test-target"
    outlined
  >
    <v-card-title class="title ml-0 black--text">
      {{ $t('label.total_test_result') }} {{ $t('label.based').toLowerCase() }} {{ $t('label.target') }}
    </v-card-title>
    <v-divider class="mt-0 mb-2" />
    <v-card-text>
      <div class="chartWrapper">
        <div class="chartAreaWrapper">
          <chart-bar-horizontal
            v-if="loaded"
            ref="horizontalBarChart"
            :chart-data="chartData"
            :options="chartOptions"
            :styles="chartStyles"
            :name="'chart-test-target'"
            @callbackChart="setChart"
          />
        </div>
        <div
          ref="chartLegend"
          class="mt-2"
        >
          <div class="chart-legend d-flex justify-center">
            <div
              v-for="(legend, index) in legends"
              :key="legend.label"
              class="d-flex mr-3"
              @click="onClickLegend(index)"
            >
              <div
                class="box mr-2"
                :style="{ backgroundColor: legend.backgroundColor }"
              />
              <span :ref="'chartLegendLabel' + index">{{ legend.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ChartTestTarget',
  props: {
    tabActive: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loaded: false,
      charts: null,
      legends: [],
      chartStyles: {},
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
                display: false,
                drawBorder: false
              },
              scaleLabel: {
                display: false
              },
              ticks: {
                display: false,
                beginAtZero: true,
                max: 100,
                precision: 0
              },
              stacked: true
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                display: false
              },
              stacked: true
            }
          ]
        },
        legend: {
          display: false,
          position: 'bottom',
          labels: {
            boxWidth: 10
          }
        },
        legendCallback: (chart) => {
          this.charts = chart
          this.legends = chart.data.datasets
        },
        tooltips: {
          displayColors: false,
          mode: 'index',
          intersect: false,
          tooltipCaretSize: 0,
          callbacks: {
            label: (tooltipItem, data) => {
              const dataset = data.datasets[tooltipItem.datasetIndex]
              return dataset.label + ': ' + dataset.data[tooltipItem.index] + '%'
            }
          }
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        layout: {
          padding: {
            top: 5,
            right: 20
          }
        }
      }
    }
  },
  watch: {
    'tabActive': {
      handler(value) {
        this.tabActive = value
        this.filterTab()
        this.$refs.horizontalBarChart.update()
      },
      deep: true
    },
    '$refs'() {
      this.$refs.horizontalBarChart.update()
    }
  },
  mounted() {
    this.filterTab()
  },
  methods: {
    filterTab() {
      this.loaded = true
      if (this.tabActive === 'all') {
        this.getDataAll()
      } else if (this.tabActive === 'rapid') {
        this.getDataRapid()
      } else if (this.tabActive === 'pcr') {
        this.getDataPCR()
      }
    },
    getDataAll() {
      const area = [
        'ODP',
        'OTG',
        'Pemuka Agama',
        'Pusat Keramaian',
        'Pelaku Perjalanan',
        'Ulama',
        'Pedagang Pasar',
        'Tenaga Kesehatan',
        'Kontak Erat',
        'Pendaftar Pikobar',
        'Asd',
        'Dsa',
        'sdjfh'
      ]
      const one = []
      const two = []

      this.setHeight(area.length)

      for (let index = 1; index <= 13; index++) {
        const r = this.randomNumber()
        const t = 100 - r
        one.push(r)
        two.push(t)
      }

      this.chartData.labels = area

      this.chartData.datasets = []
      this.chartData.datasets.push(
        {
          label: this.$t('label.test_already'),
          backgroundColor: '#27AE60',
          hoverBackgroundColor: '#27AE60',
          data: one,
          hidden: false,
          barThickness: 15
        },
        {
          label: `${this.$t('label.total')} ${this.$t('label.goals')}`,
          backgroundColor: '#E0E0E0',
          hoverBackgroundColor: '#E0E0E0',
          data: two,
          hidden: false,
          barThickness: 15
        }
      )
    },
    getDataRapid() { },
    getDataPCR() { },
    randomNumber() {
      return Math.floor(Math.random() * 101)
    },
    setChart(chart) {
      const ctx = chart.chart.ctx
      ctx.font = 'normal 12px Arial'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'bottom'

      this.chartData.datasets.forEach((dataset) => {
        for (var i = 0; i < dataset.data.length; i++) {
          const model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model
          const left = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._xScale.left
          ctx.fillStyle = '#757575'
          const label = model.label
          ctx.fillText(label, left, model.y + -10)
        }
      })
    },
    onClickLegend(datasetIndex) {
      const meta = this.charts.getDatasetMeta(0)
      let result
      if (meta.data[datasetIndex].hidden === true) {
        result = false
      } else {
        result = true
      }

      if (result) {
        this.chartData.datasets[datasetIndex].hidden = true
        meta.data[datasetIndex].hidden = true
        this.$refs['chartLegendLabel' + datasetIndex][0].style.textDecoration = 'line-through'
      } else {
        this.chartData.datasets[datasetIndex].hidden = false
        meta.data[datasetIndex].hidden = false
        this.$refs['chartLegendLabel' + datasetIndex][0].style.textDecoration = 'none'
      }
      this.$refs.horizontalBarChart.update()
    },
    setHeight(total) {
      const limit = 8

      let height
      if (total > 0 && total <= limit) {
        height = '100%'
      } else if (total > limit && total <= limit * 2) {
        height = '200%'
      } else if (total > limit * 2 && total <= limit * 3) {
        height = '300%'
      } else if (total > limit * 3 && total <= limit * 4) {
        height = '400%'
      }

      this.chartStyles = {
        height,
        position: 'relative'
      }
    }
  }
}
</script>

<style lang="scss">
.chart-test-target {
  .title {
    font-size: 16px !important;
  }

  .chartWrapper {
    position: relative;
  }

  .chartWrapper > canvas {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
  }

  .chartAreaWrapper {
    height: 350px;
    overflow-y: scroll;
  }

  .chart-legend {
    .box {
      width: 12px;
      height: 12px;
      border-radius: 0;
      margin-top: 3px;
    }
  }
}

.chart-test-area >>> #chartjs-tooltip {
  z-index: 999999 !important;
}
</style>
