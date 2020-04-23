<template>
  <div>
    <v-skeleton-loader
      :loading="loadingTable"
      type="article"
    >
      <v-card class="d-block pa-1 mx-auto header-user-list">
        <v-row justify="space-between" style="margin-top: 1rem;">
          <v-col cols="1" sm="1">
            <v-icon style="font-size: 70px;color: #ffff;">
              mdi-alert-circle
            </v-icon>
          </v-col>
          <v-col auto>
            <v-card-text class="header-user-text">
              <div class="header-user-title">{{ $t('route.user_management') }}</div>
              <div>{{ $t('label.redaction_list_user') }}</div>
            </v-card-text>
          </v-col>
          <v-col cols="12" sm="3">
            <v-btn
              class="ma-1"
              color="#009D57"
              style="background: #FFFFFF;height: 56px;min-width: 178px;"
              outlined
              @click="handleCreate"
            >
              {{ $t('route.user_create') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-skeleton-loader>
    <v-card outlined>
      <v-row>
        <v-col>
          <v-card-text>
            <div style="font-size: 1.5rem;">{{ $t('label.user_list').toUpperCase() }}</div>
          </v-card-text>
        </v-col>
        <v-col />
      </v-row>
      <v-row>
        <v-col auto>
          <v-data-table
            :headers="headers"
            :items="userList"
            :mobile-breakpoint="NaN"
            :no-data-text="$t('label.data_empty')"
            :items-per-page="listQuery.limit"
            :loading="loadingTable"
            hide-default-footer
          >
            <template v-slot:item="{ item, index }">
              <tr>
                <td>{{ getTableRowNumbering(index) }}</td>
                <td>
                  <div class="td-username">
                    {{ item.username }}
                  </div>
                </td>
                <td>{{ item.fullname }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.phone_number }}</td>
                <td>{{
                  completeAddress(
                    item.name_district_city,
                    item.address_subdistrict_name,
                    item.address_village_name,
                    item.address_street
                  ) }}
                </td>
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
                          <v-list-item @click="handleDetail(item.id)">
                            {{ $t('label.view_detail') }}
                          </v-list-item>
                          <v-list-item
                            v-if="roles[0] === 'superadmin'"
                            @click="handleResetPassword(item.id)"
                          >
                            {{ $t('route.change_password') }}
                          </v-list-item>
                          <v-list-item @click="handleEdit(item.id)">
                            {{ $t('label.update_user') }}
                          </v-list-item>
                          <v-list-item @click="handleDeleteUser(item)">
                            {{ $t('label.deleted_user') }}
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
      :total="totalList"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :on-next="onNext"
    />
    <dialog-delete
      :dialog="dialog"
      :data-deleted="dataDelete"
      :dialog-delete.sync="dialog"
      :delete-date.sync="dataDelete"
      :store-path-delete="`user/deleteUser`"
      :store-path-get-list="`user/listUser`"
      :list-query="listQuery"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { completeAddress } from '@/utils/utilsFunction'

export default {
  data() {
    return {
      headers: [
        { text: '#', value: '_id', sortable: false },
        { text: 'USERNAME', value: 'username' },
        { text: 'NAMA LENGKAP', value: 'fullname' },
        { text: 'EMAIL', value: 'email' },
        { text: 'NO TELEPON', value: 'phone_number' },
        { text: 'ALAMAT', value: 'address_street' },
        { text: 'AKSI', value: 'actions', sortable: false }
      ],
      loadingTable: false,
      listQuery: {
        page: 1,
        limit: 30,
        search: ''
      },
      districtCity: {
        kota_kode: ''
      },
      dialog: false,
      dataDelete: null
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles',
      'totalList',
      'userList'
    ])
  },
  async mounted() {
    await this.$store.dispatch('user/listUser', this.listQuery)
  },
  methods: {
    completeAddress,
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    },
    async onNext() {
      await this.$store.dispatch('reports/listReportCase', this.listQuery)
    },
    async handleDeleteUser(item) {
      this.dialog = true
      const dataDelete = {
        _id: item.id
      }
      this.dataDelete = await dataDelete
    },
    async handleEdit(id) {
      await this.$router.push(`/user/edit/${id}`)
    },
    async handleDetail(id) {
      await this.$router.push(`/user/detail/${id}`)
    },
    async handleCreate() {
      await this.$router.push(`/user/create`)
    },
    handleResetPassword(id) {
      //
    }
  }
}
</script>

<style>
.header-user-list {
  background: linear-gradient(82.33deg, #27AE60 0%, #58DA8F 100%);
}
.header-user-text {
  font-size: 16px;
  color: #FFFFFF;
  margin-left: 2rem;
}
.header-user-title {
  font-size: 30px;
  margin-bottom: 10px;
}
.class-on-data-table table {
  table-layout: fixed;
}
.td-username {
  width: 100px;
}
</style>
