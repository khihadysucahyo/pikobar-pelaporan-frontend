<template>
  <v-dialog v-model="show" max-width="30%">
    <v-card>
      <v-row class="mx-0" justify="center" align="center">
        <v-icon size="80px" color="red">mdi-close-circle</v-icon>
      </v-row>
      <v-row class="mx-0" align="center" justify="center">
        <v-card-title class="display-1 font-weight-bold pt-0 message">{{ $t('label.nik_already_registered') }}</v-card-title>
      </v-row>
      <v-row class="mx-0" justify="center" align="center">
        <v-card-text
          class="pt-0 text-center"
        >
          {{ $t('label.nik') }} <span class="font-weight-bold">{{ nik }}</span> {{ $t('label.in_the_name_of') }} <span class="font-weight-bold">{{ name }}</span> {{ $t('label.already_listed_by') }} <span class="font-weight-bold">{{ author }}</span>
        </v-card-text>
      </v-row>
      <v-row class="mx-0" align="center" justify="center">
        <v-btn color="green darken-1" text @click="show = false">{{ $t('label.ok') }}</v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'DialogDuplicatedNik',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    nikNumber: {
      type: String,
      default: null
    },
    nikName: {
      type: String,
      default: null
    },
    nikAuthor: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      show: this.showDialog,
      nik: this.nikNumber,
      name: this.nikName,
      author: this.nikAuthor
    }
  },
  watch: {
    showDialog(value) {
      this.show = this.showDialog
    },
    show(value) {
      this.$emit('update:show', value)
    },
    nikNumber(value) {
      this.nik = value
    },
    nikName(value) {
      this.name = value
    },
    nikAuthor(value) {
      this.author = value
    }
  }
}
</script>
<style>
.message {
  color: #eb3535;
}
</style>
