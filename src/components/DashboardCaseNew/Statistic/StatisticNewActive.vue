<template>
  <v-skeleton-loader
    :loading="loading"
    type="article"
    class="height-100"
  >
    <v-card
      class="statistic-new-active mx-auto height-100"
      outlined
    >
      <v-card-text class="card">
        <div class="head mb-3">
          {{ $t('label.isolation_still_sick') }}
        </div>
        <div class="total mb-3">
          {{ total | number }}
        </div>
        <div class="information">
          <div>
            <span class="sub-total">{{ sickHome | number }}</span>
            &nbsp;&nbsp;
            <span class="sub-label">{{ $t('label.self_isolation') }}</span>
          </div>
          <div>
            <span class="sub-total">{{ sickHospital | number }}</span>
            &nbsp;&nbsp;
            <span class="sub-label">{{ $t('label.hospital_isolation') }}</span>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
export default {
  name: 'StatisticNewActive',
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
      total: 0,
      sickHome: 0,
      sickHospital: 0
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
      this.sickHome = this.confirmed.sick_home
      this.sickHospital = this.confirmed.sick_hospital
      this.total = this.sickHome + this.sickHospital
    }
  }
}
</script>

<style lang="scss">
.statistic-new-active {
  .card {
    .head {
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .total {
      color: #000000;
      font-size: 24px;
      font-weight: 500;
    }

    .information {
      .sub-total {
        font-weight: bold;
        color: #f2994a;
      }

      .sub-label {
        font-size: 11px;
      }
    }
  }
}
</style>

<style scoped>
.height-100 {
  height: 100%;
}
</style>
