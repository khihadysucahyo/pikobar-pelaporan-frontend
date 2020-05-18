import actions from './actions'
import mutations from './mutations'
import getters from './getters'

function initialState() {
  return {
    detailPasien: null,
    listKasus: [],
    totalList: 0,
    totalPending: 0,
    formPasien: {
      id_case: '',
      id_case_national: '',
      id_case_related: '',
      name_case_related: '',
      name: '',
      nik: '',
      birth_date: '',
      age: '',
      gender: null,
      phone_number: null,
      address_street: '',
      address_province_code: '32',
      address_province_name: 'Jawa Barat',
      address_district_code: '',
      address_district_name: '',
      address_subdistrict_code: '',
      address_subdistrict_name: '',
      address_village_code: '',
      address_village_name: '',
      nationality: '',
      nationality_name: '',
      occupation: '',
      office_address: '',
      status: '',
      stage: '',
      final_result: '',
      report_source: '',
      diagnosis: [],
      diagnosis_other: '',
      diseases: [],
      diseases_other: '',
      first_symptom_date: '',
      history_tracing: [],
      is_went_abroad: false,
      visited_country: '',
      return_date: '',
      is_went_other_city: false,
      visited_city: '',
      is_contact_with_positive: false,
      history_notes: '',
      current_location_type: '',
      current_hospital_id: '',
      current_location_address: '',
      current_location_district_code: '',
      current_location_subdistrict_code: '',
      current_location_village_code: '',
      current_location_village_name: '',
      other_notes: ''
    },
    formRiwayatPasien: {
      case: '',
      status: '',
      stage: '',
      final_result: '',
      diagnosis: [],
      diagnosis_other: '',
      history_tracing: [],
      first_symptom_date: '',
      is_went_abroad: false,
      visited_country: '',
      return_date: '',
      is_went_other_city: false,
      visited_city: '',
      is_contact_with_positive: false,
      diseases: [],
      diseases_other: '',
      history_notes: '',
      report_source: '',
      current_location_type: '',
      current_hospital_id: '',
      current_location_address: '',
      current_location_district_code: '',
      current_location_subdistrict_code: '',
      current_location_village_code: '',
      other_notes: ''
    }
  }
}

const state = {
  detailPasien: initialState().detailPasien,
  listKasus: initialState().listKasus,
  totalList: initialState().totalList,
  totalPending: initialState().totalPending,
  formPasien: initialState().formPasien,
  formRiwayatPasien: initialState().formRiwayatPasien
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
