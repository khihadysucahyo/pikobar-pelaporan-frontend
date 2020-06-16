<template>
  <v-simple-table fixed-header height="500px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">{{ $t('label.hospital').toUpperCase() }}</th>
          <th class="text-left">{{ $t('label.transfer_status').toUpperCase() }}</th>
          <th class="text-left">{{ $t('label.transfer_date').toUpperCase() }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in referralHistoryCase" :key="index">
          <td>{{ getTableRowNumbering(index) }}</td>
          <td>{{ item.transfer_to_unit_name }}</td>
          <td><status-referral :status="item.transfer_status" /></td>
          <td>{{ formatDatetime(item.createdAt, "DD MMMM YYYY") }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import { formatDatetime } from '@/utils/parseDatetime'

export default {
  name: 'ReferralHistoryList',
  props: {
    referralHistoryCase: {
      type: Array,
      default: null
    }
  },
  methods: {
    formatDatetime,
    getTableRowNumbering(index) {
      return (index + 1)
    }
  }
}
</script>
