<template>
  <v-card
    class="mx-auto title-font-size"
    outlined
  >
    <v-card-title
      class="ml-0"
      :style="{ color: activeColor, fontSize: 16 + 'px' }"
    >
      {{ title }}
    </v-card-title>
    <v-divider class="ma-0" />
    <v-list-item>
      <v-list-item-icon
        style="color: #2F80ED;"
      >
        <v-btn
          style="background-color: #2F80ED;"
          class="btn-fab-size-small mr-3"
          fab
          small
          dark
        >
          <v-icon>mdi-circle-outline</v-icon>
        </v-btn>
        {{ $t('label.total_2') }}:
      </v-list-item-icon>
      <v-list-item-subtitle
        class="text-right"
        style="color: #2F80ED;"
      >
        {{ total }}
      </v-list-item-subtitle>
    </v-list-item>
    <v-list-item>
      <v-list-item-icon
        style="color: #27AE60;"
      >
        <v-btn
          style="background-color: #27AE60;"
          class="btn-fab-size-small mr-3"
          fab
          small
          dark
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
        {{ $t('label.done') }}:
      </v-list-item-icon>
      <v-list-item-subtitle
        class="text-right"
        style="color: #27AE60;"
      >
        {{ done }}
      </v-list-item-subtitle>
    </v-list-item>
    <v-list-item>
      <v-list-item-icon
        style="color: #F2994A;"
      >
        <v-btn
          style="background-color: #F2994A;"
          class="btn-fab-size-small mr-3"
          fab
          small
          dark
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        {{ $t('label.process') }}:
      </v-list-item-icon>
      <v-list-item-subtitle
        class="text-right"
        style="color: #F2994A;"
      >
        {{ process }}
      </v-list-item-subtitle>
    </v-list-item>
    <v-divider class="ma-4" />
    <v-list-item>
      <v-list-item-title class="title-font-size" style="width:90px;">
        {{ $t('label.male') }}:
      </v-list-item-title>
      <v-list-item-subtitle class="text-right title-font-size">{{ gender.laki_laki }}</v-list-item-subtitle>
    </v-list-item>
    <v-list-item>
      <v-list-item-title class="title-font-size">
        {{ $t('label.female') }}:
      </v-list-item-title>
      <v-list-item-subtitle class="text-right title-font-size">{{ gender.perempuan }}</v-list-item-subtitle>
    </v-list-item>
    <v-divider class="ma-4" />
    <v-list-item>
      <v-list-item-title class="title-font-size">
        {{ $t('label.wni') }}:
      </v-list-item-title>
      <v-list-item-subtitle class="text-right title-font-size">{{ nationalityWni }}</v-list-item-subtitle>
    </v-list-item>
    <v-list-item>
      <v-list-item-title class="title-font-size">
        {{ $t('label.wna') }}:
      </v-list-item-title>
      <v-list-item-subtitle class="text-right title-font-size">{{ nationalityWna }}</v-list-item-subtitle>
    </v-list-item>
    <v-divider class="ma-4" />
    <v-list-item>
      <v-list-item-icon
        style="color: #27AE60;"
      >
        <v-btn
          style="background-color: #27AE60;"
          class="btn-fab-size-small mr-3"
          fab
          small
          dark
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
        {{ $t('label.age') }}:
      </v-list-item-icon>
    </v-list-item>
    <v-list-item>
      <v-list-item-title class="title-font-size">
        {{ $t('label.under_five_year') }} :
      </v-list-item-title>
      <v-list-item-subtitle class="text-right title-font-size">{{ m1 }}</v-list-item-subtitle>
    </v-list-item>
    <v-list-item>
      <v-list-item-title class="title-font-size">
        {{ $t('label.six_nineteen_year') }} :
      </v-list-item-title>
      <v-list-item-subtitle class="text-right title-font-size">{{ m2 }}</v-list-item-subtitle>
    </v-list-item>
    <v-list-item>
      <v-list-item-title class="title-font-size">
        {{ $t('label.twenty_twenty_nine_year') }} :
      </v-list-item-title>
      <v-list-item-subtitle class="text-right title-font-size">{{ m3 }}</v-list-item-subtitle>
    </v-list-item>
    <v-list-item>
      <v-list-item-title class="title-font-size">
        {{ $t('label.thirty_thirty_nine_year') }} :
      </v-list-item-title>
      <v-list-item-subtitle class="text-right title-font-size">{{ m4 }}</v-list-item-subtitle>
    </v-list-item>
    <v-list-item>
      <v-list-item-title class="title-font-size">
        {{ $t('label.fourty_fourty_nine_year') }} :
      </v-list-item-title>
      <v-list-item-subtitle class="text-right title-font-size">{{ m5 }}</v-list-item-subtitle>
    </v-list-item>
    <v-list-item>
      <v-list-item-title class="title-font-size">
        {{ $t('label.fifty_fifty_nine_year') }} :
      </v-list-item-title>
      <v-list-item-subtitle class="text-right title-font-size">{{ m6 }}</v-list-item-subtitle>
    </v-list-item>
    <v-list-item>
      <v-list-item-title class="title-font-size">
        {{ $t('label.sixty_sixty_nine_year') }} :
      </v-list-item-title>
      <v-list-item-subtitle class="text-right title-font-size">{{ m7 }}</v-list-item-subtitle>
    </v-list-item>
    <v-list-item>
      <v-list-item-title class="title-font-size">
        {{ $t('label.seventy_seventy_nine_year') }} :
      </v-list-item-title>
      <v-list-item-subtitle class="text-right title-font-size">{{ m8 }}</v-list-item-subtitle>
    </v-list-item>
    <v-list-item>
      <v-list-item-title class="title-font-size">
        {{ $t('label.more_eighty_year') }} :
      </v-list-item-title>
      <v-list-item-subtitle class="text-right title-font-size">{{ m9 }}</v-list-item-subtitle>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: 'CardRepotDaily',
  props: {
    title: {
      type: String,
      default: ''
    },
    activeColor: {
      type: String,
      default: '#828282'
    },
    total: {
      type: Number,
      default: 0
    },
    process: {
      type: Number,
      default: 0
    },
    done: {
      type: Number,
      default: 0
    },
    gender: {
      type: Object,
      default: function() {
        return {}
      }
    },
    nationalityWni: {
      type: Number,
      default: 0
    },
    nationalityWna: {
      type: Number,
      default: 0
    },
    age: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      m1: 0,
      m2: 0,
      m3: 0,
      m4: 0,
      m5: 0,
      m6: 0,
      m7: 0,
      m8: 0,
      m9: 0
    }
  },
  watch: {
    age: function(val) {
      this.m1 = val['bawah_5']
      this.m2 = val['6_19']
      this.m3 = val['20_29']
      this.m4 = val['30_39']
      this.m5 = val['40_49']
      this.m6 = val['50_59']
      this.m7 = val['60_69']
      this.m8 = val['70_79']
      this.m9 = val['atas_80']
    }
  }
}
</script>

<style scoped>
  .title-font-size {
    font-size: 14px !important;
  }
  .btn-fab-size-small {
    height: 24px !important;
    width: 24px !important;
  }
</style>
