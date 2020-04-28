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
        {{ $t('label.gender') }}
      </v-card-title>
      <v-divider class="mt-0 mb-2" />
      <v-card-text>
        <chart-doughnut
          v-if="loaded"
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
        labels: [
          this.$t('label.female'),
          this.$t('label.male')
        ],
        datasets: [{
          data: [],
          backgroundColor: [
            'rgba(255, 124, 143, 1)',
            'rgba(102, 164, 251, 1)'
          ]
        }]
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
          intersect: false
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
    'dataGender': {
      handler(value) {
        const array = []
        array.push(value.female)
        array.push(value.male)

        this.chartData.datasets[0].data = array
      },
      deep: true
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
