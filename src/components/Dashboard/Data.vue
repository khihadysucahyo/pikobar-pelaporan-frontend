<template>
  <v-card
    max-width="100%"
    class=""
  >
    <v-container>
      <p class="title">Rekap Kasus {{ fullname }}</p>
      <v-row>
        <v-col
          lg="12"
          md="12"
          sm="12"
        >
          <v-skeleton-loader
            :loading="loading"
            type="article"
          >
            <v-card
              class="mx-auto"
              outlined
            >
              <v-row>
                <v-col lg="4" md="6" sm="6">
                  <p class="subtitle-1 pl-4">Jumlah kasus terdata {{ fullname }}</p>
                </v-col>
                <v-col lg="8" md="6" sm="6">
                  <v-list-item-title class="display-1 font-weight-bold text--secondary mb-1">{{ total }}</v-list-item-title>
                </v-col>
              </v-row>
            </v-card>
          </v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="3"
          sm="6"
        >
          <v-card
            color="#fcdfe0"
            style="border-color:#ffb4b5; border-radius: .5rem"
          >
            <v-card-title class="body-1 font-weight-bold text--secondary">TERKONFIRMASI</v-card-title>

            <v-spacer />

            <v-card-subtitle class="display-2 font-weight-bold text--primary pt-0 mb-4"> {{ totalConfirmation }} <span class="display-1 font-weight-medium text--secondary pl-4">orang</span></v-card-subtitle>

          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="6"
        >
          <v-skeleton-loader
            :loading="loading"
            type="article"
          >
            <v-card
              color="#fcdfe0"
              style="border-color:#ffb4b5; border-radius: .5rem"
            >
              <v-card-title class="body-1 font-weight-bold text--secondary">POSITIF</v-card-title>

              <v-spacer />

              <v-card-subtitle class="display-2 font-weight-bold text--primary pt-0 mb-4"> {{ patien.POSITIF }} <span class="display-1 font-weight-medium text--secondary pl-4">orang</span></v-card-subtitle>

            </v-card>
          </v-skeleton-loader>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="6"
        >
          <v-skeleton-loader
            :loading="loading"
            type="article"
          >
            <v-card
              color="#d3eee3"
              style="border-color:#91dcbd; border-radius: .5rem"
            >
              <v-card-title class="body-1 font-weight-bold text--secondary">SEMBUH</v-card-title>

              <v-spacer />

              <v-card-subtitle class="display-2 font-weight-bold text--primary pt-0 mb-4">{{ final.SEMBUH }}<span class="display-1 font-weight-medium text--secondary pl-4">orang</span></v-card-subtitle>

            </v-card>
          </v-skeleton-loader>
        </v-col>
        <v-col
          cols="12"
          md="3"
          sm="6"
        >
          <v-skeleton-loader
            :loading="loading"
            type="article"
          >
            <v-card
              color="#fbeadf"
              style="border-color:#fed1b1; border-radius: .5rem"
            >
              <v-card-title class="body-1 font-weight-bold text--secondary">MENINGGAL</v-card-title>

              <v-spacer />

              <v-card-subtitle class="display-2 font-weight-bold text--primary pt-0 mb-4"> {{ final.MENINGGAL }} <span class="display-1 font-weight-medium text--secondary pl-4">orang</span></v-card-subtitle>

            </v-card>
          </v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
          sm="6"
        >
          <v-card
            outlined
          >
            <v-skeleton-loader
              :loading="loading"
              type="article"
            >
              <v-card-title class="headline font-weight-bold text--secondary text-center d-block mx-auto">ODP</v-card-title>
              <v-row>
                <!-- <v-col lg="4" md="4" sm="12">
                  <v-card-title class="headline text-center d-block mx-auto">X(x%)</v-card-title>

                  <v-card-subtitle class="text-center mb-4 pt-2">Proses Pemantauan</v-card-subtitle>
                </v-col>
                <v-col lg="4" md="4" sm="12">
                  <v-card-title class="headline text-center d-block mx-auto">X(x%)</v-card-title>

                  <v-card-subtitle class="text-center mb-4 pt-2">Selesai Pemantauan</v-card-subtitle>
                </v-col> -->
                <v-col lg="12" md="12" sm="12">
                  <v-card-title class="display-1 font-weight-bold text-center d-block pt-0 mx-auto">{{ patien.ODP }} <span class="display-1 font-weight-medium text--disabled pl-3">orang</span> </v-card-title>

                  <v-card-subtitle class="headline font-weight-bold text--secondary text-center pt-4">Total ODP</v-card-subtitle>
                </v-col>
              </v-row>
            </v-skeleton-loader>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" sm="6">
          <v-card
            outlined
          >
            <v-skeleton-loader
              :loading="loading"
              type="article"
            >
              <v-card-title class="headline font-weight-bold text--secondary text-center d-block mx-auto">PDP</v-card-title>
              <v-row>
                <!-- <v-col lg="4" md="4" sm="12">
                  <v-card-title class="headline text-center d-block mx-auto">X(x%)</v-card-title>

                  <v-card-subtitle class="text-center mb-4 pt-2">Proses Pemantauan</v-card-subtitle>
                </v-col>
                <v-col lg="4" md="4" sm="12">
                  <v-card-title class="headline text-center d-block mx-auto">X(x%)</v-card-title>

                  <v-card-subtitle class="text-center mb-4 pt-2">Selesai Pemantauan</v-card-subtitle>
                </v-col> -->
                <v-col lg="12" md="12" sm="12">
                  <v-card-title class="display-1 font-weight-bold text-center d-block pt-0 mx-auto">{{ patien.PDP }} <span class="display-1 font-weight-medium text--disabled pl-3">orang</span> </v-card-title>

                  <v-card-subtitle class="headline font-weight-bold text--secondary text-center pt-4">Total PDP</v-card-subtitle>
                </v-col>
              </v-row>
            </v-skeleton-loader>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  inject: ['theme'],
  name: 'CardData',
  data: () => ({
    loading: true,
    patien: {
      ODP: 0,
      PDP: 0,
      POSITIF: 0
    },
    final: {
      MENINGGAL: 0,
      SEMBUH: 0,
      POSITIF: 0
    },
    total: 0,
    totalConfirmation: 0
  }),
  computed: {
    ...mapGetters('user', [
      'roles',
      'fullname',
      'district_user'
    ])
  },
  async mounted() {
    let params
    if (this.roles[0] === 'dinkeskota') {
      params = {
        address_district_code: this.district_user
      }
    }
    const data = await this.$store.dispatch('reports/countReportCase', params)
    const dataFinal = await this.$store.dispatch('reports/countReportCaseFinal', params)

    if (dataFinal) this.loading = false

    this.patien = data.data
    this.final = dataFinal.data
    this.total = this.patien.ODP + this.patien.PDP + this.patien.POSITIF
    this.totalConfirmation = this.patien.POSITIF + this.final.SEMBUH + this.final.MENINGGAL
  }
}
</script>
