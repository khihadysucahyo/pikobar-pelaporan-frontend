
<template>
  <div>
    <v-skeleton-loader
      :loading="loading"
      type="article"
    >
      <v-card class="d-block pa-1 mx-auto header-survey-list">
        <v-container>
          <v-row justify="space-between">
            <v-col cols="12" md="8" sm="8">
              <v-card-text class="font-weight-bold">
                <v-card-title class="text-header-close-contact">
                  {{ $t('label.create_closely_contact_reports') }}
                </v-card-title>
                <v-card-subtitle class="text-sub-header-close-contact">
                  {{ $t('label.redaction_search_new_contact_case') }}
                </v-card-subtitle>
              </v-card-text>
            </v-col>
            <v-col>
              <div class="background-card">
                <v-btn
                  class="float-right mt-8"
                  style="height: 40px;min-width: 80px;"
                  @click="handleCreate"
                >
                  <div style="color: #6FCF97;">
                    <v-icon>mdi-plus</v-icon>
                    {{ $t('label.add_new_contact') }}
                  </div>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-skeleton-loader>
    <v-card
      outlined
      class="mt-2"
    >
      <v-card-title>
        {{ $t('label.close_contact_list') }}
      </v-card-title>
      <v-divider />
      <v-row>
        <v-col class="ml-4">
          <search
            :list-query="listQuery"
            :handle-search="handleSearch"
          />
        </v-col>
      </v-row>
      <hr class="table-divider">
      <v-row>
        <v-col auto>
          <v-data-table
            :headers="headers"
            :items="listCloseContact"
            :mobile-breakpoint="NaN"
            :no-data-text="$t('label.data_empty')"
            :items-per-page="listQuery.limit"
            :loading="loadingTable"
            hide-default-footer
          >
            <template v-slot:item="{ item, index }">
              <tr>
                <td>{{ getTableRowNumbering(index) }}</td>
                <td>{{ item.name }}</td>
                <td>
                  <div v-if="item.gender =='P'">
                    {{ $t('label.female') }}
                  </div>
                  <div v-else>
                    {{ $t('label.male') }}
                  </div>
                </td>
                <td>{{ item.age }} Th</td>
                <td>{{ completeAddress(
                  item.address_district_name,
                  item.address_subdistrict_name,
                  item.address_village_name,
                  item.address_street
                ) }}</td>
                <td>
                  <v-btn
                    color="primary"
                    style="height: 40px;min-width: 80px;"
                    @click="handleUpdate(item._id)"
                  >
                    {{ $t('route.make_report') }}
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
    <pagination
      :total="totalPages"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      :on-next="onNext"
    />
    <dialog-create-close-contact
      :show-dialog="showCreateCloseContact"
      :show-form.sync="showCreateCloseContact"
      :title-detail="$t('label.create_closely_contact_reports')"
      :is-edit.sync="isEdit"
      :id-case.sync="idCase"
      :form-body.sync="formBody"
    />
    <dialog-delete
      :dialog="dialog"
      :data-deleted="dataDelete"
      :dialog-delete.sync="dialog"
      :delete-date.sync="dataDelete"
      :store-path-delete="`closeContactCase/deleteCloseContact`"
      :list-query="listQuery"
    />
  </div>
</template>

<script>
import { formatDatetime } from '@/utils/parseDatetime'
import { completeAddress } from '@/utils/utilsFunction'
import { getAgeWithMonth } from '@/utils/constantVariable'
import EventBus from '@/utils/eventBus'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'ListCloseContact',
  data() {
    return {
      headers: [
        { text: '#', value: '_id', sortable: false },
        { text: this.$t('label.name').toUpperCase(), value: 'name' },
        { text: this.$t('label.gender').toUpperCase(), value: 'gender' },
        { text: this.$t('label.age').toUpperCase(), value: 'age' },
        { text: this.$t('label.complete_address').toUpperCase(), value: 'createdAt' },
        { text: this.$t('label.action').toUpperCase(), value: 'actions', sortable: false }
      ],
      loading: true,
      dialog: false,
      dataDelete: null,
      listCloseContact: [],
      formatDate: 'YYYY/MM/DD',
      totalPages: 0,
      showCreateCloseContact: false,
      totalCloseContact: 0,
      loadingTable: false,
      isEdit: false,
      idCase: '',
      formBody: {},
      listQuery: {
        page: 0,
        limit: 100,
        search: ''
      }
    }
  },
  computed: {
    ...mapGetters('user', [
      'fullName'
    ]),
    ...mapState('closeContactCase', [
      'formCloseContact'
    ])
  },
  watch: {
    'listQuery.search': {
      handler: function(value) {
        if ((value !== undefined) && (value.length >= 2)) {
          this.loadingTable = true
          this.listQuery.page = 1
          this.handleSearch()
          this.loadingTable = false
        } else if (value.length === 0) {
          this.loadingTable = true
          this.listQuery.page = 1
          this.handleSearch()
          this.loadingTable = false
        }
      },
      immediate: true
    },
    async dialog(value) {
      if (!value) {
        await this.handleSearch()
      }
    }
  },
  async mounted() {
    EventBus.$on('refreshPageListReport', (value) => {
      this.handleSearch()
    })
    await this.handleSearch()
  },
  methods: {
    formatDatetime,
    completeAddress,
    async handleSearch() {
      this.listQuery.page = 1
      const response = await this.$store.dispatch('closeContactCase/getListCloseContact', this.listQuery)
      this.listCloseContact = response.data.itemsList
      this.totalPages = response.data._meta.totalPages
      this.totalCloseContact = response.data._meta.itemCount
      this.loading = false
    },
    async onNext() {
      await this.handleSearch()
    },
    async handleCreate(id) {
      await this.$router.push(`/close-contact/create`)
    },
    async handleUpdate(id) {
      this.formBody = {}
      const data = {
        idCloseContact: id
      }
      const response = await this.$store.dispatch('closeContactCase/getDetailCloseContactByCase', data)
      if (response.data !== null) {
        Object.assign(this.formBody, response.data)
        if (response.data.latest_history === null) {
          this.formBody.latest_history = {}
          Object.assign(this.formBody.latest_history, this.formCloseContact.latest_history)
        }
        if (response.data.interviewer_name === null) this.formBody.interviewer_name = this.fullName
        if (this.formBody.birth_date !== null) {
          this.formBody.birth_date = await formatDatetime(this.formBody.birth_date, this.formatDate)
          const age = getAgeWithMonth(this.formBody.birth_date)
          this.formBody.yearsOld = age.year
          this.formBody.month = age.month
        } else {
          this.formBody.birth_date = ''
        }
        if (this.formBody.age !== null) {
          this.formBody.yearsOld = Math.floor(this.formBody.age)
          this.formBody.month = Math.ceil((this.formBody.age - Math.floor(this.formBody.age)) * 12)
        }
        this.isEdit = true
        this.showCreateCloseContact = true
      }
    },
    async handleDelete(item) {
      this.dialog = true
      this.dataDelete = item
    },
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    }
  }
}
</script>
<style scoped>
  .text-header-close-contact {
    color: #FFFF !important;
    font-size: 1.4rem;
  }
  .text-sub-header-close-contact {
    color: #FFFF !important;
    font-size: 1rem;
  }
  .background-card {
      background-image: url('../../static/survey-list-icon.svg');
      min-height: 100%;
      float: right;
  }
</style>
