<template>
  <div class="container-map relative">
    <div id="sidebar">
      <div
        class="sidebar-content"
        v-html="sidebarContent"
      />
    </div>
    <div
      id="map"
      class="map-wrapper bg-aqua"
      style="z-index: 0;"
    />
    <div
      v-if="isFilter"
      class="filter"
    >
      <div class="filter-data">
        <ul>
          <li
            :class="[filter.positive_active ? 'filter-active' : '']"
            @click="onFilter('positive_active')"
          >
            <div class="legend-color cluster-positive-active" />
            <span class="legend-text">Positif - Aktif</span>
          </li>
          <li
            :class="[filter.positive_recovery ? 'filter-active' : '']"
            @click="onFilter('positive_recovery')"
          >
            <div class="legend-color cluster-positive-recovery" />
            <span class="legend-text">Positif - Sembuh</span>
          </li>
          <li
            :class="[filter.positive_dead ? 'filter-active' : '']"
            @click="onFilter('positive_dead')"
          >
            <div class="legend-color cluster-positive-dead" />
            <span class="legend-text">Positif - Meninggal</span>
          </li>
          <li
            :class="[filter.pdp_process ? 'filter-active' : '']"
            @click="onFilter('pdp_process')"
          >
            <div class="legend-color cluster-pdp-process" />
            <span class="legend-text">PDP - Proses</span>
          </li>
          <li
            :class="[filter.pdp_done ? 'filter-active' : '']"
            @click="onFilter('pdp_done')"
          >
            <div class="legend-color cluster-pdp-done" />
            <span class="legend-text">PDP - Selesai</span>
          </li>
          <li
            :class="[filter.pdp_dead ? 'filter-active' : '']"
            @click="onFilter('pdp_dead')"
          >
            <div class="legend-color cluster-pdp-dead" />
            <span class="legend-text">PDP - Meninggal</span>
          </li>
          <li
            :class="[filter.odp_process ? 'filter-active' : '']"
            @click="onFilter('odp_process')"
          >
            <div class="legend-color cluster-odp-process" />
            <span class="legend-text">ODP - Proses</span>
          </li>
          <li
            :class="[filter.odp_done ? 'filter-active' : '']"
            @click="onFilter('odp_done')"
          >
            <div class="legend-color cluster-odp-done" />
            <span class="legend-text">ODP - Selesai</span>
          </li>
          <li
            :class="[filter.odp_dead ? 'filter-active' : '']"
            @click="onFilter('odp_dead')"
          >
            <div class="legend-color cluster-odp-dead" />
            <span class="legend-text">ODP - Meninggal</span>
          </li>
          <li
            :class="[filter.otg_process ? 'filter-active' : '']"
            @click="onFilter('otg_process')"
          >
            <div class="legend-color cluster-otg-process" />
            <span class="legend-text">OTG - Proses</span>
          </li>
          <li
            :class="[filter.otg_done ? 'filter-active' : '']"
            @click="onFilter('otg_done')"
          >
            <div class="legend-color cluster-otg-done" />
            <span class="legend-text">OTG - Selesai</span>
          </li>
          <li
            :class="[filter.otg_dead ? 'filter-active' : '']"
            @click="onFilter('otg_dead')"
          >
            <div class="legend-color cluster-otg-dead" />
            <span class="legend-text">OTG - Meninggal</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet-easybutton'
import 'leaflet.markercluster'
import 'leaflet-sidebar'
import * as turf from '@turf/turf'
import jsonCity from '../../json/kota.json'
import jsonDistrict from '../../json/kecamatan.json'
import jsonVillage from '../../json/kelurahan.json'
import jsonMap from '../../json/map.json'

