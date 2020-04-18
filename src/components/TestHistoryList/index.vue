<template>
  <v-simple-table fixed-header height="500px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">{{ $t('label.results').toUpperCase() }}</th>
          <th class="text-left">{{ $t('label.method').toUpperCase() }}</th>
          <th class="text-left">{{ $t('label.sampling').toUpperCase() }}</th>
          <th class="text-left">{{ $t('label.test_place').toUpperCase() }}</th>
          <th class="text-left">{{ $t('label.test_date').toUpperCase() }}</th>
          <th class="text-left">{{ $t('label.update_date').toUpperCase() }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in listHistoryTest" :key="index">
          <td><status :status="item.status" /></td>
          <td>
            <div v-if="index === 0 && item.final_result === ''">
              Proses
            </div>
            <div v-else>
              Selesai
            </div>
          </td>
          <td>
            <div v-if=" item.final_result =='0'">
              Negatif
            </div>
            <div v-else-if=" item.final_result =='1'">
              Sembuh
            </div>
            <div v-else-if=" item.final_result =='2'">
              Meninggal
            </div>
            <div v-else>
              -
            </div>
          </td>
          <td>{{ item.current_location_address }}</td>
          <td>{{ formatDatetime(item.last_changed, "DD MMMM YYYY") }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import { formatDatetime } from '@/utils/parseDatetime'

export default {
  name: 'TestHistoryList',
  props: {
    listHistoryTest: {
      type: Array,
      default: null
    }
  },
  methods: {
    formatDatetime
  }
}
</script>
