export default {
  SET_LIST_PASIEN: (state, data) => {
    state.listKasus = data
  },
  RESET_LIST_CASE: (state) => {
    state.listKasus = []
  },
  SET_TOTAL_LIST_PASIEN: (state, data) => {
    state.totalList = data
  },
  SET_TOTAL_PENDING: (state, data) => {
    state.totalPending = data
  },
  RESET_FORM_PASIEN: (state) => {
    state.formPasien.nik = ''
    state.formPasien.name = ''
    state.formPasien.birth_date = ''
    state.formPasien.age = ''
    state.formPasien.occupation = ''
    state.formPasien.gender = ''
    state.formPasien.nationality = ''
    state.formPasien.nationality_name = ''
    state.formPasien.id_case_national = ''
    state.formPasien.id_case_related = ''
    state.formPasien.phone_number = ''
    state.formPasien.office_address = ''
    state.formPasien.address_street = ''
    state.formPasien.address_district_code = ''
    state.formPasien.address_district_name = ''
    state.formPasien.address_subdistrict_code = ''
    state.formPasien.address_subdistrict_name = ''
    state.formPasien.address_village_code = ''
    state.formPasien.address_village_name = ''
    state.formPasien.status = ''
    state.formPasien.stage = ''
    state.formPasien.first_symptom_date = ''
    state.formPasien.diagnosis = []
    state.formPasien.history_tracing = []
    state.formPasien.history_notes = ''
    state.formPasien.current_location_type = ''
    state.formPasien.current_location_address = ''
    state.formPasien.current_location_district_code = ''
    state.formPasien.current_location_subdistrict_code = ''
    state.formPasien.current_location_village_code = ''

    state.formPasien.patient_name = ''
    state.formPasien.parent_name = ''
    state.formPasien.place_birth = ''
    state.formPasien.rt = ''
    state.formPasien.rw = ''
    state.formPasien.profession = ''
  },
  RESET_RIWAYAT_FORM_PASIEN: (state) => {
    state.formRiwayatPasien.case = ''
    state.formRiwayatPasien.status = ''
    state.formRiwayatPasien.stage = ''
    state.formRiwayatPasien.diagnosis = []
    state.formRiwayatPasien.history_tracing = []
    state.formRiwayatPasien.first_symptom_date = ''
    state.formRiwayatPasien.history_notes = ''
    state.formRiwayatPasien.current_location_type = ''
    state.formRiwayatPasien.current_location_address = ''
    state.formRiwayatPasien.current_location_district_code = ''
    state.formRiwayatPasien.current_location_subdistrict_code = ''
    state.formRiwayatPasien.current_location_village_code = ''
  }
}
