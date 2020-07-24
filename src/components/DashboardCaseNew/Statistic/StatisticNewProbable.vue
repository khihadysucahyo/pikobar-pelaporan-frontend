<template>
  <v-skeleton-loader
    :loading="loading"
    type="article"
    style="height-100"
  >
    <v-card
      class="statistic-new-probable mx-auto height-100"
      outlined
    >
      <v-card-text class="card">
        <div class="head d-flex mb-3">
          {{ $t('label.total_probable') }}
          <div class="ml-auto">
            <v-tooltip bottom class="statistic">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                >help_outline</v-icon>
              </template>
              <span>
                <span class="font-weight-bold">PROBABEL</span><br>
                Kasus suspek dengan ISPA<br>
                Berat/ARDS***/meninggal<br>
                dengan gambaran klinis yang<br>
                meyakinkan COVID-19 dan<br>
                belum ada hasil pemeriksaan<br>
                laboratorium RT-PCR.
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
                <div class="sub-label">{{ $t('label.still_sick') }}</div>
              </v-col>
              <v-col col="12" lg="4">
                <div class="sub-total text-right">
                  98.520.000
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
                <div class="box mr-2" :style="{ backgroundColor: '#9C0000' }" />
                <div class="sub-label">{{ $t('label.dead') }}</div>
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
  name: 'StatisticNewProbable',
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
.statistic-new-probable {
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
          background-color: #9C0000;
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

.height-100 {
  height: 100%;
}
</style>