export default {
  name: 'DistributionCaseMap',
  data() {
    return {
      jsonAll: [],
      jsonCity,
      jsonDistrict,
      jsonVillage,
      jsonMap,
      map: null,
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      isZoom: false,
      zoomOld: 0,
      zoomNew: 0,
      center: [-6.932694, 107.627449],
      centerCity: null,
      layerGroup: null,
      dataLayer: [],
      dataMarker: [],
      styleBorderline: {
        fillColor: 'red',
        fillOpacity: 0.01,
        weight: 0.5,
        opacity: 0.5,
        color: 'red'
      },
      data: {
        positive_active: [],
        positive_recovery: []
      },
      clusterCity: [],
      isFilter: false,
      filter: {
        positive_active: true,
        positive_recovery: false,
        positive_dead: false,
        pdp_process: false,
        pdp_done: false,
        pdp_dead: false,
        odp_process: false,
        odp_done: false,
        odp_dead: false,
        otg_process: false,
        otg_done: false,
        otg_dead: false
      },
      sidebar: null,
      sidebarContent: ''
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles',
      'fullName',
      'district_user',
      'district_name_user'
    ])
  },
  beforeMount() {
    this.data.positive_active = []
    this.data.positive_recovery = []
    this.jsonMap.data.map((res) => {
      if (res.status === 'Positif' && res.stage === 'Aktif') {
        this.data.positive_active.push(res)
      } else if (res.status === 'Positif' && res.stage === 'Sembuh') {
        this.data.positive_recovery.push(res)
      }
    })
  },
  mounted() {
    this.initMap()

    if (this.roles[0] === 'dinkesprov') {
      this.zoomOld = 1
      this.zoomNew = 1
      this.createLayerCity()
    } else if (this.roles[0] === 'dinkeskota') {
      this.zoomOld = 2
      this.zoomNew = 2
      this.createLayerDistrict(this.district_user)
    }

    this.createMarker()
  },
  methods: {
    initMap() {
      // Map
      this.map = L.map('map', {
        zoomControl: false
      }).setView(this.center, 8)

      // Copyright
      L.tileLayer(
        this.url,
        {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18
        }
      ).addTo(this.map)

      // Zoom
      L.control
        .zoom({
          position: 'bottomright'
        })
        .addTo(this.map)

      this.map.on('zoomend', () => {
        this.isZoom = true
        if (this.roles[0] === 'dinkesprov') {
          if (this.map.getZoom() <= 10) {
            this.zoomOld = this.zoomNew
            this.zoomNew = 1
            this.zoomLayer()
          } else if (this.map.getZoom() > 10 && this.map.getZoom() <= 13) {
            this.zoomOld = this.zoomNew
            this.zoomNew = 2
            this.zoomLayer()
          } else if (this.map.getZoom() > 13) {
            this.zoomOld = this.zoomNew
            this.zoomNew = 3
            this.zoomLayer()
          }
        } else if (this.roles[0] === 'dinkeskota') {
          if (this.map.getZoom() <= 13) {
            this.zoomOld = this.zoomNew
            this.zoomNew = 2
            this.zoomLayer(this.district_user)
          } else if (this.map.getZoom() > 13) {
            this.zoomOld = this.zoomNew
            this.zoomNew = 3
            this.zoomLayer(this.district_user)
          }
        }
      })

      // Home
      L.easyButton({
        position: 'topright',
        states: [
          {
            icon: '<i class="material-icons">home</i>',
            onClick: () => {
              if (this.roles[0] === 'dinkesprov') {
                this.map.setView(this.center, 8)
              } else if (this.roles[0] === 'dinkeskota') {
                this.map.fitBounds(this.centerCity)
              }
            }
          }
        ]
      }).addTo(this.map)

      // Filter
      L.easyButton({
        position: 'topright',
        states: [
          {
            icon: '<i class="material-icons">filter_list</i>',
            onClick: () => {
              this.isFilter = !this.isFilter
            }
          }
        ]
      }).addTo(this.map)

      // Sidebar
      this.sidebar = L.control.sidebar('sidebar', {
        closeButton: false,
        position: 'left'
      })
      this.map.addControl(this.sidebar)

      this.map.on('click', () => {
        this.sidebar.hide()
        this.isFilter = false
      })

      // setTimeout(() => {
      //   sidebar.show()
      // }, 500)

      // Layer
      this.layerGroup = L.layerGroup().addTo(this.map)
    },
    removeLayer() {
      this.dataLayer.forEach(element => {
        this.map.removeLayer(element)
      })
      this.dataLayer = []
    },
    removeMarker() {
      this.dataMarker.forEach(element => {
        this.map.removeLayer(element)
      })
      this.dataMarker = []
    },
    zoomLayer(value = null) {
      if (this.zoomOld !== this.zoomNew) {
        if (this.zoomNew === 1) {
          console.log('create layer city')
          this.removeLayer()
          this.createLayerCity()
        } else if (this.zoomNew === 2) {
          console.log('create layer district')
          this.removeLayer()
          this.createLayerDistrict(value)
        } else if (this.zoomNew === 3) {
          console.log('create layer village')
          this.removeLayer()
          this.createLayerVillage(value)
        }
      }
    },
    createLayerCity() {
      L.geoJSON(this.jsonCity, {
        style: feature => {
          return this.styleBorderline
        },
        onEachFeature: (feature, layer, element) => {
          const polygon = layer.addTo(this.map)
          this.dataLayer.push(polygon)

          const nameCity = feature.properties.kemendagri_kabupaten_nama
          layer.bindTooltip(this.titleize(nameCity))
        }
      })
    },
    createLayerDistrict(value = null) {
      let geojsonLayer
      if (value) {
        geojsonLayer = L.geoJSON(this.jsonDistrict, {
          style: feature => {
            return this.styleBorderline
          },
          filter: (feature, layer) => {
            return feature.properties.kemendagri_kabupaten_kode === value
          },
          onEachFeature: (feature, layer, element) => {
            const polygon = layer.addTo(this.map)
            this.dataLayer.push(polygon)

            const nameCity = feature.properties.kemendagri_kabupaten_nama
            const nameDistrict = feature.properties.kemendagri_kecamatan_nama
            layer.bindTooltip(`
              ${this.titleize(nameCity)} <br>
              ${this.$t('label.select_sub_district')} ${nameDistrict}
            `)
          }
        })

        if (!this.isZoom) {
          if (geojsonLayer.getLayers() && geojsonLayer.getLayers().length > 1) {
            this.centerCity = geojsonLayer.getBounds()
            this.map.fitBounds(geojsonLayer.getBounds())
          } else if (geojsonLayer.getLayers() && geojsonLayer.getLayers().length === 1) {
            this.map.setView(geojsonLayer.getLayers()[0].getLatLng(), 12)
          }
        }
      } else {
        geojsonLayer = L.geoJSON(this.jsonDistrict, {
          style: feature => {
            return this.styleBorderline
          },
          onEachFeature: (feature, layer, element) => {
            const polygon = layer.addTo(this.map)
            this.dataLayer.push(polygon)

            const nameCity = feature.properties.kemendagri_kabupaten_nama
            const nameDistrict = feature.properties.kemendagri_kecamatan_nama
            layer.bindTooltip(`
              ${this.titleize(nameCity)} <br>
              ${this.$t('label.select_sub_district')} ${nameDistrict}
            `)
          }
        })
      }
    },
    createLayerVillage(value = null) {
      let geojsonLayer
      if (value) {
        geojsonLayer = L.geoJSON(this.jsonVillage, {
          style: feature => {
            return this.styleBorderline
          },
          filter: (feature, layer) => {
            return feature.properties.kemendagri_kabupaten_kode === value
            // return feature.properties.kemendagri_kecamatan_kode === value
          },
          onEachFeature: (feature, layer, element) => {
            const polygon = layer.addTo(this.map)
            this.dataLayer.push(polygon)

            const nameCity = feature.properties.kemendagri_kabupaten_nama
            const nameDistrict = feature.properties.kemendagri_kecamatan_nama
            const nameVillage = feature.properties.kemendagri_desa_nama
            layer.bindTooltip(`
              ${this.titleize(nameCity)} <br>
              ${this.$t('label.select_sub_district')} ${nameDistrict} <br>
              ${this.$t('label.select_village')} ${nameVillage}
            `)
          }
        })

        if (!this.isZoom) {
          if (geojsonLayer.getLayers() && geojsonLayer.getLayers().length > 1) {
            this.map.fitBounds(geojsonLayer.getBounds())
          } else if (geojsonLayer.getLayers() && geojsonLayer.getLayers().length === 1) {
            this.map.setView(geojsonLayer.getLayers()[0].getLatLng(), 12)
          }
        }
      } else {
        geojsonLayer = L.geoJSON(this.jsonVillage, {
          style: feature => {
            return this.styleBorderline
          },
          onEachFeature: (feature, layer, element) => {
            const polygon = layer.addTo(this.map)
            this.dataLayer.push(polygon)

            const nameCity = feature.properties.kemendagri_kabupaten_nama
            const nameDistrict = feature.properties.kemendagri_kecamatan_nama
            const nameVillage = feature.properties.kemendagri_desa_nama
            layer.bindTooltip(`
              ${this.titleize(nameCity)} <br>
              ${this.$t('label.select_sub_district')} ${nameDistrict} <br>
              ${this.$t('label.select_village')} ${nameVillage}
            `)
          }
        })
      }
    },
    createLayerVillageSingle(value) {
      const geojsonLayer = L.geoJSON(this.jsonVillage, {
        style: feature => {
          return this.styleBorderline
        },
        filter: (feature, layer) => {
          return feature.properties.kemendagri_desa_kode === value
        },
        onEachFeature: (feature, layer, element) => {
          const polygon = layer.addTo(this.map)
          this.dataLayer.push(polygon)

          const nameCity = feature.properties.kemendagri_kabupaten_nama
          const nameDistrict = feature.properties.kemendagri_kecamatan_nama
          const nameVillage = feature.properties.kemendagri_desa_nama
          layer.bindTooltip(`
            ${this.titleize(nameCity)} <br>
            ${this.$t('label.select_sub_district')} ${nameDistrict} <br>
            ${this.$t('label.select_village')} ${nameVillage}
          `)
        }
      })

      if (geojsonLayer.getLayers() && geojsonLayer.getLayers().length > 1) {
        this.map.fitBounds(geojsonLayer.getBounds())
      } else if (geojsonLayer.getLayers() && geojsonLayer.getLayers().length === 1) {
        this.map.fitBounds(geojsonLayer.getBounds())
      }
    },
    createMarker() {
      this.jsonAll = []

      Object.keys(this.filter).map((cat) => {
        if (this.filter[cat]) {
          this.jsonAll = this.data[cat]
        }
      })

      if (this.zoomNew === 1) {
        L.geoJSON(this.jsonCity).eachLayer((element) => {
          if (this.map.getBounds().intersects(element._bounds)) {
            this.clusterCity[element.feature.properties.bps_kabupaten_kode] = this.paramMarkerCluster()

            this.jsonAll.map((elPasien) => {
              if (elPasien.latitude !== null) {
                const point = turf.point([elPasien.longitude, elPasien.latitude])
                const isInside = turf.inside(point, element.feature)
                if (isInside) {
                  this.addMarkerLayer(this.clusterCity, element, elPasien)
                }
              }
            })
            this.addMarkerClusterLayer(this.clusterCity, element)
          }
        })
      }
    },
    titleize(sentence) {
      if (!sentence.split) {
        return sentence
      }

      const titleizeWord = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
      }

      const result = []
      sentence.split(' ').forEach(w => {
        result.push(titleizeWord(w))
      })
      return result.join(' ')
    },
    addMarkerLayer(cluster, element, elPasien) {
      const m = L.marker([elPasien.latitude, elPasien.longitude]).on('click', (e) => {
        this.isFilter = false
        this.sidebar.show()
        this.sidebarContent = '<a href="google.com">dsah</a>'
      })

      if (this.zoomNew === 1) {
        if (elPasien.status === 'Positif' && elPasien.stage === 'Aktif') {
          cluster[element.feature.properties.bps_kabupaten_kode].positive_active.addLayer(m)
        } else if (elPasien.status === 'Positif' && elPasien.stage === 'Sembuh') {
          cluster[element.feature.properties.bps_kabupaten_kode].positive_recovery.addLayer(m)
        }
      }
    },
    addMarkerClusterLayer(cluster, element) {
      if (this.zoomNew === 1) {
        Object.keys(cluster[element.feature.properties.bps_kabupaten_kode]).map((key) => {
          const newLayer = cluster[element.feature.properties.bps_kabupaten_kode][key].addTo(this.map)
          this.dataMarker.push(newLayer)

          const name = element.feature.properties.kemendagri_kabupaten_nama
          cluster[element.feature.properties.bps_kabupaten_kode][key].on('clusterclick', (c) => {
            this.isFilter = false
            this.sidebar.show()
            this.sidebarContent = `
              Kota/Kabupaten: ${name}
            `
          })
        })
      }
    },
    paramMarkerCluster() {
      return {
        positive_active: L.markerClusterGroup(this.configCluster('positive-active')),
        positive_recovery: L.markerClusterGroup(this.configCluster('positive-recovery')),
        positive_dead: L.markerClusterGroup(this.configCluster('positive-dead')),
        pdp_process: L.markerClusterGroup(this.configCluster('pdp-process')),
        pdp_done: L.markerClusterGroup(this.configCluster('pdp-done')),
        pdp_dead: L.markerClusterGroup(this.configCluster('pdp-dead')),
        odp_process: L.markerClusterGroup(this.configCluster('odp-process')),
        odp_done: L.markerClusterGroup(this.configCluster('odp-done')),
        odp_dead: L.markerClusterGroup(this.configCluster('odp-dead')),
        otg_process: L.markerClusterGroup(this.configCluster('otg-process')),
        otg_done: L.markerClusterGroup(this.configCluster('otg-done')),
        otg_dead: L.markerClusterGroup(this.configCluster('otg-dead'))
      }
    },
    configCluster(className = null) {
      return {
        singleMarkerMode: true,
        maxClusterRadius: 10000,
        spiderfyOnMaxZoom: false,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: false,
        spiderLegPolylineOptions: { weight: 1.5, color: '#222', opacity: 0 },
        iconCreateFunction: (cluster) => {
          let count = cluster.getChildCount()
          const digits = (count + '').length

          let classMarker = 'cluster cluster-' + className + ' digits-' + digits

          if (count === 1) {
            count = ''
            classMarker = 'cluster cluster-' + className + ' digits-0'
          }

          return L.divIcon({
            html: count,
            className: classMarker,
            iconSize: null
          })
        }
      }
    },
    onFilter(category) {
      Object.keys(this.filter).map((cat) => {
        this.filter[cat] = false
      })

      this.filter[category] = !this.filter[category]
      this.removeMarker()
      this.createMarker()
      this.sidebar.hide()
    }
  }
}
</script>

