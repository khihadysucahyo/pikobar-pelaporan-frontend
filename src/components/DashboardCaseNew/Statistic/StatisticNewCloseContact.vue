<template>
  <v-skeleton-loader
    :loading="loading"
    type="article"
  >
    <v-card
      class="statistic-new-close-contact mx-auto"
      outlined
    >
      <v-card-text class="card">
        <div class="head d-flex mb-3">
          {{ $t('label.total_close_contact') }}
          <div class="ml-auto">
            <v-tooltip bottom class="statistic">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                >help_outline</v-icon>
              </template>
              <span>
                <span class="font-weight-bold">KONTAK ERAT</span><br>
                Orang yang memiliki riwayat<br>
                kontak dengan kasus probable<br>
                atau konfirmasi COVID-19.
              </span>
            </v-tooltip>
          </div>
        </div>
        <div class="total mb-5">
          {{ total | number }}
        </div>
        <div class="footer">
          <div class="progress-bar d-flex mb-2">
            <div class="one text-center" :style="{ width: (1 + 10) + '%' }">
              1%
            </div>
            <div class="two text-center" :style="{ width: (49 + 10) + '%' }">
              49%
            </div>
            <div class="three text-center" :style="{ width: (50 + 10) + '%' }">
              50%
            </div>
          </div>
          <div class="information">
            <v-row>
              <v-col col="12" lg="8" class="d-flex pr-0">
                <div class="box mr-2" :style="{ backgroundColor: '#F2994A' }" />
                <div class="sub-label">{{ $t('label.isolation_still_sick') }}</div>
              </v-col>
              <v-col col="12" lg="4">
                <div class="sub-total text-right">
                  52.020.000
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col col="12" lg="8" class="d-flex pr-0">
                <div class="box mr-2" :style="{ backgroundColor: '#219653' }" />
                <div class="sub-label">{{ $t('label.finished_isolation_recovery') }}</div>
              </v-col>
              <v-col col="12" lg="4">
                <div class="sub-total text-right">
                  20.000
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col col="12" lg="8" class="d-flex pr-0">
                <div class="box mr-2" :style="{ backgroundColor: '#828282' }" />
                <div class="sub-label">{{ $t('label.discarded') }}</div>
              </v-col>
              <v-col col="12" lg="4">
                <div class="sub-total text-right">
                  20.000
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-skeleton-loader>
</template>

<script>
export default {
  name: 'StatisticNewCloseContact',
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
.statistic-new-close-contact {
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
      .progress-bar {
        color: #ffffff;
        margin-bottom: 5px;
        background-color: #F5F5F5;
        border-radius: 13px;

        div {
          height: 20px;
          border-radius: 10px;
        }

        .one {
          z-index: 3;
          background-color: #F2994A;
        }

        .two {
          z-index: 2;
          background-color: #27AE60;
          margin-left: -15px;
        }

        .three {
          z-index: 1;
          background-color: #828282;
          margin-left: -15px;
        }
      }

      .information {
        .box {
          width: 15px;
          height: 15px;
          border-radius: 3px;
          margin-top: 2px;
        }

        .sub-total {
          font-weight: bold;
          color: #000000;
        }

        .sub-label {
          font-size: 11px;
        }
      }
    }
  }
}
</style>

<style scoped>
.v-tooltip__content {
  opacity: 1 !important;
  background-color: #ffffff;
  color: #000000;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  padding: 16px;
}
</style>
