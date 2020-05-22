<template>
  <v-row>
    <v-col auto>
      <v-data-table
        :key="list.length"
        :headers="tableHeaders"
        :items="list"
        :mobile-breakpoint="NaN"
        :no-data-text="$t('label.data_empty')"
        :items-per-page="listQuery.limit"
        hide-default-footer
      >
        <template slot="body.append">
          <tr class="footer-totals">
            <th class="footer-title">Total</th>
            <th class="footer-title">{{ sumField('age') }}</th>
            <th class="footer-title">{{ sumField('gender') }}</th>
            <th class="footer-title">{{ sumField('criteria') }}</th>
            <th class="footer-title">{{ sumField('stage') }}</th>
            <th class="footer-title">{{ sumField('final_result') }}</th>
            <th class="footer-title">{{ sumField('author') }}</th>
            <th class="footer-title">{{ sumField('author') }}</th>
          </tr>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DailyReportTable',
  props: {
    list: {
      type: Array,
      default: null
    },
    listQuery: {
      type: Object,
      default: null
    },
    tableHeaders: {
      type: Array,
      default: null
    }
  },
  methods: {
    sumField(key) {
      // sum data in give key (property)
      return this.list.reduce((a, b) => a + (b[key] || 0), 0)
    }
  }
}
</script>

<style scoped>
  .footer-totals {
    font-size: 14px;
    color: #FFFFFF;
    background-color: #27AE60;
  }
  .footer-title {
    font-size: 14px;
  }
</style>
