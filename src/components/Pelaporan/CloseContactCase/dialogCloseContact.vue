<template>
  <v-dialog v-model="show" max-width="70%">
    <v-card>
      <v-card-title>
        {{ titleDetail }}
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
          class="mx-auto border-card"
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
                <div>Tambah Data Kontak</div>
              </div>
            </v-row>
          </v-container>
        </v-card>
        <v-row class="mb-3">
          <v-col>
            <v-btn
              color="#FFFFFF"
              block
              @click="showDialog = false"
            >
              Kembali
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
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
      tab: null,
      show: this.showDialog,
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
    //
  }
}
</script>
<style scoped>
   .border-card {
        border: 1px dashed #E0E0E0;
        box-sizing: border-box;
        border-radius: 8px;
   }
</style>
