<template>
  <div>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.physical_activity') }}</p>
      </v-col>
      <v-col>
        <p>{{ listPhysicalActivity[detail.pysichal_activity].text }}</p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.smoking') }}</p>
      </v-col>
      <v-col>
        <p>{{ answerList[detail.smoking].text }}</p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.consume_alcohol') }}</p>
      </v-col>
      <v-col>
        <p>{{ answerList[detail.consume_alcohol].text }}</p>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <p>{{ $t('label.income') }}</p>
      </v-col>
      <v-col>
        <p>{{ incomeList[detail.income].text }}</p>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { answerList, incomeList, listPhysicalActivity } from '@/utils/constantVariable'
export default {
  name: 'DetailSocioEconomicHistory',
  props: {
    detail: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      answerList: answerList,
      incomeList: incomeList,
      listPhysicalActivity: listPhysicalActivity
    }
  }
}
</script>
