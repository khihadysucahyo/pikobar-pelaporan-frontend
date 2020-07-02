export default {
  SET_LIST_RDT: (state, data) => {
    state.listRDT = data
  },
  SET_TOTAL_PAGE_LIST_RDT: (state, data) => {
    state.totalList = data
  },
  SET_TOTAL_RDT: (state, data) => {
    state.totalDataRDT = data
  },
  SET_LIST_TARGET: (state, data) => {
    state.listTarget = data
  },
  RESET_LIST_RDT: (state, data) => {
    state.listRDT = []
  },
  RESET_FORM_HISTORY_TEST: (state) => {
    state.formHistoryTest.address_detail = ''
    state.formHistoryTest.address_district_code = ''
    state.formHistoryTest.address_district_name = ''
    state.formHistoryTest.address_subdistrict_code = ''
    state.formHistoryTest.address_subdistrict_name = ''
    state.formHistoryTest.address_village_code = ''
    state.formHistoryTest.address_village_name = ''
    state.formHistoryTest.age = ''
    state.formHistoryTest.author_district_code = ''
    state.formHistoryTest.author_district_name = ''
    state.formHistoryTest.birth_date = ''
    state.formHistoryTest.category = ''
    state.formHistoryTest.code_test = ''
    state.formHistoryTest.code_tool_tester = ''
    state.formHistoryTest.createdAt = ''
    state.formHistoryTest.final_result = ''
    state.formHistoryTest.gender = ''
    state.formHistoryTest.id_case = ''
    state.formHistoryTest.lab = ''
    state.formHistoryTest.last_history = ''
    state.formHistoryTest.mechanism = ''
    state.formHistoryTest.name = ''
    state.formHistoryTest.nationality = ''
    state.formHistoryTest.nationality_name = ''
    state.formHistoryTest.nik = ''
    state.formHistoryTest.note_nik = ''
    state.formHistoryTest.note_phone_number = ''
    state.formHistoryTest.pcr_count = ''
    state.formHistoryTest.phone_number = ''
    state.formHistoryTest.rdt_count = ''
    state.formHistoryTest.rdt_to = ''
    state.formHistoryTest.sampling_type = ''
    state.formHistoryTest.source_data = ''
    state.formHistoryTest.status = ''
    state.formHistoryTest.swab_to = ''
    state.formHistoryTest.target = ''
    state.formHistoryTest.test_address_detail = ''
    state.formHistoryTest.test_address_district_code = ''
    state.formHistoryTest.test_address_district_name = ''
    state.formHistoryTest.test_address_subdistrict_code = ''
    state.formHistoryTest.test_address_subdistrict_name = ''
    state.formHistoryTest.test_address_village_code = ''
    state.formHistoryTest.test_address_village_name = ''
    state.formHistoryTest.test_date = ''
    state.formHistoryTest.test_location = ''
    state.formHistoryTest.test_location_type = ''
    state.formHistoryTest.test_method = ''
    state.formHistoryTest.test_note = ''
    state.formHistoryTest.test_other_location = ''
    state.formHistoryTest.tool_tester = ''
  }
}