<style>
.map-wrapper {
  background: white;
  height: calc(100vh - 64px);
  min-height: calc(100vh - 64px);
}
#map .easy-button-container {
  background-color: white;
}
#map .easy-button-button {
  width: 26px;
  height: 26px;
}
#map .material-icons {
  padding-top: 5px;
  font-size: 17px;
  color: #27ae60;
}

.filter {
  position: absolute;
  top: 85px;
  right: 10px;
}
.filter ul {
  margin: 5px 6px 0 5px;
  padding-left: 0;
}
.filter li {
  list-style: none;
  opacity: 0.4;
  padding-bottom: 0.2em;
}
.filter li:hover {
  cursor: pointer;
}
.filter-active {
  opacity: 1 !important;
}
.filter-data {
  background: #fff;
  padding: 0.6em;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
}

.legend-color {
  width: 1em;
  height: 1em;
  float: left;
  border-radius: 10px;
  margin-right: 8px;
  margin-top: 1px;
}
.legend-text {
  color: black;
}

.cluster {
  border-radius: 50%;
  text-align: center;
  color: white;
  font-weight: 700;
  font-family: monospace;
  height: 10px;
  width: 10px;
}
.cluster-positive-active {
  border: 2px solid rgb(235, 87, 87, 0.9);
  background: rgb(235, 87, 87, 0.9);
}
.cluster-positive-recovery {
  border: 2px solid rgb(235, 87, 87, 0.9);
  background: rgb(39, 174, 96, 0.9);
}
.cluster-positive-dead {
  border: 2px solid rgb(235, 87, 87, 0.9);
  background: rgb(165, 18, 18, 0.9);
}
.cluster-odp-process {
  border: 2px solid rgb(45, 156, 219, 0.9);
  background: rgb(45, 156, 219, 0.9);
}
.cluster-odp-done {
  border: 2px solid rgb(45, 156, 219, 0.9);
  background: rgba(196, 195, 195, 0.9);
}
.cluster-odp-dead {
  border: 2px solid rgb(45, 156, 219, 0.9);
  background: rgb(165, 18, 18, 0.9);
}
.cluster-pdp-process {
  border: 2px solid rgb(242, 201, 76, 0.9);
  background: rgb(242, 201, 76, 0.9);
}
.cluster-pdp-done {
  border: 2px solid rgb(242, 201, 76, 0.9);
  background: rgba(196, 195, 195, 0.9);
}
.cluster-pdp-dead {
  border: 2px solid rgb(242, 201, 76, 0.9);
  background: rgb(165, 18, 18, 0.9);
}
.cluster-otg-process {
  border: 2px solid rgb(97, 97, 97, 0.9);
  background: rgb(242, 201, 76, 0.9);
}
.cluster-otg-done {
  border: 2px solid rgb(97, 97, 97, 0.9);
  background: rgba(196, 195, 195, 0.9);
}
.cluster-otg-dead {
  border: 2px solid rgb(97, 97, 97, 0.9);
  background: rgb(165, 18, 18, 0.9);
}

