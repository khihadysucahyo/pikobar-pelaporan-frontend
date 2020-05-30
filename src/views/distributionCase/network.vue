<template>
  <div style="overflow-y: hidden;">
    <div id="svg-container" />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import * as d3 from 'd3'
import jsonCase from '../../json/test.json'
// import jsonCase from '../../json/graph.json'

export default {
  name: 'DistributionCaseNetwork',
  data() {
    return {
      jsonCase,
      height: 450,
      width: 800,
      graph: {
        edges: null,
        nodes: null
      }
    }
  },
  mounted() {
    this.renderGraph()
  },
  methods: {
    drag(simulation) {
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      }

      function dragged(d) {
        d.fx = d3.event.x
        d.fy = d3.event.y
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    },
    linkDistance() {
      return 2
    },
    renderGraph() {
      this.graph = {
        edges: this.jsonCase.edges.map(d => Object.create(d)),
        nodes: this.jsonCase.nodes.map(d => Object.create(d))
      }

      // SVG
      const svg = d3
        .select('#svg-container')
        .append('svg')
        .attr('width', '100%')
        .attr('height', 'calc(100vh - 64px)')
        .attr('viewBox', [-this.width / 2, -this.height / 2, this.width, this.height])

      // Simulation
      const simulation = d3
        .forceSimulation(this.graph.nodes)
        .force('charge', d3.forceManyBody().strength(-30))
        .force('links', d3.forceLink(this.graph.edges).id(d => d.id).distance(100).strength(1))

      // G
      const g = svg.append('g')
        .attr('class', 'everything')

      // Link
      const link = g.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(this.graph.edges)
        .enter().append('line')
        .attr('stroke-width', 2)
        .style('stroke', '#999')

      // Node
      const node = g.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(this.graph.nodes)
        .enter().append('circle')
        .attr('r', 10)
        .attr('fill', (d) => {
          if (d.shape === 'image') {
            return 'blue'
          } else {
            return 'red'
          }
        })
        .call(this.drag(simulation))

      node.append('title')
        .text(d => d.id)

      simulation.on('tick', () => {
        link
          .attr('x1', (d) => { return d.source.x })
          .attr('y1', (d) => { return d.source.y })
          .attr('x2', (d) => { return d.target.x })
          .attr('y2', (d) => { return d.target.y })

        // node.attr('transform', (d) => { return 'translate(' + d.x + ',' + d.y + ')' })
        node
          .attr('cx', (d) => { return d.x })
          .attr('cy', (d) => { return d.y })
      })

      // Zoom
      var zoom_handler = d3
        .zoom()
        .on('zoom', () => {
          g.attr('transform', d3.event.transform)
        })
      // svg.call(zoom_handler.transform, d3.zoomIdentity.scale(1))
      zoom_handler(svg)
    }
  }
}
</script>

<style scoped>
.links line {
  stroke: #999;
  stroke-opacity: 0.6;
}

.nodes circle {
  stroke: black;
  stroke-width: 0px;
}

.node text {
  pointer-events: none;
  font: 4px sans-serif;
}
</style>
