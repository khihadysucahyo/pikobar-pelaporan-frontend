<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        md="6"
        sm="12"
        class="row-detail-label"
      >
        <div style="font-size: 1.5rem;">
          {{ titleDetail }}
        </div>
      </v-col>
      <v-col
        cols="12"
        md="6"
        sm="12"
      >
        <v-btn
          color="success"
          bottom
          style="float: right;"
          @click="backList"
        >
          {{ $t('label.back_to_list') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-card
      outlined
    >
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
          class="row-detail-label"
        >
          <label>{{ $t('label.name_instansi') }}</label>
        </v-col>
        <v-col auto>
          <v-text-field
            v-model="detailData.fullname"
            disabled
            hide-details
            solo-inverted
          />
        </v-col>
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
          class="row-detail-label"
        >
          <label>{{ $t('label.email') }}</label>
        </v-col>
        <v-col auto>
          <v-text-field
            v-model="detailData.email"
            disabled
            hide-details
            solo-inverted
          />
        </v-col>
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
          class="row-detail-label"
        >
          <label>{{ $t('label.username') }}</label>
        </v-col>
        <v-col auto>
          <v-text-field
            v-model="detailData.username"
            disabled
            hide-details
            solo-inverted
          />
        </v-col>
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
          class="row-detail-label"
        >
          <label>{{ $t('label.phone_number') }}</label>
        </v-col>
        <v-col auto>
          <v-text-field
            v-model="detailData.phone_number"
            disabled
            hide-details
            solo-inverted
          />
        </v-col>
      </v-row>
      <v-row class="row-detail">
        <v-col
          cols="12"
          md="3"
          sm="12"
          class="row-detail-label"
        >
          <label>{{ $t('label.address') }}</label>
        </v-col>
        <v-col auto>
          <v-textarea
            v-model="detailAddres"
            disabled
            hide-details
            solo-inverted
          />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { completeAddress } from '@/utils/utilsFunction'

export default {
  name: 'UserDetail',
  props: {
    titleDetail: {
      type: String,
      default: null
    },
    idData: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      detailData: '',
      detailAddres: ''
    }
  },
  async mounted() {
    const response = await this.$store.dispatch('user/detailUser', this.idData)
    this.detailData = await response.data
    this.detailAddres = this.completeAddress(
      this.detailData.name_district_city,
      this.detailData.address_subdistrict_name,
      this.detailData.address_village_name,
      this.detailData.address_street
    )
  },
  methods: {
    completeAddress,
    backList() {
      this.$router.push('/user/list')
    }
  }
}
</script>

<style scoped>
.row-detail {
  padding-left: 2rem;
  padding-right: 2rem;
}
.row-detail-label {
  margin: auto;
}
</style>
