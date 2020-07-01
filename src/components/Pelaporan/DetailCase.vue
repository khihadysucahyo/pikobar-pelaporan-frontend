<template>
  <v-container>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
        class="row-detail-label"
      >
        <label style="font-weight: bold;font-size: 20px;line-height: 20px;">
          {{ $t('label.case_id') }}
        </label>
      </v-col>
      <v-col auto />
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
        class="row-detail-label"
      >
        <label>{{ $t('label.case_id') }}</label>
      </v-col>
      <v-col auto>
        <v-text-field
          v-model="detailCase.id_case"
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
        <label>{{ $t('label.related_case_id') }}</label>
      </v-col>
      <v-col auto>
        <v-text-field
          v-model="detailCase.id_case_related"
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
        <label>{{ $t('label.center_case_id') }}</label>
      </v-col>
      <v-col auto>
        <v-text-field
          v-model="detailCase.id_case_national"
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
        <label style="font-weight: bold;font-size: 20px;line-height: 20px;">
          {{ $t('label.identity') }}
        </label>
      </v-col>
      <v-col auto />
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
        class="row-detail-label"
      >
        <label>{{ $t('label.nik') }}</label>
      </v-col>
      <v-col auto>
        <v-text-field
          v-model="detailCase.nik"
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
        <label>{{ $t('label.name_case') }}</label>
      </v-col>
      <v-col auto>
        <v-text-field
          v-model="detailCase.name"
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
        <label>{{ $t('label.birth_date') }}</label>
      </v-col>
      <v-col auto>
        <v-text-field
          v-model="birthDate"
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
        <label>{{ $t('label.gender') }}</label>
      </v-col>
      <v-col auto>
        <v-text-field
          v-model="detailGender"
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
          v-model="detailAddress"
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
          v-model="detailCase.phone_number"
          disabled
          hide-details
          solo-inverted
        />
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="6"
        sm="12"
        class="row-detail-label"
      >
        <v-row>
          <v-col>
            <label>{{ $t('label.citizenship') }}</label>
          </v-col>
          <v-col auto>
            <v-text-field
              v-model="detailCase.nationality"
              disabled
              hide-details
              solo-inverted
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="6"
        sm="12"
        class="row-detail-label"
      >
        <v-row v-if="detailCase.nationality === 'WNA'">
          <v-col>
            <label>{{ $t('label.country') }}</label>
          </v-col>
          <v-col auto>
            <v-text-field
              v-model="detailCase.nationality_name"
              disabled
              hide-details
              solo-inverted
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
        class="row-detail-label"
      >
        <label style="font-weight: bold;font-size: 20px;line-height: 20px;">
          {{ $t('label.profession') }}
        </label>
      </v-col>
      <v-col auto />
    </v-row>
    <v-row class="row-detail">
      <v-col
        cols="12"
        md="3"
        sm="12"
        class="row-detail-label"
      >
        <label>{{ $t('label.profession') }}</label>
      </v-col>
      <v-col auto>
        <v-text-field
          v-model="detailCase.occupation"
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
        <label>{{ $t('label.office_address') }}</label>
      </v-col>
      <v-col auto>
        <v-textarea
          v-model="detailCase.office_address"
          disabled
          hide-details
          solo-inverted
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

export default {
  name: 'DetailCase',
  props: {
    detailCase: {
      type: Object,
      default: null
    },
    birthDate: {
      type: String,
      default: ''
    },
    detailGender: {
      type: String,
      default: ''
    },
    detailAddress: {
      type: String,
      default: ''
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
