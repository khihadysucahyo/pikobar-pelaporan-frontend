<template>
  <div>
    <v-card class="disclaimer pa-7 mb-5" width="100%">
      <v-row class="mx-0 mb-2 headline">
        <div class="font-white">
          Buat Laporan Kasus Baru
        </div>
      </v-row>
      <v-row class="mx-0 mb-0">
        <span class="font-white">
          Silakan isi form dibawah ini
        </span>
      </v-row>
    </v-card>
    <!-- Form Relawan -->
    <form-volunteer :form-pasien="formPasien" />
    <!-- Form Pasien -->
    <form-patient :form-pasien="formPasien" />
    <!-- Form Riwayat Kasus -->
    <form-case-history :form-pasien="formPasien" />
    <!-- Form Riwayat Sosial Ekonomi -->
    <form-socioeconomic-history :form-pasien="formPasien" />
    <!-- Form Faktor Kontak/Paparan -->
    <form-exposure-factor :form-pasien="formPasien" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters('reports', [
      'formPasien'
    ])
  }
}
</script>
<style scoped>
.disclaimer {
  background: linear-gradient(78.54deg, #27AE60 0%, #6FCF97 100%) !important;
}
.font-white {
  color: white;
}
</style>

