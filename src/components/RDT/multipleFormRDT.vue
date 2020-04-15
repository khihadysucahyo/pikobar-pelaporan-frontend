<template>
  <div>
    <ValidationObserver ref="observer">
      <v-form
        ref="form"
        lazy-validation
      >
        <v-container>
          <h4 style="color: #219653;">{{ $t('label.rdt_multiple_redaction1') }}</h4>
          <h4 color="succses">{{ $t('label.rdt_multiple_redaction2') }}</h4>
          <v-row>
            <v-col cols="12" sm="4">
              <v-label class="title">{{ $t('label.test_date') }}:</v-label>
              <input-date-picker
                :format-date="formatDate"
                :label="$t('label.test_date')"
                :date-value="test_date"
                :value-date.sync="test_date"
                @changeDate="test_date = $event"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <v-label class="title">{{ $t('label.placed_date') }}:</v-label>
              <br>
              <div>
                <select-area-district-city
                  :district-city="districtCity"
                  :city-district.sync="districtCity"
                  :on-select-district="onSelectDistrict"
                />
              </div>
            </v-col>
            <v-col cols="12" sm="4">
              <br>
              <div>
                <v-btn
                  color="success"
                  style="height: 46px;"
                >
                  {{ $t('label.look_for_it') }}
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col auto>
              <v-data-table
                :headers="headers"
                :items="listParticpant"
                :mobile-breakpoint="NaN"
                :no-data-text="'Tidak ada data'"
                hide-default-footer
              />
            </v-col>
          </v-row>
        </v-container>
        <v-container fluid>
          <v-row>
            <v-col
              cols="12"
              sm="4"
            >
              <label class="required">{{ $t('label.type_test_tool') }}</label>
              <v-radio-group
                row
              >
                <v-radio label="Rapid Test" value="RAPID TEST" />
                <v-radio label="PCR" value="PCR" />
              </v-radio-group>
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|numeric|isHtml"
              >
                <label class="required">Jumlah Kit Terpakai</label>
                <v-text-field
                  :error-messages="errors"
                  min="0"
                  solo-inverted
                  type="number"
                />
              </ValidationProvider>
            </v-col>
            <v-col
              cols="12"
              sm="4"
            >
              <br>
              <div>
                <v-btn
                  color="#828282"
                  bottom
                  style="float: right; height: 46px;color: white"
                >
                  {{ $t('label.save') }}
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'MultipleFormRdt',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: {
    listQuery: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formatDate: 'YYYY-MM-DD',
      test_date: '',
      districtCity: {
        kota_kode: ''
      },
      listParticpant: [],
      headers: [
        { text: 'NO', value: '_id', sortable: false },
        { text: 'NAMA', value: 'name', sortable: false },
        { text: 'NIK', value: 'nik', sortable: false },
        { text: 'USIA', value: 'age', sortable: false },
        { text: 'TANGGAL LAHIR', value: 'age', sortable: false },
        { text: 'JK', value: 'gender', sortable: false },
        { text: 'NO TELEPON', value: 'category', sortable: false },
        { text: 'KATEGORI', value: 'address_district_name', sortable: false },
        { text: 'HASIL TES', value: 'final_result', sortable: false }
      ]
    }
  },
  computed: {
    ...mapGetters('user', [
      'roles'
    ])
  },
  methods: {
    onSelectDistrict(value) {
      this.districtCity = value.kota_kode
    }
  }
}
</script>
