export function completeAddress(districtCity, subDistrict, village, nameStreet) {
  let address = ''
  if (nameStreet) {
    address += `${nameStreet} ,`
  }
  if (village) {
    address += `${village} ,`
  }
  if (subDistrict) {
    address += `${subDistrict} ,`
  }
  if (districtCity) {
    address += `${districtCity}`
  }
  return address
}
