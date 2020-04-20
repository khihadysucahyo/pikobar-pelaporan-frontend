<template>
  <div>
    <participant-detail
      :title-detail="title"
      :id-data="this.$route.params.id"
    />
    <v-card
      style="margin-top: 2rem;"
      outlined
    >
      <v-row>
        <v-col>
          <v-expansion-panels
            v-model="panelListRiwayat"
            multiple
          >
            <v-expansion-panel>
              <v-expansion-panel-header>{{ $t('label.test_history') }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <test-history-list
                  :list-history-test="listHistoryTest"
                />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'DetailRDT',
  data() {
    return {
      title: 'Detail Peserta',
      panelListRiwayat: [0],
      listHistoryTest: []
    }
  },
  async mounted() {
    const responseHistory = await this.$store.dispatch('rdt/listHistoryRDT', this.$route.params.id)
    this.listHistoryTest = responseHistory.data
  }
}
</script>
