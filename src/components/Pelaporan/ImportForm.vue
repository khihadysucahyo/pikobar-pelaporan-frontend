<template>
  <v-dialog v-model="show" max-width="50%" :persistent="isLoading">
    <v-card>
      <v-tabs
        v-model="tab"
        class="elevation-2"
        background-color="white"
        active-class="active-class"
        color="red"
        hide-slider
      >
        <v-tab>{{ $t('label.import') }}</v-tab>
        <v-tab>{{ $t('label.guidance') }}</v-tab>
        <v-tab-item>
          <v-card flat tile class="pa-5">
            <v-card-text class="pa-0 mb-4 headline font-weight-medium">
              {{ $t('label.import_instruction') }}
              <a
                class="headline font-weight-medium"
                href="https://drive.google.com/drive/folders/1AzS8INObyQ8bW0FpIjU9LdYD4jDGR0ly"
                target="_blank"
              >{{ $t('label.download_here') }}</a>
            </v-card-text>
            <div v-cloak @drop.prevent="onDrop" @dragover.prevent @click="openFile">
              <v-card height="100px" outlined class="import-container">
                <v-row class="full-height" align="center" justify="center">
                  <v-icon large class="mr-2" color="#27ae60">mdi-attachment</v-icon>
                  <h2 class="import-container-text">{{ $t('label.drop_file_here') }}</h2>
                </v-row>
              </v-card>
              <input
                ref="uploader"
                class="d-none"
                type="file"
                accept=".xlsx"
                :disabled="isLoading"
                @input="onFileChanged"
              >
            </div>
            <v-row v-if="selectedFile" align="center" justify="space-between">
              <v-col>{{ selectedFile.name }}</v-col>
              <v-col>
                ({{ selectedFile.size / 1000 }} {{ $t('label.kilobyte') }})
                <v-btn icon :disabled="isLoading" @click="selectedFile = null">
                  <v-icon color="red" class="pb-1">mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-if="selectedFile" justify="end" class="mr-0">
              <v-btn large color="success" :loading="isLoading" @click="onImport">{{ $t('label.import') }}</v-btn>
            </v-row>
            <v-row v-if="errorList.length > 0 && !isLoading" class="ml-0">{{ $t('label.error_message') }}</v-row>
            <div v-if="errorType === 'row' && !isLoading">
              <v-row
                v-for="row in errorList"
                :key="row.rowNumber"
                class="my-2 mx-1 pa-3 error-message"
              >
                <span class="font-weight-bold">{{ $t('label.data_in_row') }} {{ row.rowNumber }}</span>
                <span
                  v-for="(item, index) in row.data"
                  :key="item.columnName"
                >
                  <span class="ml-1">{{ item.description }}</span><span v-if="index + 1 < row.data.length">,</span>
                </span>
              </v-row>
            </div>
            <div v-else-if="errorType === 'message' && !isLoading">
              <v-row v-for="(error, index) in errorList" :key="index">
                <v-row class="my-2 mx-1 pa-3 error-message">{{ error }}</v-row>
              </v-row>
            </div>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat tile>
            <v-card-text class="headline font-weight-bold ma-0">{{ $t('label.import_instruction_title') }}</v-card-text>
            <v-card-text
              class="pa-0 px-4 py-2 font-weight-bold"
            >{{ $t('label.import_instruction_step_1') }}</v-card-text>
            <v-card-text
              class="pa-0 px-4 py-2 font-weight-bold"
            >{{ $t('label.import_instruction_step_2') }}</v-card-text>
            <v-card-text
              class="pa-0 px-4 py-2 font-weight-bold"
            >{{ $t('label.import_instruction_step_3') }}</v-card-text>
            <v-card-text
              class="pa-0 px-4 py-2 font-weight-bold"
            >{{ $t('label.import_instruction_step_4') }}</v-card-text>
            <v-card-text
              class="pa-0 px-4 py-2 font-weight-bold"
            >{{ $t('label.import_instruction_step_5') }}</v-card-text>
            <v-card-text
              class="pa-0 px-4 py-2 mb-6 font-weight-bold"
            >{{ $t('label.import_instruction_step_6') }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-dialog>
</template>
<script>
import i18n from '@/lang'
export default {
  name: 'ImportForm',
  props: {
    showImportForm: {
      type: Boolean,
      default: false
    },
    refreshPage: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      tab: null,
      selectedFile: null,
      show: this.showImportForm,
      errorMessage: null,
      failedDialog: false,
      isLoading: false,
      errorList: [],
      errorType: null
    }
  },
  watch: {
    showImportForm(value) {
      this.show = value
      if (value) {
        this.selectedFile = null
        this.errorList = []
        this.errorType = null
      }
    },
    show(value) {
      this.$emit('update:show', value)
      if (!value) {
        this.selectedFile = null
        this.errorList = []
        this.errorType = null
      }
    },
    selectedFile(value) {
      if (value === null) {
        this.$refs.uploader.value = null
      }
    }
  },
  methods: {
    openFile() {
      this.$refs.uploader.click()
    },
    onFileChanged(e) {
      const droppedFiles = e.target.files
      if (!droppedFiles) return
      this.selectedFile = droppedFiles[0]
    },
    onDrop(e) {
      const droppedFiles = e.dataTransfer.files
      if (!droppedFiles) return
      if (
        droppedFiles[0].type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        this.selectedFile = droppedFiles[0]
      } else {
        this.errorMessage = i18n.t('errors.field_only_accepts_xlsx')
        this.failedDialog = true
        this.$emit('update:failed', this.failedDialog)
        this.$emit('update:message', this.errorMessage)
      }
    },
    async onImport() {
      this.isLoading = true
      const formData = new FormData()
      formData.append('file', this.selectedFile)
      const response = await this.$store.dispatch('reports/importExcel', formData)
      if (!response) {
        this.isLoading = false
        return
      }
      if (response.status === 200 || response.status === 201) {
        this.errorType = null
        this.show = false
        this.$emit('update:success', true)
        this.refreshPage()
      } else if (response.data.errors[0].rowNumber) {
        this.errorList = response.data.errors
        this.errorType = 'row'
      } else {
        this.errorList = response.data.errors
        this.errorType = 'message'
      }
      this.isLoading = false
    }
  }
}
</script>
<style>
.active-class {
  background-color: #27ae60;
  color: white !important;
}
.import-container {
  background-color: #fafafa !important;
  cursor: pointer;
}
.full-height {
  height: 100% !important;
}
.import-container-text {
  color: #646464 !important;
}
.error-message {
  background-color: #fad8d8;
  border-radius: 10px;
  color: #eb3535;
}
</style>
