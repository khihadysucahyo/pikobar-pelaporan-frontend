<template>
  <v-dialog v-model="show" max-width="70%">
    <v-card>
      <v-card-title>
        {{ titleDetail }}
        <v-spacer />
        <v-icon @click="show = false">mdi-close</v-icon>
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row class="mb-6">
          <v-col>
            <v-data-table
              :headers="headers"
              :items="listCloseContact"
              :mobile-breakpoint="NaN"
              :no-data-text="$t('label.data_empty')"
              :items-per-page="10"
              hide-default-footer
            >
              <template v-slot:item="{ item, index }">
                <tr>
                  <td>{{ getTableRowNumbering(index) }}</td>
                  <td>{{ item.name }}</td>
                  <td>
                    <div v-if="item.gender =='P'">
                      {{ $t('label.female_initials') }}
                    </div>
                    <div v-else>
                      {{ $t('label.male_initials') }}
                    </div>
                  </td>
                  <td>{{ item.age }} Th</td>
                  <td>{{ item.address_street }}</td>
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
        <v-card
          min-height="100"
          class="mx-auto mt-2 border-card"
          @click="handleCreate"
        >
          <v-container
            fill-height
            fluid
          >
            <v-row
              align="center"
              justify="center"
            >
              <div align="center" class="mt-2">
                <div>
                  <v-icon>mdi-plus-circle-outline</v-icon>
                </div>
                <div>{{ $t('label.add_contact_data') }}</div>
              </div>
            </v-row>
          </v-container>
        </v-card>
        <v-row class="mb-3">
          <v-col>
            <v-btn
              color="#FFFFFF"
              block
              @click="show = false"
            >
              {{ $t('label.back') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <dialog-create-close-contact
      :show-dialog="showCreateCloseContact"
      :show.sync="showCreateCloseContact"
      :title-detail="$t('label.create_closely_contact_reports')"
      :is-edit.sync="isEdit"
      :id-case.sync="idCase"
      :form-body.sync="formBody"
    />
  </v-dialog>
</template>
<script>
import { formatDatetime } from '@/utils/parseDatetime'
import { getAgeWithMonth } from '@/utils/constantVariable'

export default {
  name: 'DialogCloseContact',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    idCase: {
      type: String,
      default: ''
    },
    titleDetail: {
      type: String,
      default: ''
    },
    listCloseContact: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      show: this.showDialog,
      showCreateCloseContact: false,
      isEdit: false,
      formBody: {
        contact_tracing_date: '',
        travel_country_depart_date: '',
        travel_country_return_date: '',
        address_province_code: '32',
        address_province_name: 'Jawa Barat',
        travel_city_depart_date: '',
        travel_city_return_date: '',
        travel_transportations: [],
        home_contact_date: '',
        home_contact_activities: [],
        officer_is_contact: false,
        officer_protection_tools: [],
        contact_date: '',
        latest_history: {
          symptoms_date: '',
          symptoms: [],
          diseases: [],
          vaccination_influenza_vaccine_date: '',
          vaccination_pvc_vaccine_date: '',
          test_orofaringeal_swab_date: '',
          vaccination_influenza_vaccine: false,
          vaccination_pvc_vaccine: false,
          test_nasal_swab_date: '',
          test_throat_swab_date: '',
          test_nasal_swab: false,
          test_throat_swab: false,
          test_nasopharyngeal_swab: false,
          test_orofaringeal_swab: false,
          test_serum: false,
          test_nasopharyngeal_swab_date: ''
        }
      },
      headers: [
        { text: '#', value: '_id', sortable: false },
        { text: this.$t('label.name').toUpperCase(), value: 'name' },
        { text: this.$t('label.gender').toUpperCase(), value: 'gender' },
        { text: this.$t('label.age').toUpperCase(), value: 'age' },
        { text: this.$t('label.address').toUpperCase(), value: 'address_street' },
        { text: this.$t('label.action').toUpperCase(), value: 'actions' }
      ],
      dialogDecline: false,
      formatDate: 'YYYY/MM/DD',
      refreshPageList: false
    }
  },
  watch: {
    showDialog(value) {
      this.show = value
    },
    show(value) {
      this.$emit('update:show', value)
      if (!value) {
        this.$emit('update:caseId', '')
      }
    }
  },
  methods: {
    handleCreate() {
      this.showCreateCloseContact = true
    },
    async handleUpdate(id) {
      const data = {
        idCase: this.idCase,
        idCloseContact: id
      }
      const response = await this.$store.dispatch('closeContactCase/getDetailCloseContactByCase', data)
      Object.assign(this.formBody, response.data)
      if (response.data.birth_date) {
        this.formBody.birth_date = await formatDatetime(response.data.birth_date, this.formatDate)
        const age = getAgeWithMonth(this.formBody.birth_date)
        this.formBody.yearsOld = age.year
        this.formBody.monthsOld = age.month
      } else {
        this.formBody.birth_date = ''
      }
      this.isEdit = true
      this.showCreateCloseContact = true
    },
    getTableRowNumbering(index) {
      return (index + 1)
    }
  }
}
</script>
<style scoped>
   .border-card {
      color: #828282;
      border: 1px dashed #E0E0E0 !important;
      box-sizing: border-box !important;
      border-radius: 8px !important;
   }
</style>
