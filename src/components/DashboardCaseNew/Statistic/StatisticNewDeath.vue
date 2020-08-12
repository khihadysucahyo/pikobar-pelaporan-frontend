<template>
  <v-skeleton-loader
    :loading="loading"
    type="article"
    class="height-100"
  >
    <v-card
      class="statistic-new-death mx-auto height-100"
      outlined
    >
      <v-card-text class="card">
        <div class="head mb-3">
          {{ $t('label.dead') }}
        </div>
        <div class="total mb-3">
          {{ total | number }}
        </div>
        <div class="footer">
          <div class="information">
            <span class="sub-total">{{ percent | decimal }}%</span>
            &nbsp;&nbsp;
            <span class="sub-label">{{ $t('label.of_the_total_confirmed_cases') }}</span>
          </div>
          <div class="progress-bar">
            <div
              v-if="percent === 0"
              :style="{ width: '100%' }"
            />
            <div
              v-if="percent > 0"
              class="one"
              :style="{ width: Number(percent) + '%' }"
            />
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
export default {
  name: 'StatisticNewDeath',
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
      totalConfirmed: 0,
      total: 0,
      percent: 0
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

      this.totalConfirmed = sickHome + sickHospital + recovered + decease
      this.total = decease
      this.percent =
        this.total > 0
          ? ((this.total / this.totalConfirmed) * 100).toFixed(2)
          : 0
    }
  }
}
</script>

<style lang="scss">
.statistic-new-death {
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

    .footer {
      .information {
        margin-bottom: 5px;

        .sub-total {
          font-weight: bold;
          color: #9c0000;
        }

        .sub-label {
          font-size: 10.5px;
        }
      }

      .progress-bar {
        margin-bottom: 5px;
        background-color: #f5f5f5;
        border-radius: 13px;

        div {
          height: 10px;
          border-radius: 10px;
        }

        .one {
          z-index: 3;
          background-color: #9c0000;
        }
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
