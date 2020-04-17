<template>
  <v-card
    class="chart mx-auto"
    outlined
  >
    <v-card-title class="title ml-0 black--text">
      Peta Sebaran Kasus
    </v-card-title>
    <v-divider class="my-0" />
    <v-card-text class="px-0 py-0">
      <div id="webApp">
        <web-map />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import WebMap from './WebMap.vue'

export default {
  name: 'MapPoint',
  components: { WebMap }
}
</script>

<style scoped>
  .chart .title {
    text-transform: none;
  }

  #webApp {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }
</style>
