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
        <v-row>
          <v-col>
            <v-data-table
              :headers="headers"
              :items="list"
              :mobile-breakpoint="NaN"
              :no-data-text="$t('label.data_empty')"
              :items-per-page="10"
              hide-default-footer
            />
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
    />
  </v-dialog>
</template>
<script>
export default {
  name: 'DialogCloseContact',
  props: {
    showDialog: {
      type: Boolean,
      default: false
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
      headers: [
        { text: '#', value: '_id', sortable: false },
        { text: this.$t('label.name').toUpperCase(), value: 'name' },
        { text: this.$t('label.gender').toUpperCase(), value: 'gender' },
        { text: this.$t('label.age').toUpperCase(), value: 'age' },
        { text: this.$t('label.address').toUpperCase(), value: 'address' },
        { text: this.$t('label.action').toUpperCase(), value: 'actions' }
      ],
      list: [],
      dialogDecline: false,
      refreshPageList: false
    }
  },
  watch: {
    showDialog(value) {
      this.show = value
    },
    show(value) {
      this.$emit('update:show', value)
    }
  },
  methods: {
    handleCreate() {
      this.showCreateCloseContact = true
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
