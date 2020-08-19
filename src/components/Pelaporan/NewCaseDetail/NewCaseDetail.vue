<template>
  <div>
    <v-row>
      <v-col auto>
        <v-expansion-panels
          v-model="volunteerPanel"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-bold text-lg">
              {{ $t('label.form_volunteer_title') }}
            </v-expansion-panel-header>
            <v-divider />
            <v-expansion-panel-content>
              <detail-volunteer :detail="detail" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row>
      <v-col auto>
        <v-expansion-panels
          v-model="patientPanel"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-bold text-lg">
              {{ $t('label.form_volunteer_title') }}
            </v-expansion-panel-header>
            <v-divider />
            <v-expansion-panel-content>
              <detail-patient :detail="detail" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row>
      <v-col auto>
        <v-expansion-panels
          v-model="historyCasePanel"
          multiple
        >
          <v-expansion-panel>
            <v-expansion-panel-header class="font-weight-bold text-lg">
              {{ $t('label.form_volunteer_title') }}
            </v-expansion-panel-header>
            <v-divider />
            <v-expansion-panel-content>
              <detail-case-history :detail="detail" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'NewCaseDetail',
  props: {
    detail: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      volunteerPanel: [0],
      patientPanel: [0],
      historyCasePanel: [0]
    }
  }
}
</script>
<style scoped>
.row-detail {
    margin-bottom: -24px;
    color: #828282;
}
</style>
