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

export function groupAge(type, group) {
  const result = []

  const temp = []
  temp.push(group.find(x => x._id === 'bawah_5'))
  temp.push(group.find(x => x._id === '6_19'))
  temp.push(group.find(x => x._id === '20_29'))
  temp.push(group.find(x => x._id === '30_39'))
  temp.push(group.find(x => x._id === '40_49'))
  temp.push(group.find(x => x._id === '50_59'))
  temp.push(group.find(x => x._id === '60_69'))
  temp.push(group.find(x => x._id === '70_79'))
  temp.push(group.find(x => x._id === 'atas_80'))

  if (type === 'male') {
    for (let i = 0; i < temp.length; i++) {
      result.push(-Math.abs(varUndefined(temp[i])))
    }
  } else if (type === 'female') {
    for (let i = 0; i < temp.length; i++) {
      result.push(varUndefined(temp[i]))
    }
  }
  return result
}

export function varUndefined(variable) {
  if (typeof variable === 'undefined' || variable === null) {
    return 0
  }
  return Number(variable.count)
}
