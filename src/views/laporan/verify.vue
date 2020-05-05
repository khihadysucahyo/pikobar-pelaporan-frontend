<template>
  <div>
    <v-card outlined>
      <v-container class="px-10">
        <v-row class="filter-row mt-5" justify="center">
          <v-col cols="12" sm="9">
            <v-text-field
              v-model="listQuery.search"
              solo
              :label="$t('label.search')"
              prepend-inner-icon="search"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" sm="9" class="reduce-padding-top">
            <address-region
              :disabled-district="disabledDistrict"
              :district-code="listQuery.address_district_code"
              :district-name="district_name_user"
              :code-district.sync="listQuery.address_district_code"
              :sub-district-code="listQuery.address_subdistrict_code"
              :code-sub-district.sync="listQuery.address_subdistrict_code"
              :village-code="listQuery.address_village_code"
              :code-village.sync="listQuery.address_village_code"
              :village-name="villageName"
              :name-village.sync="villageName"
              :disabled-address="false"
              :required-address="false"
              :is-label="true"
            />
          </v-col>
        </v-row>
        <v-row class="filter-row" justify="center">
          <v-col cols="12" sm="3">
            <v-label class="title">{{ $t('label.reporting_sources') }}:</v-label>
            <v-text-field
              v-if="roles[0] === 'faskes'"
              v-model="listQuery.author"
              solo-inverted
              disabled
            />
            <v-autocomplete
              v-else
              v-model="listQuery.author"
              :items="listMedicalFacility"
              solo
              clearable
              item-text="fullname"
              item-value="_id"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-label class="title">{{ $t('label.criteria') }}:</v-label>
            <v-select
              v-model="listQuery.status"
              :items="stagesList"
              solo
              item-text="label"
              item-value="value"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <br>
            <v-row justify="space-between">
              <v-col class="reduce-padding-top reduce-padding-right">
                <v-btn
                  color="#4f4f4f"
                  class="btn-reset"
                  @click="onReset"
                >
                  {{ $t('label.reset') }}
                </v-btn>
              </v-col>
              <v-col class="reduce-padding-top reduce-padding-left">
                <v-btn
                  color="success"
                  class="btn-cari"
                  @click="handleSearch"
                >
                  {{ $t('label.look_for_it') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      <hr>
      <v-row class="mx-0 mt-5" align="center" justify="space-between">
        <v-col>
          <div class="title">
            {{ $t('label.verify_new_case') }}
          </div>
        </v-col>
        <v-col class="align-right">
          <span class="info-message pa-3">
            {{ $t('label.verification_info') }}
          </span>
        </v-col>
      </v-row>
      <hr>
      <v-row>
        <v-col auto>
          <v-data-table
            :headers="headers"
            :items="listKasus"
            :mobile-breakpoint="NaN"
            :no-data-text="$t('label.data_empty')"
            :items-per-page="listQuery.limit"
            :loading="loadingTable"
            hide-default-footer
          >
            <template v-slot:item="{ item, index }">
              <tr>
                <td>{{ getTableRowNumbering(index) }}</td>
                <td>{{ item.nik }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.age }} Th</td>
                <td>
                  <div v-if="item.gender == 'P'">
                    {{ $t('label.female_initials') }}
                  </div>
                  <div v-else>
                    {{ $t('label.male_initials') }}
                  </div>
                </td>
                <td><status :status="item.status" /> </td>
                <td>
                  <div v-if=" item.last_history.stage === '0'">
                    {{ $t('label.process') }}
                  </div>
                  <div v-else>
                    {{ $t('label.done') }}
                  </div>
                </td>
                <td>
                  <div v-if=" item.last_history.final_result === '0'">
                    {{ $t('label.negatif') }}
                  </div>
                  <div v-else-if=" item.last_history.final_result === '1'">
                    {{ $t('label.recovery') }}
                  </div>
                  <div v-else-if=" item.last_history.final_result === '2'">
                    {{ $t('label.dead') }}
                  </div>
                  <div v-else>
                    -
                  </div>
                </td>
                <td>{{ item.author.username }}</td>
                <td>{{ item.last_history.createdAt ? timeRemain(item.last_history.createdAt) : '-' }}</td>
                <td>
                  <span
                    v-if="roles[0] === 'faskes'"
                    :class="{'pending': item.verified_status === 'pending', 'declined': item.verified_status === 'declined'}"
                    class="pa-2 font-weight-bold"
                  >
                    {{ item.verified_status === 'pending' ? $t('label.being_checked') : $t('label.declined') }}
                  </span>
                  <span v-else class="verif-btn px-4 py-2">
                    {{ $t('label.verify') }}
                  </span>
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
      :store-path-delete="`reports/deleteReportCase`"
      :store-path-get-list="`reports/listReportCase`"
      :list-query="listQuery"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import { formatDatetime } from '@/utils/parseDatetime'
import i18n from '@/lang'
export default {
  name: 'LaporanList',
  data() {
    return {
      headers: [
        { text: '#', value: '_id', sortable: false },
        { text: 'NIK', value: 'nik' },
        { text: 'NAMA', value: 'name' },
        { text: 'USIA', value: 'age' },
        { text: 'JENIS KELAMIN', value: 'gender' },
        { text: 'KRITERIA', value: 'kriteria' },
        { text: 'TAHAPAN', value: 'stage' },
        { text: 'HASIL', value: 'final_result' },
        { text: 'PELAPOR', value: 'author' },
        { text: 'BATAS VERIFIKASI OTOMATIS', value: 'createdAt' }
      ],
      loadingTable: false,
      listQuery: {
        address_district_code: '',
        address_subdistrict_code: '',
        address_village_code: '',
        status: '',
        author: '',
        page: 1,
        limit: 30,
        search: '',
        verified_status: ''
      },
      medicalFacilityListQuery: {
        role: 'faskes',
        code_district_city: '',
        search: ''
      },
      stagesList: [
        'OTG',
        'ODP',
        'PDP',
        'POSITIF'
      ],
      dialog: false,
      dataDelete: null,
      failedDialog: false,
      disabledDistrict: true,
      listMedicalFacility: [],
      villageName: ''
    }
  },
  computed: {
    ...mapGetters('reports', [
      'listKasus',
      'totalList'
    ]),
    ...mapGetters('user', [
      'roles',
      'district_user',
      'fullName',
      'district_name_user'
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
    if (this.roles[0] === 'faskes') {
      this.headers.push({ text: 'STATUS', value: 'status' })
      this.listQuery.author = this.fullName
      this.listQuery.verified_status = 'pending,declined'
    } else {
      this.headers.push({ text: 'AKSI', value: 'actions', sortable: false })
      this.listQuery.verified_status = 'pending'
    }
    await this.$store.dispatch('reports/listReportCase', this.listQuery)
    this.listQuery.address_district_code = this.district_user
    this.medicalFacilityListQuery.code_district_city = this.district_user
    const responseMedList = await this.$store.dispatch('reports/listMedicalFacility', this.medicalFacilityListQuery)
    this.listMedicalFacility = responseMedList.data
  },
  methods: {
    async handleSearch() {
      await this.$store.dispatch('reports/listReportCase', this.listQuery)
    },
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    },
    async onNext() {
      await this.$store.dispatch('reports/listReportCase', this.listQuery)
    },
    onReset() {
      this.listQuery.search = ''
      this.listQuery.final_result = ''
      this.listQuery.status = ''
      this.listQuery.author = ''
      this.listQuery.address_subdistrict_code = ''
      this.listQuery.address_village_code = ''
      this.villageName = ''
      if (this.roles[0] !== 'dinkeskota') {
        this.listQuery.address_district_code = ''
        this.codeDistrict = ''
      }
      this.$store.dispatch('reports/listReportCase', this.listQuery)
    },
    timeRemain(value) {
      var seconds = moment(Date.now()).diff(moment(value), 'seconds')
      var hours = seconds / 3600
      var minutes = seconds / 60
      var result = '-'
      if (24 - hours >= 1) {
        var remainingHours = 24 - hours
        result = Math.ceil(remainingHours) + ' ' + i18n.t('label.hours')
      } else if (60 - minutes >= 1) {
        var remainingMinutes = 60 - minutes
        result = Math.ceil(remainingMinutes) + ' ' + i18n.t('label.minutes')
      }
      return result
    },
    formatDatetime
  }
}
</script>
<style>
  .title {
    font-size: 2rem;
    text-transform: uppercase;
    margin-left: 30px;
    color: #828282;
  }
  .align-right {
    text-align: right;
    padding-right: 50px;
  }
  .margin-right {
    margin-right: 8px;
  }
  .margin-left {
    margin-left: 8px;
  }
  .info-message {
    background-color: #d2eaff;
    border-radius: 10px;
    color: #2f7fed;
  }
  .reduce-padding-top {
    padding-top: 0px !important;
  }
  .reduce-padding-right {
    padding-right: 6px;
  }
  .reduce-padding-left {
    padding-left: 6px;
  }
  .btn-reset {
    height: 46px !important;
    min-width: 95px!important;
    color: white !important;
  }
  .btn-cari {
    height: 46px !important;
    min-width: 95px!important;
  }
  .verif-btn {
    background-color: white;
    border-radius: 10px;
    border-color: grey;
    border-style: solid;
    border-width: thin;
    color: grey;
    cursor: pointer;
  }
  .verif-btn:hover {
    background-color: grey;
    border-radius: 10px;
    border-color: grey;
    border-style: solid;
    border-width: thin;
    color: white;
    cursor: pointer;
  }
  .pending {
    color: white;
    border-radius: 10px;
    background-color: #2a58ff;
  }
  .declined {
    color: white;
    border-radius: 10px;
    background-color: #f91717;
  }
</style>
