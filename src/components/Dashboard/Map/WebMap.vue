<template>
  <div>
    <noscript>Peta</noscript>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader'

export default {
  name: 'WebMap',
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(
      [
        'esri/Map',
        'esri/views/MapView'
      ],
      { css: true }
    ).then(
      ([
        ArcGISMap,
        MapView
      ]) => {
        const map = new ArcGISMap({
          basemap: 'dark-gray-vector'
        })

        this.view = new MapView({
          container: this.$el,
          map: map,
          center: [107.633545, -6.943097],
          zoom: 8
        })

        this.view.ui.move('zoom', 'bottom-right')
        this.view.ui.remove('attribution')
      }
    )
  },
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null
    }
  }
}
</script>

<style scoped>
  div {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 660px;
  }
</style>
