<template>
  <div>
    <v-card class="d-block pa-1 mx-auto header-application-logistic">
      <v-row class="mt-2">
        <v-col auto>
          <v-card-text>
            <div class="header-user-title">Total List Pasien Rujukan : 10</div>
            <div class="header-user-text">Dinas Kota Bandung</div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
    <v-row class="mt-2">
      <v-col
        cols="12"
        sm="6"
        @click="handleReferralCase"
      >
        <v-card
          outlined
        >
          <div class="d-flex">
            <v-avatar
              class="ma-2"
              size="125"
              tile
            >
              <v-img src="@/static/hospital_reference_1.svg" />
            </v-avatar>
            <v-list-item-content class="flex-wrap pos-center">
              <v-list-item-title class="font-weight-bold" style="font-size: 16px">
                Pasien Terdata Di [Nama RS-nya]
              </v-list-item-title>
              <v-list-item-subtitle>
                Klik disini apabila pasien sudah terdata di <br>RS [Nama RS-nya]
              </v-list-item-subtitle>
            </v-list-item-content>
            <div class="pos-center">
              <v-icon style="font-size: 3rem;color: #27AE60;">
                mdi-chevron-right
              </v-icon>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-card
          outlined
        >
          <div class="d-flex">
            <v-avatar
              class="ma-2"
              size="125"
              tile
            >
              <v-img src="@/static/hospital_reference_2.svg" />
            </v-avatar>
            <v-list-item-content class="pos-center">
              <v-list-item-title class="flex-nowrap font-weight-bold" style="font-size: 16px">
                Pasien Belum Terdata Di [Nama RS-nya]
              </v-list-item-title>
              <v-list-item-subtitle>
                Klik disini apabila pasien belum terdata di <br>RS [Nama RS-nya]
              </v-list-item-subtitle>
            </v-list-item-content>
            <div class="pos-center">
              <v-icon style="font-size: 3rem;color: #27AE60;">
                mdi-chevron-right
              </v-icon>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <pop-up-referral
      :dialog="dialog"
    />
  </div>
</template>

<script>
export default {
  name: 'FormHospitalReferral',
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    async handleReferralCase() {
      console.log('ok')
      this.dialog = true
    }
  }
}
</script>

<style scoped type="scss">
  .header-application-logistic {
    background: linear-gradient(82.33deg, #27AE60 0%, #58DA8F 100%);
  }
  .header-user-text {
    font-size: 14px;
    color: #FFFFFF;
  }
  .header-user-title {
    font-size: 26px;
    color: #FFFFFF;
    margin-bottom: 10px;
  }
</style>
