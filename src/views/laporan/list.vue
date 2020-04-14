
<template>
  <div>
    <v-skeleton-loader
      :loading="loading"
      type="article"
    >
      <v-card class="d-block pa-1 mx-auto header-survey-list">
        <v-container>
          <v-row justify="space-between">
            <v-col cols="auto">
              <v-card-text class="header-survey-text">
                <div>{{ $t('label.total_case_data') }} : {{ totalReport }}</div>
                <div>{{ fullname }}</div>
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-skeleton-loader>
    <v-row>
      <v-col>
        <v-skeleton-loader
          :loading="loading"
          type="article"
        >
          <v-card
            class="mx-auto"
            outlined
          >
            <v-list-item two-line style="background: #D2EAFF">
              <v-list-item-content>
                <v-list-item-title style="color: #2F80ED;">{{ $t('label.insiders_monitoring') }}</v-list-item-title>
                <v-list-item-title class="headline mb-1" style="color: #2F80ED;padding-top: 2rem;">{{ totalODP }} {{ $t('label.people') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col>
        <v-skeleton-loader
          :loading="loading"
          type="article"
        >
          <v-card
            class="mx-auto"
            outlined
          >
            <v-list-item two-line style="background: #FEF9EC">
              <v-list-item-content>
                <v-list-item-title style="color: #F2994A;">
                  {{ $t('label.patients_under_supervision') }}
                </v-list-item-title>
                <v-list-item-title class="headline mb-1" style="color: #F2994A;padding-top: 2rem;">{{ totalPDP }} {{ $t('label.people') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-skeleton-loader>
      </v-col>
      <v-col>
        <v-skeleton-loader
          :loading="loading"
          type="article"
        >
          <v-card
            class="mx-auto"
            outlined
          >
            <v-list-item two-line style="background: #FDEDED">
              <v-list-item-content>
                <v-list-item-title style="color: #EB5757;">
                  {{ $t('label.POSITIF') }}
                </v-list-item-title>
                <v-list-item-title class="headline mb-1" style="color: #EB5757;padding-top: 2rem;">{{ totalPositif }} {{ $t('label.people') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-skeleton-loader>
      </v-col>
    </v-row>
    <v-card
      outlined
    >
      <v-row>
        <v-col>
          <v-card-text>
            <div style="font-size: 1.5rem;">
              {{ $t('label.case_data') }}
            </div>
          </v-card-text>
        </v-col>
        <v-col />
      </v-row>
      <case-filter
        :list-query="listQuery"
        :query-list.sync="listQuery"
        :on-search="handleSearch"
      />
      <hr>
      <v-row>
        <v-col auto>
          <v-data-table
            :headers="headers"
            :items="listKasus"
            :mobile-breakpoint="NaN"
            :no-data-text="'Tidak ada data'"
            :items-per-page="listQuery.limit"
            :loading="loadingTable"
            hide-default-footer
          >
            <template v-slot:item="{ item, index }">
              <tr>
                <td>{{ getTableRowNumbering(index) }}</td>
                <td>{{ item.id_case.toUpperCase() }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.age }} Th</td>
                <td>
                  <div v-if="item.gender =='P'">
                    {{ $t('label.female') }}
                  </div>
                  <div v-else>
                    {{ $t('label.male') }}
                  </div>
                </td>
                <td><status :status="item.status" /> </td>
                <td>
                  <div v-if=" item.last_history.stage =='0'">
                    {{ $t('label.process') }}
                  </div>
                  <div v-else>
                    {{ $t('label.done') }}
                  </div>
                </td>
                <td>
                  <div v-if=" item.last_history.final_result =='0'">
                    {{ $t('label.negatif') }}
                  </div>
                  <div v-else-if=" item.last_history.final_result =='1'">
                    {{ $t('label.recovery') }}
                  </div>
                  <div v-else-if=" item.last_history.final_result =='2'">
                    {{ $t('label.dead') }}
                  </div>
                  <div v-else>
                    -
                  </div>
                </td>
                <td>{{ item.author.fullname }}</td>
                <td>
                  <v-card-actions>
                    <v-menu
                      :close-on-content-click="false"
                      :nudge-width="100"
                      :nudge-left="220"
                      :nudge-top="40"
                      offset-y
                    >
                      <template v-slot:activator="{ on }">
                        <v-btn
                          class="ma-1"
                          color="#828282"
                          style="text-transform: none;height: 30px;min-width: 80px;"
                          tile
                          outlined
                          v-on="on"
                        >
                          {{ $t('label.choose_action') }}
                          <v-icon style="color: #009D57;font-size: 2rem;" right>
                            mdi-menu-down
                          </v-icon>
                        </v-btn>
                      </template>
                      <v-card>
                        <v-list-item @click="handleDetail(item._id)">
                          {{ $t('label.view_detail') }}
                        </v-list-item>
                        <div v-if="roles[0] === 'dinkeskota'">
                          <v-list-item @click="handleEditCase(item._id)">
                            {{ $t('label.profile_update') }}
                          </v-list-item>
                          <v-list-item @click="handleEditHistoryCase(item._id)">
                            {{ $t('label.update_history') }}
                          </v-list-item>
                          <v-list-item @click="handleDeleteCase(item)">
                            {{ $t('label.deleted_case') }}
                          </v-list-item>
                        </div>
                      </v-card>
                    </v-menu>
                  </v-card-actions>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
    <pagination
      :total="totalList "
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :on-next="onNext"
    />
    <dialog-delete
      :dialog="dialog"
      :data-deleted="dataDelete"
      :dialog-delete.sync="dialog"
      :delete-date.sync="dataDelete"
      :store-path-delete="`reports/deleteReportCase`"
      :store-path-get-list="`reports/listReportCase`"
      :list-query="listQuery"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LaporanList',
  data() {
    return {
      headers: [
        { text: '#', value: '_id', sortable: false },
        { text: 'KODE KASUS', value: 'id_case' },
        { text: 'NAMA', value: 'name' },
        { text: 'USIA', value: 'age' },
        { text: 'JENIS KELAMIN', value: 'gender' },
        { text: 'STATUS', value: 'status' },
        { text: 'TAHAPAN', value: 'stage' },
        { text: 'HASIL', value: 'final_result' },
        { text: 'AUTHOR', value: 'author' },
        { text: 'Aksi', value: 'actions', sortable: false }
      ],
      loading: true,
      loadingTable: false,
      totalODP: 0,
      totalPDP: 0,
      totalPositif: 0,
      totalReport: 0,
      queryReportCase: {
        address_district_code: ''
      },
      listQuery: {
        address_district_code: '',
        address_subdistrict_code: '',
        address_village_code: '',
        status: '',
        final_result: '',
        page: 1,
        limit: 30,
        search: ''
      },
      countingReports: null,
      dialog: false,
      dataDelete: null,
      nameDistrict: null
    }
  },
  computed: {
    ...mapGetters('reports', [
      'listKasus',
      'totalList'
    ]),
    ...mapGetters('user', [
      'roles',
      'fullname',
      'district_user'
    ])
  },
  watch: {
    'listQuery.search': {
      handler: function(value) {
        if ((value !== undefined) && (value.length === 0 || value.length >= 3)) {
          this.listQuery.page = 1
          this.handleSearch()
        }
      },
      immediate: true
    }
  },
  async mounted() {
    if (this.roles[0] !== 'dinkeskota') this.listQuery.address_district_code = this.district_user
    await this.$store.dispatch('reports/listReportCase', this.listQuery)
    const response = await this.$store.dispatch('reports/countReportCase', this.queryReportCase)
    if (response) this.loading = false
    this.totalODP = response.data.ODP
    this.totalPDP = response.data.PDP
    this.totalPositif = response.data.POSITIF
    this.totalReport = this.totalODP + this.totalPDP + this.totalPositif
  },
  methods: {
    async handleDetail(id) {
      await this.$router.push(`/laporan/detail/${id}`)
    },
    async handleEditCase(id) {
      await this.$router.push(`/laporan/edit-case/${id}`)
    },
    async handleEditHistoryCase(id) {
      await this.$router.push(`/laporan/edit-history-case/${id}`)
    },
    async handleDeleteCase(item) {
      this.dialog = true
      this.dataDelete = await item
    },
    async handleSearch() {
      await this.$store.dispatch('reports/listReportCase', this.listQuery)
    },
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    },
    async onNext() {
      await this.$store.dispatch('reports/listReportCase', this.listQuery)
    }
  }
}
</script>
