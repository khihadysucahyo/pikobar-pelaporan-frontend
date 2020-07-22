<template>
  <v-skeleton-loader
    :loading="loading"
    type="article"
  >
    <v-card
      class="statistic-new-active mx-auto"
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
            <span class="sub-total">10.012.236</span>
            &nbsp;&nbsp;
            <span class="sub-label">{{ $t('label.self_isolation') }}</span>
          </div>
          <div>
            <span class="sub-total">99.036.190</span>
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
    total: {
      type: Number,
      default: 0
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
        color: #F2994A;
      }

      .sub-label {
        font-size: 11px;
      }
    }
  }
}
</style>
