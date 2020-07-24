<template>
  <v-skeleton-loader
    :loading="loading"
    type="article"
  >
    <v-card
      class="statistic-new-confirmed mx-auto"
      outlined
    >
      <v-card-text class="card">
        <div class="head mb-3">
          {{ $t('label.total_case_confirmed') }}
        </div>
        <div class="total mb-3">
          {{ total | number }}
        </div>
        <div class="information">
          <div style="visibility: hidden;">
            <span class="sub-total">12.236</span>
            &nbsp;&nbsp;
            <span class="sub-label">{{ $t('label.self_isolation') }}</span>
          </div>
          <div style="visibility: hidden;">
            <span class="sub-total">36.190</span>
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
  name: 'StatisticNewConfirmed',
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
.statistic-new-confirmed {
  .card {
    background-color: #EB5757;
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
