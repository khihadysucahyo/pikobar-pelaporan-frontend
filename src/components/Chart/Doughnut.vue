<script>
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  name: 'ChartDoughnut',
  extends: Doughnut,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  watch: {
    'chartData'(to, from) {
      this.renderChart(this.chartData, this.options)
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