.digits-0 {
  height: 17px;
  width: 17px;
  margin-top: -14px;
  margin-left: -14px;
}
.digits-1 {
  font-size: 14px;
  height: 28px;
  width: 28px;
  line-height: 24px;
  margin-top: -14px;
  margin-left: -14px;
}
.digits-2 {
  font-size: 16px;
  height: 34px;
  width: 34px;
  line-height: 30px;
  margin-top: -17px;
  margin-left: -17px;
}
.digits-3 {
  font-size: 18px;
  height: 48px;
  width: 47px;
  line-height: 47px;
  margin-top: -24px;
  margin-left: -24px;
}
.digits-4 {
  font-size: 18px;
  height: 58px;
  width: 58px;
  line-height: 57px;
  margin-top: -29px;
  margin-left: -29px;
}

.leaflet-sidebar {
  position: absolute;
  height: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px;
  z-index: 2000;
}
.leaflet-sidebar.left {
  left: -500px;
  transition: left 0.5s, width 0.5s;
  padding-right: 0;
}
.leaflet-sidebar.left.visible {
  left: 0;
}
.leaflet-sidebar.right {
  right: -500px;
  transition: right 0.5s, width 0.5s;
  padding-left: 0;
}
.leaflet-sidebar.right.visible {
  right: 0;
}
.leaflet-sidebar > .leaflet-control {
  height: 100%;
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 20px;
  font-size: 1.1em;
  background: white;
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.65);
  -webkit-border-radius: 4px;
  border-radius: 4px;
}
.leaflet-touch .leaflet-sidebar > .leaflet-control {
  box-shadow: none;
  border: 2px solid rgba(0, 0, 0, 0.2);
  background-clip: padding-box;
}
@media (max-width: 767px) {
  .leaflet-sidebar {
    width: 100%;
    padding: 0;
  }
  .leaflet-sidebar.left.visible ~ .leaflet-left {
    left: 100%;
  }
  .leaflet-sidebar.right.visible ~ .leaflet-right {
    right: 100%;
  }
  .leaflet-sidebar.left {
    left: -100%;
  }
  .leaflet-sidebar.left.visible {
    left: 0;
  }
  .leaflet-sidebar.right {
    right: -100%;
  }
  .leaflet-sidebar.right.visible {
    right: 0;
  }
  .leaflet-sidebar > .leaflet-control {
    box-shadow: none;
    -webkit-border-radius: 0;
    border-radius: 0;
  }
  .leaflet-touch .leaflet-sidebar > .leaflet-control {
    border: 0;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .leaflet-sidebar {
    width: 255px;
  }
  .leaflet-sidebar.left.visible ~ .leaflet-left {
    left: 255px;
  }
  .leaflet-sidebar.right.visible ~ .leaflet-right {
    right: 255px;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .leaflet-sidebar {
    width: 340px;
  }
  .leaflet-sidebar.left.visible ~ .leaflet-left {
    left: 340px;
  }
  .leaflet-sidebar.right.visible ~ .leaflet-right {
    right: 340px;
  }
}
@media (min-width: 1200px) {
  .leaflet-sidebar {
    width: 410px;
  }
  .leaflet-sidebar.left.visible ~ .leaflet-left {
    left: 410px;
  }
  .leaflet-sidebar.right.visible ~ .leaflet-right {
    right: 410px;
  }
}
.leaflet-sidebar .close {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 31px;
  height: 31px;
  color: #333;
  font-size: 25pt;
  line-height: 1em;
  text-align: center;
  background: white;
  -webkit-border-radius: 16px;
  border-radius: 16px;
  cursor: pointer;
  z-index: 8;
}

.leaflet-left {
  transition: left 0.5s;
}

.leaflet-right {
  transition: right 0.5s;
}
</style>
