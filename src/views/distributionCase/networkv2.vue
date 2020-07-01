<template>
  <div>
    <div class="container-filter border-bottom">
      <v-row class="filter-layer mx-2 mt-2 mb-2">
        <v-col
          cols="12"
          lg="8"
          md="12"
        >
          <div class="d-flex filter-content">
            <div class="network-legend-color-title network-legend-description" />
            <div class="network-legend-text-title">{{ $t('label.distribution_case_network') }}</div>
          </div>
        </v-col>
        <v-col
          class="filter-select"
          cols="12"
          lg="4"
          md="12"
        >
          <v-select
            v-model="selected"
            :items="listStatus"
            item-value="id"
            item-text="name"
            :label="$t('label.status')"
            solo
            @change="onSelectStatus"
          />
        </v-col>
      </v-row>
    </div>
    <div class="container-network relative">
      <div
        class="sidebar-network network-sidebar left"
        :class="sidebarActive ? 'visible' : ''"
      >
        <div
          id="sidebar-network"
          class="leaflet-control d-flex flex-column flex-auto"
        >
          <div class="sidebar-content flex-auto overflow-auto pa-5">
            <a
              class="close outline-none"
              @click="onClose()"
            >×</a>
            <div class="d-flex mb-3">
              <div class="mr-3">
                <img
                  src="avatar/newborn-male-normal.svg"
                  width="60px"
                >
              </div>
              <div>
                <div class="mb-1"><strong>COVID-1025200329</strong></div>
                <div class="sidebar-status positive">Positif Aktif</div>
              </div>
            </div>
            <div class="mb-3">
              <span class="font-size-12">Status</span> <br>
              <strong>Sembuh</strong>
            </div>
            <div class="mb-3">
              <span class="font-size-12">Jenis Kelamin</span> <br>
              <strong>Laki-laki</strong>
            </div>
            <div class="mb-3">
              <span class="font-size-12">Usia</span> <br>
              <strong>21 Tahun</strong>
            </div>
            <div class="mb-3">
              <span class="font-size-12">Tanggal Muncul Gejala</span> <br>
              <strong>20 Maret 2020</strong>
            </div>
            <div class="mb-3">
              <span class="font-size-12">Lokasi Saat Ini</span> <br>
              <strong>RSUD Pusat</strong>
            </div>
            <div class="mb-3">
              <span class="font-size-12">Kasus Terkait</span> <br>
              <strong>COVID-1025200329</strong>
            </div>
          </div>
          <div class="flex-shrink-0 pa-5 border-top">
            <v-btn
              height="41px"
              block
              color="success"
              class="button"
              @click="onDetail()"
            >
              {{ $t('label.view_detail') }}
            </v-btn>
          </div>
        </div>
      </div>
      <network
        id="network"
        ref="network"
        class="network-wrapper"
        :style="{ transform: 'translate3d(' + sidebarTransform + 'px, 0px, 0px)' }"
        :nodes="nodes"
        :edges="edges"
        :options="options"
        @select-node="onNodeSelected($event)"
        @deselect-node="onNodeDeselected()"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Network } from 'vue-vis-network'

