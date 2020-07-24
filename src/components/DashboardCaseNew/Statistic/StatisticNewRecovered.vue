<template>
  <v-skeleton-loader
    :loading="loading"
    type="article"
  >
    <v-card
      class="statistic-new-recovered mx-auto"
      outlined
    >
      <v-card-text class="card">
        <div class="head mb-3">
          {{ $t('label.finished_isolation_recovery') }}
        </div>
        <div class="total mb-3">
          {{ total | number }}
        </div>
        <div class="footer">
          <div class="information">
            <span class="sub-total">100%</span>
            &nbsp;&nbsp;
            <span class="sub-label">{{ $t('label.of_the_total_confirmed_cases') }}</span>
          </div>
          <div class="progress-bar">
            <div :style="{ width: '20%' }" />
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
export default {
  name: 'StatisticNewRecovered',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    total: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss">
.statistic-new-recovered {
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
          color: #27AE60;
        }

        .sub-label {
          font-size: 11px;
        }
      }

      .progress-bar {
        margin-bottom: 5px;
        background-color: #F5F5F5;
        border-radius: 13px;

        div {
          background-color: #27AE60;
          height: 10px;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
