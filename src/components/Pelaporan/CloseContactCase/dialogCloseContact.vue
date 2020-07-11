<template>
  <v-dialog v-model="show" max-width="70%">
    <v-skeleton-loader
      :loading="isLoading"
      type="table-tbody"
    >
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
                            <v-list-item @click="handleUpdate(item._id)">
                              {{ $t('route.make_report') }}
                            </v-list-item>
                            <v-list-item @click="handleUpdateCloseContact(item._id)">
                              {{ $t('label.edit_contact_data') }}
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
    </v-skeleton-loader>
    <dialog-create-close-contact
      :show-dialog="showCreateCloseContact"
      :show-form.sync="showCreateCloseContact"
      :title-detail="$t('label.create_closely_contact_reports')"
      :is-edit.sync="isEdit"
      :id-case.sync="idCase"
      :form-body.sync="formBody"
    />
    <dialog-update-close-contact
      :show-dialog-update-close-contact="showDialogUpdateCloseContact"
      :show-form-update-close-contact.sync="showDialogUpdateCloseContact"
      :title-detail="$t('label.edit_contact_data')"
      :form-update-close-contact="formCloseContact"
      :id-close-contact="idCloseContact"
    />
  </v-dialog>
</template>
<script>
import { formatDatetime } from '@/utils/parseDatetime'
import { getAgeWithMonth } from '@/utils/constantVariable'
import { completeAddress } from '@/utils/utilsFunction'
import { mapState, mapGetters } from 'vuex'

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
      isLoading: false,
      formBody: {},
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
      refreshPageList: false,
      showDialogUpdateCloseContact: false,
      idCloseContact: null
    }
  },
  computed: {
    ...mapState('closeContactCase', [
      'formCloseContact'
    ]),
    ...mapGetters('closeContactCase', ['formCloseContact'])
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
    completeAddress,
    handleCreate() {
      this.isEdit = false
      this.formBody = this.formCloseContact
      this.showCreateCloseContact = true
    },
    async handleUpdate(id) {
      const data = {
        idCloseContact: id
      }
      this.isLoading = true
      const response = await this.$store.dispatch('closeContactCase/getDetailCloseContactByCase', data)
      Object.assign(this.formBody, response.data)
      if (response.data) {
        this.formBody.birth_date = await formatDatetime(this.formBody.birth_date, this.formatDate)
        const age = getAgeWithMonth(this.formBody.birth_date)
        this.formBody.yearsOld = age.year
        this.formBody.month = age.month
      } else {
        this.formBody.birth_date = ''
      }
      this.isEdit = true
      this.showCreateCloseContact = true
      this.isLoading = false
    },
    getTableRowNumbering(index) {
      return (index + 1)
    },
    async handleUpdateCloseContact(id) {
      this.idCloseContact = id
      const data = {
        idCloseContact: id
      }
      const response = await this.$store.dispatch('closeContactCase/getDetailCloseContactByCase', data)
      Object.assign(this.formCloseContact, response.data)
      this.showDialogUpdateCloseContact = true
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
