<template>
  <v-skeleton-loader
    :loading="loading"
    type="article"
    class="height-100"
  >
    <v-card
      class="statistic-new-confirmed mx-auto height-100"
      outlined
    >
      <v-card-text class="card height-100">
        <div class="head mb-3">
          {{ $t('label.total_case_confirmed') }}
        </div>
        <div class="total mb-3">
          {{ total | number }}
        </div>
      </v-card-text>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
export default {
  name: 'StatisticNewConfirmed',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    statistic: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      confirmed: null,
      total: 0
    }
  },
  watch: {
    statistic: {
      handler(value) {
        this.confirmed = value
        this.getData()
      },
      deep: true
    }
  },
  methods: {
    getData() {
      const sickHome = this.confirmed.sick_home
      const sickHospital = this.confirmed.sick_hospital
      const recovered = this.confirmed.recovered
      const decease = this.confirmed.decease
      this.total = sickHome + sickHospital + recovered + decease
    }
  }
}
</script>

<style lang="scss">
.statistic-new-confirmed {
  .card {
    background-color: #eb5757;
    color: #ffffff !important;

    .head {
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .total {
      font-size: 24px;
      font-weight: 500;
    }
  }
}
</style>

<style scoped>
.height-100 {
  height: 100%;
}
</style>
