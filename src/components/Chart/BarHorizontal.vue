<script>
import { HorizontalBar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  name: 'ChartBarHorizontal',
  extends: HorizontalBar,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    },
    name: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      htmlLegend: null
    }
  },
  mounted() {
    if (this.name === 'chart-test-area') {
      this.addPlugin({
        id: 'my-plugin',
        beforeDatasetsDraw: (chart) => {
          const scale = window.devicePixelRatio
          const sourceCanvas = chart.chart.ctx.canvas
          const copyWidth = chart.chart.width
          const copyHeight = chart.chart.height * scale
          this.$emit('callbackFooter', {
            scale, sourceCanvas, copyWidth, copyHeight
          })
        }
      })
    }

    if (this.name === 'chart-test-target') {
      this.addPlugin({
        id: 'my-plugin',
        afterDatasetsDraw: (chart) => {
          this.$emit('callbackChart', { chart })
        }
      })
    }

    this.renderChart(this.chartData, this.options)

    if (this.name === 'chart-test-area' || this.name === 'chart-test-target') {
      this.htmlLegend = this.generateLegend()
    }
  },
  methods: {
    update() {
      this.$data._chart.update()
    }
  }
}
</script>
