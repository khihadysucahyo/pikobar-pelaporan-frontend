<template>
  <div style="overflow-y: hidden;">
    <div id="svg-container" />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import * as d3 from 'd3'
// import jsonCase from '../../json/test.json'
// import jsonCase from '../../json/graph.json'

export default {
  name: 'DistributionCaseNetwork',
  data() {
    return {
      // jsonCase,
      height: 450,
      width: 800
    }
  },
  mounted() {
    this.renderGraph()
  },
  methods: {
    renderGraph() {
    }
  }
}
</script>

<style scoped>
.node text {
  pointer-events: none;
  font: 4px sans-serif;
}
</style>
