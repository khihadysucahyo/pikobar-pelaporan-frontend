import Vue from 'vue'

Vue.filter('capitalize', (value) => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('number', (value) => {
  if (!value) return 0
  const reverse = value.toString().split('').reverse().join('')
  let ribuan 	= reverse.match(/\d{1,3}/g)
  ribuan	= ribuan.join('.').split('').reverse().join('')
  return ribuan
})

Vue.filter('decimal', (value) => {
  if (!value) return 0
  const numberString = value.toString()
  const split	= numberString.split('.')
  const sisa 	= split[0].length % 3
  let rupiah 	= split[0].substr(0, sisa)
  const ribuan 	= split[0].substr(sisa).match(/\d{1,3}/gi)

  if (ribuan) {
    const separator = sisa ? '.' : ''
    rupiah += separator + ribuan.join('.')
  }
  rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah

  return rupiah
})