export default {
  name: 'DistributionCaseNetworkV3',
  components: {
    Network
  },
  data() {
    return {
      selected: 'all',
      listStatus: [
        {
          id: 'all',
          name: `${this.$t('label.all')} ${this.$t('label.status')}`
        }
      ],
      sidebarActive: false,
      sidebarTransform: 0,
      nodes: [],
      edges: [],
      options: {
        nodes: {
          size: 30,
          font: {
            color: '#000000'
          },
          shapeProperties: {
            interpolation: false
          }
        },
        edges: {
          color: 'grey',
          dashes: true,
          length: 150,
          arrows: {
            to: {
              enabled: true,
              type: 'arrow',
              scaleFactor: 0.5
            }
          }
        },
        layout: { improvedLayout: false },
        physics: {
          solver: 'forceAtlas2Based',
          timestep: 0.35,
          stabilization: {
            enabled: true,
            iterations: 100,
            updateInterval: 25
          }
        }
      }
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
  async beforeMount() {
    this.getData()
  },
  methods: {
    async getData() {
      this.nodes = [
        { id: 1, label: '1025200329', shape: 'image', image: 'avatar/teen-male-normal.svg' },
        { id: 2, label: '1025200329', shape: 'image', image: 'avatar/adult-female-positive_active.svg', size: 50 },
        { id: 3, label: '1025200329', shape: 'image', image: 'avatar/child-male-normal.svg' },
        { id: 4, label: '1025200329', shape: 'image', image: 'avatar/adult-male-normal.svg' },
        { id: 5, label: '1025200329', shape: 'image', image: 'avatar/adult-male-positive_dead.svg', size: 50 },
        { id: 6, label: '1025200329', shape: 'image', image: 'avatar/elderly-female-positive_recovery.svg', size: 50 },
        { id: 7, label: '1025200329', shape: 'image', image: 'avatar/baby-male-normal.svg' },
        { id: 8, label: '1025200329', shape: 'image', image: 'avatar/baby-female-normal.svg' },
        { id: 9, label: '1025200329', shape: 'image', image: 'avatar/elderly-male-normal.svg' },
        { id: 10, label: '1025200329', shape: 'image', image: 'avatar/child-female-normal.svg' },
        { id: 11, label: '1025200329', shape: 'image', image: 'avatar/child-male-normal.svg' },
        { id: 12, label: '1025200329', shape: 'image', image: 'avatar/child-female-normal.svg' },
        { id: 13, label: '1025200329', shape: 'image', image: 'avatar/child-female-positive_active.svg', size: 50 },
        { id: 14, label: '1025200329', shape: 'image', image: 'avatar/elderly-female-normal.svg' },
        { id: 15, label: '1025200329', shape: 'image', image: 'avatar/adult-female-normal.svg' },
        { id: 16, label: '1025200329', shape: 'image', image: 'avatar/baby-female-normal.svg' },
        { id: 17, label: '1025200329', shape: 'image', image: 'avatar/child-male-normal.svg' },
        { id: 18, label: '1025200329', shape: 'image', image: 'avatar/baby-female-normal.svg' },
        { id: 19, label: '1025200329', shape: 'image', image: 'avatar/elderly-male-positive_recovery.svg', size: 50 },
        { id: 20, label: '1025200329', shape: 'image', image: 'avatar/child-female-normal.svg' },
        { id: 21, label: '1025200329', shape: 'image', image: 'avatar/elderly-male-positive_active.svg', size: 50 },
        { id: 22, label: '1025200329', shape: 'image', image: 'avatar/adult-female-normal.svg' },
        { id: 23, label: '1025200329', shape: 'image', image: 'avatar/adult-male-normal.svg' },
        { id: 24, label: '1025200329', shape: 'image', image: 'avatar/adult-female-normal.svg' },
        { id: 25, label: '1025200329', shape: 'image', image: 'avatar/adult-female-positive_dead.svg', size: 50 }
      ]

      this.edges = [
        {
          from: 2,
          to: 1
        },
        { from: 2, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
        { from: 2, to: 9 },
        { from: 2, to: 10 },
        { from: 2, to: 11 },
        { from: 2, to: 12 },
        { from: 5, to: 6 },
        { from: 5, to: 7 },
        { from: 6, to: 8 },
        { from: 13, to: 14 },
        { from: 13, to: 15 },
        { from: 13, to: 16 },
        { from: 13, to: 17 },
        { from: 13, to: 18 },
        { from: 13, to: 19 },
        { from: 21, to: 20 },
        { from: 21, to: 22 },
        { from: 21, to: 23 },
        { from: 21, to: 24 },
        { from: 21, to: 25 },
        { from: 19, to: 25 }
      ]
    },
    async onNodeSelected(event) {
      // const id = event.nodes[0]
      this.sidebarActive = true
      this.sidebarTransform = 155
    },
    onSelectStatus() { },
    onNodeDeselected() {
      this.sidebarActive = false
      this.sidebarTransform = 0
    },
    onClose() {
      this.sidebarActive = false
      this.sidebarTransform = 0
    },
    onDetail() { }
  }
}
</script>

<style>
.container-filter .filter-content {
  padding: 13px 0;
}

.container-network {
  overflow-y: hidden;
}
.network-wrapper {
  position: absolute;
  background: white;
  width: 100%;
  height: calc(100vh - 153px);
  min-height: calc(100vh - 153px);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
}
.vis-network:focus {
  outline: 0px solid transparent;
}
.font-size-12 {
  font-size: 12px;
}
.border-top {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}
.border-bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.outline-none {
  outline: none;
}

.filter-select .v-input__slot {
  margin-bottom: 0;
}
.filter-select .v-text-field__details {
  display: none !important;
}

.network-legend-color-title {
  width: 5px;
  height: 1em;
  float: left;
  margin-right: 8px;
  margin-top: 1px;
}
.network-legend-text-title {
  color: #27ae60;
  font-weight: bold;
}
.network-legend-description {
  border: 2px solid #27ae60;
  background: #27ae60;
  margin-top: 3px;
}

.network-sidebar {
  position: absolute;
  height: calc(100vh - 153px);
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  z-index: 1;
}
.network-sidebar.left {
  left: -310px;
  transition: left 0.5s, width 0.5s;
  padding-right: 0;
}
.network-sidebar.left.visible {
  left: 0;
}
.network-sidebar.right {
  right: -310px;
  transition: right 0.5s, width 0.5s;
  padding-left: 0;
}
.network-sidebar.right.visible {
  right: 0;
}
.network-sidebar > .leaflet-control {
  height: 100%;
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 13.2px;
  background: white;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}
.leaflet-touch .network-sidebar > .leaflet-control {
  box-shadow: none;
  border: 2px solid rgba(0, 0, 0, 0.2);
  background-clip: padding-box;
}
@media (max-width: 767px) {
  .network-sidebar {
    width: 100%;
    padding: 0;
  }
  .network-sidebar.left.visible ~ .leaflet-left {
    left: 100%;
  }
  .network-sidebar.right.visible ~ .leaflet-right {
    right: 100%;
  }
  .network-sidebar.left {
    left: -100%;
  }
  .network-sidebar.left.visible {
    left: 0;
  }
  .network-sidebar.right {
    right: -100%;
  }
  .network-sidebar.right.visible {
    right: 0;
  }
  .network-sidebar > .leaflet-control {
    box-shadow: none;
    -webkit-border-radius: 0;
    border-radius: 0;
  }
  .leaflet-touch .network-sidebar > .leaflet-control {
    border: 0;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .network-sidebar {
    width: 155px;
  }
  .network-sidebar.left.visible ~ .leaflet-left {
    left: 155px;
  }
  .network-sidebar.right.visible ~ .leaflet-right {
    right: 155px;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .network-sidebar {
    width: 240px;
  }
  .network-sidebar.left.visible ~ .leaflet-left {
    left: 240px;
  }
  .network-sidebar.right.visible ~ .leaflet-right {
    right: 240px;
  }
}
@media (min-width: 1200px) {
  .network-sidebar {
    width: 310px;
  }
  .network-sidebar.left.visible ~ .leaflet-left {
    left: 310px;
  }
  .network-sidebar.right.visible ~ .leaflet-right {
    right: 310px;
  }
}
.network-sidebar .close {
  position: absolute;
  right: 25px;
  top: 17px;
  width: 31px;
  height: 31px;
  color: #333 !important;
  font-size: 15pt;
  line-height: 1em;
  text-align: center;
  background: white;
  border-radius: 16px;
  cursor: pointer;
  z-index: 800;
}

:root {
  --color-positive-active: #eb5757;
}
.sidebar-status {
  border: 1px solid;
  border-radius: 8px;
  padding: 8px 32px;
  font-size: 12px;
  text-align: center;
}
.sidebar-status.positive {
  border-color: var(--color-positive-active);
  color: var(--color-positive-active);
}
</style>
