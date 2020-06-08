<template>
  <v-select
    v-model="selected"
    :items="listStatus"
    item-value="id"
    item-text="name"
    :label="$t('label.status')"
    solo
    @change="onSelectStatus"
  />
</template>

<script>
export default {
  name: 'SelectStatus',
  props: {
    selectedStatus: {
      type: String,
      default: null
    },
    onSelectStatus: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      listStatus: [
        {
          id: 'all',
          name: `${this.$t('label.all')} ${this.$t('label.status')}`
        },
        {
          id: 'POSITIF-3',
          name: `${this.$t('label.positive')} ${this.$t('label.covid19')}`
        },
        {
          id: 'POSITIF-0',
          name: `${this.$t('label.positive')} - ${this.$t('label.active')}`
        },
        {
          id: 'POSITIF-1',
          name: `${this.$t('label.positive')} - ${this.$t('label.recovery')}`
        },
        {
          id: 'POSITIF-2',
          name: `${this.$t('label.positive')} - ${this.$t('label.dead')}`
        },
        {
          id: 'ODP-0',
          name: `${this.$t('label.odp')} - ${this.$t('label.process')}`
        },
        {
          id: 'ODP-1',
          name: `${this.$t('label.odp')} - ${this.$t('label.done')}`
        },
        {
          id: 'PDP-0',
          name: `${this.$t('label.pdp')} - ${this.$t('label.process')}`
        },
        {
          id: 'PDP-1',
          name: `${this.$t('label.pdp')} - ${this.$t('label.done')}`
        },
        {
          id: 'OTG-0',
          name: `${this.$t('label.otg')} - ${this.$t('label.process')}`
        },
        {
          id: 'OTG-1',
          name: `${this.$t('label.otg')} - ${this.$t('label.done')}`
        }
      ],
      selected: null
    }
  },
  watch: {
    'selectedStatus': (value) => {
      this.selected = value
    }
  },
  async mounted() {
    this.selected = this.selectedStatus
  }
}
</script>

<style scoped>
.v-text-field__details {
  display: none !important;
}
</style>
