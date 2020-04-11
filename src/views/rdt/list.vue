<template>
  <div>
    <v-card class="d-block pa-1 mx-auto header-survey-list">
      <v-container>
        <v-row justify="space-between">
          <v-col cols="auto">
            <v-card-text class="header-survey-text">
              <div>Jumlah Hasil Test Masif COVID-19 : {{ totalReport }}</div>
              <div>{{ fullname }}</div>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card
      outlined
    >
      <v-row>
        <v-col>
          <v-card-text>
            <div style="font-size: 1.5rem;">
              Data Hasil Test
            </div>
          </v-card-text>
        </v-col>
        <v-col />
      </v-row>
      <filter-test-result
        :list-query="listQuery"
        :query-list.sync="listQuery"
        :on-search="handleSearch"
      />
      <hr>
      <v-row>
        <v-col auto>
          <v-data-table
            :headers="headers"
            :items="rdtList"
            :mobile-breakpoint="NaN"
            :no-data-text="'Tidak ada data'"
            :items-per-page="listQuery.limit"
            :loading="loadingTable"
            hide-default-footer
          >
            <template v-slot:item="{ item, index }">
              <tr>
                <td>{{ getTableRowNumbering(index) }}</td>
                <td>{{ item.id_case ? item.id_case.toUpperCase() : '-' }}</td>
                <td>{{ item.code_test }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.age }} Th</td>
                <td>
                  <div v-if="item.gender =='P'">
                    Perempuan
                  </div>
                  <div v-else>
                    Laki-Laki
                  </div>
                </td>
                <td>{{ item.category }}</td>
                <td>{{ item.address_district_name }} </td>
                <td>{{ item.test_date ? formatDatetime(item.test_date, 'DD MMMM YYYY') : '-' }}</td>
                <td>{{ item.final_result }} </td>
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
                          Pilih aksi<v-icon style="color: #009D57;font-size: 2rem;" right>mdi-menu-down</v-icon>
                        </v-btn>
                      </template>
                      <v-card>
                        <v-list-item v-if="roles[0] === 'dinkeskota' || 'dinkesprov'" @click="handleDetail(item._id)">
                          Lihat Detail
                        </v-list-item>
                        <!-- <v-list-item v-if="item.final_result && item.final_result.length > 0" @click="handleEditRDT(item._id)">
                          Update Profil Peserta
                        </v-list-item> -->
                        <v-list-item v-if="roles[0] === 'dinkeskota' && item.final_result && item.final_result.length > 0 " @click="handleUpdateResults(item._id)">
                          Update Hasil
                        </v-list-item>
                        <v-list-item v-if="roles[0] === 'dinkeskota'" @click="handleDeleteRDT(item._id)">
                          Hapus Peserta
                        </v-list-item>
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
      :store-path-delete="`rdt/deleteRDT`"
      :store-path-get-list="`rdt/getListRDT`"
      :list-query="listQuery"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatDatetime } from '@/utils/parseDatetime'
export default {
  name: 'RDTList',
  data() {
    return {
      headers: [
        { text: '#', value: '_id', sortable: false },
        { text: 'ID KASUS', value: 'id_case' },
        { text: 'ID PESERTA', value: 'code_test' },
        { text: 'NAMA', value: 'name' },
        { text: 'USIA', value: 'age' },
        { text: 'JENIS KELAMIN', value: 'gender' },
        { text: 'KATEGORI', value: 'category' },
        { text: 'TEMPAT TES', value: 'address_district_name', sortable: false },
        { text: 'TANGGAL TES', value: 'test_date' },
        { text: 'HASIL TES', value: 'final_result' },
        { text: 'Aksi', value: 'actions', sortable: false }
      ],
      loadingTable: false,
      totalODP: 0,
      totalPDP: 0,
      totalPositif: 0,
      totalReport: 0,
      listQuery: {
        address_district_code: '',
        start_date: '',
        end_date: '',
        mechanism: '',
        test_method: '',
        final_result: '',
        category: '',
        page: 1,
        limit: 30,
        search: ''
      },
      countingReports: null,
      dialog: false,
      dataDelete: null
    }
  },
  computed: {
    ...mapGetters('rdt', [
      'rdtList',
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
          this.loadingTable = true
          this.listQuery.page = 1
          this.handleSearch()
          this.loadingTable = false
        }
      },
      immediate: true
    }
  },
  async mounted() {
    this.listQuery.address_district_code = this.district_user
    await this.$store.dispatch('rdt/resetListRDT')
    this.loadingTable = true
    const response = await this.$store.dispatch('rdt/getListRDT', this.listQuery)
    if (response) this.loadingTable = false
    this.totalReport = response.data._meta.itemCount ? response.data._meta.itemCount : '0'
  },
  methods: {
    formatDatetime,
    async handleDetail(id) {
      await this.$router.push(`/rdt/detail/${id}`)
    },
    async handleEditRDT(id) {
      await this.$router.push(`/rdt/update/${id}`)
    },
    async handleDeleteRDT(id) {
      this.dialog = true
      this.dataDelete = await { _id: id }
    },
    async handleUpdateResults(id) {
      await this.$router.push(`/rdt/update-result/${id}`)
    },
    async handleSearch() {
      await this.$store.dispatch('rdt/getListRDT', this.listQuery)
    },
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    },
    async onNext() {
      await this.$store.dispatch('rdt/getListRDT', this.listQuery)
    }
  }
}
</script>
<style scoped>
  th.active .arrow {
    opacity: 1;
  }

  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
  }

  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #42b983;
  }

  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #42b983;
  }
</style>
