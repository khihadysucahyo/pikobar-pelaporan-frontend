<template>
  <div>
    <v-row class="ml-2">
      <v-col cols="3">{{ $t('label.provincial_health_service') }}</v-col>
      <v-col cols="1">:</v-col>
      <v-col>-</v-col>
    </v-row>
    <v-row class="ml-2">
      <v-col cols="3">{{ $t('label.district_or_city_health_service') }}</v-col>
      <v-col cols="1">:</v-col>
      <v-col>-</v-col>
    </v-row>
    <v-row class="ml-2">
      <v-col cols="3">{{ $t('label.name_of_officer_or_cellphone') }}</v-col>
      <v-col cols="1">:</v-col>
      <v-col>-</v-col>
    </v-row>
    <v-row class="ml-2">
      <v-col cols="3">{{ $t('label.date') }}</v-col>
      <v-col cols="1">:</v-col>
      <v-col>-</v-col>
    </v-row>
    <v-simple-table fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">&nbsp;</th>
            <th class="text-left font-weight-bold subtitle-2">{{ $t('label.status') }}</th>
            <th class="text-left font-weight-bold subtitle-2">{{ $t('label.today') }}</th>
            <th class="text-left font-weight-bold subtitle-2">{{ $t('label.amount_in_the_past_1_week') }}</th>
            <th class="text-left font-weight-bold subtitle-2">{{ $t('label.amount_in_the_past_1_month') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td class="font-weight-bold">{{ $t('label.suspect_case_data') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_suspected_cases') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_possible_cases') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_suspected_cases_isolated') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_suspected_cases_discarded') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
          </tr>
          <tr>
            <td>2</td>
            <td class="font-weight-bold">{{ $t('label.confirmation_case_data') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_confirmation_cases') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_confirmation_cases_is_symptomatic') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_confirmed_cases_is_asymptomatic') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_travel_confirmation_cases_import') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_contact_confirmation_cases') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_confirmation_issues_is_not_on_the_trip_report_or_close_contact') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.done_isolation_case_confirmation_today') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
          </tr>
          <tr>
            <td>3</td>
            <td class="font-weight-bold">{{ $t('label.close_contact_monitoring_data') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_confirmed_cases_trace_close_contact') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_new_close_contacts') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_close_contacts_is_a_suspect_case') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_close_contacts') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_close_contact_defaulting_playback') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_close_contacts_disposed') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
          </tr>
          <tr>
            <td>4</td>
            <td class="font-weight-bold">{{ $t('label.case_data_died') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.died_RT_PCR_plus') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.probable_died') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
          </tr>
          <tr>
            <td>5</td>
            <td class="font-weight-bold">{{ $t('label.RT_PCR_examination') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_cases_taken_specimens_or_swabs') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
          </tr>
          <tr>
            <td>6</td>
            <td class="font-weight-bold">{{ $t('label.serological_surveillance') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_quick_tests') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.total_reactive_rapid_test') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.reactive_amount_check_RTPCR') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.reactive_amount_with_RTPCR_plus') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
          </tr>
          <tr>
            <td>7</td>
            <td class="font-weight-bold">{{ $t('label.isolation_or_quarantine_Today') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.classification') }}</td>
            <td>{{ $t('label.RS_reference') }}</td>
            <td>{{ $t('label.emergency_RS') }}</td>
            <td>{{ $t('label.independent_isolation_or_quarantine') }}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_suspected_cases_probable_cases') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_confirmed_cases') }}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td>{{ $t('label.number_of_close_contacts_is_being_monitored') }}</td>
            <td class="background-td">&nbsp;</td>
            <td class="background-td">&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>

export default {
  name: 'DailyReportTableRevamp',
  methods: {
    //
  }
}
</script>
<style scoped>
  .background-td {
    background: black !important;
  }
  .v-data-table td {
      height: 36px !important;
  }
</style>
