
<template>
  <div>
    <v-card outlined>
      <v-row>
        <v-col>
          <v-card-text>
            <div style="font-size: 1.5rem;">{{ $t('label.user_data') }}</div>
          </v-card-text>
        </v-col>
        <v-col />
      </v-row>
      <v-form ref="form" lazy-validatiaon>
        <v-container>
          <v-row class="filter-row">
            <v-col cols="12" sm="4">
              <v-label class="title">{{ $t('label.name') }}</v-label>
              <v-text-field
                v-model="listQuery.search"
                solo
                label="Cari"
                prepend-inner-icon="search"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-label class="title">{{ $t('label.city') }}</v-label>
              <select-area-district-city
                :disabled-select="false"
                :disabled-district="false"
                :required="false"
                :district-city="districtCity"
                :city-district.sync="districtCity"
                :on-select-district="onSelectDistrict"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <br>
              <div>
                <v-btn
                  color="success"
                  style="height: 46px;min-width: 100px;margin-right: 4px;"
                  @click="handleSearch"
                >
                  Cari
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <hr>
      <v-row>
        <v-col auto>
          <v-data-table
            :headers="headers"
            :items="userList"
            :mobile-breakpoint="NaN"
            :no-data-text="'Tidak ada data'"
            :items-per-page="listQuery.limit"
            :loading="loadingTable"
            hide-default-footer
          >
            <template v-slot:item="{ item, index }">
              <tr>
                <td>{{ getTableRowNumbering(index) }}</td>
                <td>{{ item.fullname }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.role }}</td>
                <td>{{ item.name_district_city }}</td>
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
                          style="text-transform: none;height: 30px;min-width: 30px;"
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
                        <div>
                          <v-list-item @click="handleDetail(item._id)">
                            {{ $t('label.view_detail') }}
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Todo: get data from api
      userList: [
        {
          _id: '5e73497682d77e001332c742',
          name_district_city: 'KOTA SUKABUMI',
          fullname: 'Dinkes Kota Sukabumi',
          username: 'dinkeskotasukabumi',
          email: 'dinkeskotasukabumi@dinkeskotasukabumi.id',
          role: 'dinkeskota'
        },
        {
          _id: '5e70ab30cc2e000012422922',
          username: 'dinkeskota1',
          fullname: 'Dinkes Kota Bandung',
          email: 'oke@adminprov.com',
          role: 'dinkeskota'
        }
      ],
      headers: [
        { text: '#', value: '_id', sortable: false },
        { text: 'NAMA', value: 'fullname' },
        { text: 'EMAIL', value: 'email' },
        { text: 'ROLE', value: 'role' },
        { text: 'KOTA', value: 'name_district_city' },
        { text: 'AKSI', value: 'actions', sortable: false }
      ],
      loadingTable: false,
      listQuery: {
        page: 1,
        limit: 30,
        search: '',
        address_district_code: ''
      },
      districtCity: {
        kota_kode: ''
      }
    }
  },
  watch: {
    'listQuery.search': {
      handler: function(value) {
        if (value.length >= 3 || value.length === 0) {
          this.listQuery.page = 1
          this.handleSearch()
        }
      },
      immediate: true
    }
  },
  methods: {
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    },
    async handleSearch() {
      // to do : get data from api
    },
    async onSelectDistrict(value) {
      this.listQuery.address_district_code = value.kota_kode
    },
    async handleDetail(id) {
      // to do : get data from api
    }
  }
}
</script>

<style>
.container {
  margin-top: -30px;
  margin-bottom: -30px;
}
</style>
