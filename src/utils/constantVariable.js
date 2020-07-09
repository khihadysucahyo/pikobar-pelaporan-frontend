import i18n from '@/lang'

import { format } from 'date-fns'
import moment from 'moment'
export const ISO_FORMAT = 'yyyy-MM-dd'
export const DEFAULT_DATE = format(new Date(), ISO_FORMAT)
export const DEFAULT_ACTION_LABELS = {
  apply: 'Apply',
  cancel: 'Cancel',
  reset: 'Reset'
}

export const ResponseRequest = {
  TIMEOUT: 'ECONNABORTED',
  NETWORKERROR: 'Network Error',
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  UNPROCESSABLE: 422,
  SERVERERROR: 500
}

export function baseUrl() {
  let url = `${window.location.hostname}`
  if (window.location.port.length > 0) {
    url += `:${window.location.port}`
  }
  return url
}

export function getAge(DOB) {
  const today = new Date()
  const birthDate = new Date(DOB)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age = age - 1
  }
  return age
}

export function getAgeWithMonth(dob) {
  const today = moment()
  const birthDate = moment(dob, 'YYYY/MM/DD')
  let age = moment.duration(today.diff(birthDate))
  const year = age.years()
  const month = age.months()
  age = {
    'year': year,
    'month': month
  }
  return age
}

export function listYear() {
  var currentYear = new Date().getFullYear()
  const list = []
  for (var y = 0; y < 100; y++) {
    list.push(currentYear)
    currentYear--
  }
  return list
}

export function listDays() {
  const listDay = []
  for (let d = 1; d <= 31; d++) {
    listDay.push(d)
  }
  return listDay
}

export const symptomOptions = [
  'Suhu tubuh >= 38 °C',
  'Suhu tubuh < 38 °C',
  'Batuk',
  'Pilek',
  'Sakit Tenggorokan',
  'Sakit Kepala',
  'Sesak Napas',
  'Menggigil',
  'Lemah (malaise)',
  'Nyeri Otot',
  'Mual atau muntah',
  'Nyeri Abdomen',
  'Diare'
]

export const listMonthName = [
  {
    value: 1,
    text: 'Januari'
  },
  {
    value: 2,
    text: 'Februari'
  },
  {
    value: 3,
    text: 'Maret'
  },
  {
    value: 4,
    text: 'April'
  },
  {
    value: 5,
    text: 'Mei'
  },
  {
    value: 6,
    text: 'Juni'
  },
  {
    value: 7,
    text: 'Juli'
  },
  {
    value: 8,
    text: 'Augustus'
  },
  {
    value: 9,
    text: 'September'
  },
  {
    value: 10,
    text: 'Oktober'
  },
  {
    value: 11,
    text: 'November'
  },
  {
    value: 12,
    text: 'Desember'
  }
]

export const additionalConditionOptions = [
  i18n.t('label.pregnant'),
  i18n.t('label.diabetes'),
  i18n.t('label.heart_disease'),
  i18n.t('label.hypertension'),
  i18n.t('label.malignant'),
  i18n.t('label.immunological_disorders'),
  i18n.t('label.chronic_kidney_failure'),
  i18n.t('label.chronic_liver_failure'),
  i18n.t('label.ppok')
]

export const rolesPerm = {
  'ADMIN': 'superadmin',
  'DINKESPROV': 'dinkesprov',
  'DINKESKOTA': 'dinkeskota',
  'FASKES': 'faskes'
}

export const rolesWidget = {
  'dinkeskota': [rolesPerm.DINKESKOTA],
  'dinkesKotaAndFaskes': [rolesPerm.DINKESKOTA, rolesPerm.FASKES]
}

export const apd = [
  i18n.t('label.apd_gown'),
  i18n.t('label.apd_surgical_mask'),
  i18n.t('label.apd_gloves'),
  i18n.t('label.apd_n95_mask'),
  i18n.t('label.apd_ffp3'),
  i18n.t('label.apd_goggle_glasses'),
  i18n.t('label.apd_not_at_all')
]

export const answerList = [
  {
    value: 1,
    text: i18n.t('label.yes')
  },
  {
    value: 2,
    text: i18n.t('label.not')
  },
  {
    value: 3,
    text: i18n.t('label.dont_know')
  }
]

export const yesOrNoAnswer = [
  {
    value: 1,
    text: i18n.t('label.yes')
  },
  {
    value: 0,
    text: i18n.t('label.not')
  }
]

export const listPhysicalActivity = [
  {
    value: 0,
    text: i18n.t('label.sedenter')
  },
  {
    value: 1,
    text: i18n.t('label.physical_exercise_less_than_150_minutes')
  },
  {
    value: 2,
    text: i18n.t('label.physical_exercise_more_than_150_minutes')
  }
]

export const incomeList = [
  {
    value: 0,
    text: i18n.t('label.not_earning')
  },
  {
    value: 1,
    text: '< 1 Juta'
  },
  {
    value: 2,
    text: '1 s/d 3 Juta'
  },
  {
    value: 3,
    text: '3 s/d 5 Juta'
  },
  {
    value: 4,
    text: '> 5 Juta'
  }
]

export const healthWorkerList = [
  {
    value: 'Dokter',
    text: i18n.t('label.doctor')
  },
  {
    value: 'Perawat',
    text: i18n.t('label.nurse')
  },
  {
    value: 'Farmasi',
    text: i18n.t('label.pharmacy')
  },
  {
    value: 'Dokter Spesialis Paru',
    text: i18n.t('label.lung_specialist')
  },
  {
    value: 'Dokter Spesialis Lain',
    text: i18n.t('label.another_specialist_doctor')
  },
  {
    value: 'Bidan',
    text: i18n.t('label.midwife')
  },
  {
    value: 'Ahli Gizi',
    text: i18n.t('label.nutritionists')
  },
  {
    value: 'Tenaga Kesehatan Masyarakat',
    text: i18n.t('label.community_health_workers')
  },
  {
    value: 'Lainnya',
    text: i18n.t('label.other')
  }
]
