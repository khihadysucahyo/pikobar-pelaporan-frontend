<template>
  <div>
    <v-row align="center" justify="space-between">
      <v-col>
        <div class="title">
          {{ $t('route.submit_application') }}
        </div>
      </v-col>
    </v-row>
    <v-card class="d-block pa-1 mx-auto header-application-logistic">
      <v-row class="mt-2">
        <v-col auto>
          <v-card-text
            @click="handleClickLink"
          >
            <div class="header-user-title">{{ $t('label.application_logistic_title_1') }}</div>
            <div class="header-user-text">{{ $t('label.application_logistic_title_2') }}
              <v-icon
                style="color: #ffff;"
                @click="handleClickLink"
              >
                mdi-open-in-new
              </v-icon>
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'FormPermohonan',
  methods: {
    handleClickLink() {
      window.open('https://logistik.pikobar.jabarprov.go.id/#/landing-page', '_blank')
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
