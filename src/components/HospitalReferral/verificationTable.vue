<template>
  <v-col auto>
    <v-data-table
      :key="listReferral.length"
      :headers="tableHeaders"
      :items="listReferral"
      :mobile-breakpoint="NaN"
      :no-data-text="$t('label.data_empty')"
      :items-per-page="listQuery.limit"
      hide-default-footer
    >
      <template v-slot:item="{ item, index }">
        <tr>
          <td>{{ getTableRowNumbering(index) }}</td>
          <td> {{ item.case.nik }} </td>
          <td> {{ item.case.name }} </td>
          <td> {{ item.case.age }} </td>
          <td> {{ item.case.gender }} </td>
          <td> {{ item.case.phone_number }} </td>
          <td> {{ item.case.status }} </td>
          <td> {{ item.transfer_from_unit_name }} </td>
          <td> {{ item.case.transfer_status.toUpperCase() }} </td>
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
                    <v-list-item @click="handleDetail(item, item.case._id)">
                      {{ $t('label.view_detail') }}
                    </v-list-item>
                    <v-list-item>
                      {{ $t('label.remove_reference') }}
                    </v-list-item>
                  </div>
                </v-card>
              </v-menu>
            </v-card-actions>
          </td>
        </tr>
      </template>
    </v-data-table>
    <pop-up-detail-case-referral
      :show-dialog="dialogDetailCase"
      :show.sync="dialogDetailCase"
      :detail-case="detailCase"
      :detail-transfer="detailTransfer"
      :case-detail.sync="detailCase"
      :transfer-detail.sync="detailTransfer"
      :list-history-case="listHistoryCase"
      :user-unit-type="unitType"
      :title-detail="$t('label.detail_case')"
    />
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'VerificationTableReferral',
  props: {
    listReferral: {
      type: Array,
      default: null
    },
    listQuery: {
      type: Object,
      default: null
    },
    tableHeaders: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      dialogDetailCase: false,
      detailCase: {},
      detailTransfer: {},
      listHistoryCase: []
    }
  },
  computed: {
    ...mapGetters('user', [
      'unitType'
    ])
  },
  methods: {
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    },
    async handleDetail(tranferDetail, idCase) {
      const responseHistory = await this.$store.dispatch('reports/listHistoryCase', idCase)
      this.detailCase = tranferDetail.case
      this.listHistoryCase = responseHistory.data
      this.detailTransfer = tranferDetail
      this.dialogDetailCase = true
    }
  }
}
</script>

<style scoped>

</style>
