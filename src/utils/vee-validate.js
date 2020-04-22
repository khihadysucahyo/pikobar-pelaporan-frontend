import { required, email, max, numeric } from 'vee-validate/dist/rules'
import { isContainHtmlTags, isPhoneNumber, noWhiteSpaces } from '@/utils/validate'
import store from '@/store'
import { extend, setInteractionMode } from 'vee-validate'
import i18n from '@/lang'

setInteractionMode('eager')
extend('required', {
  ...required,
  message: (_, values) => i18n.t('errors.field_must_be_filled', values)
})

extend('max', {
  ...max,
  message: 'This field must be {length} characters or less'
})

extend('numeric', {
  ...numeric,
  message: (_, values) => i18n.t('errors.field_unauthorized_characters', values)
})

extend('email', {
  ...email,
  message: (_, values) => i18n.t('errors.field_must_be_valid_email', values)
})

extend('isHtml', {
  message: (_, values) => i18n.t('errors.field_unauthorized_characters', values),
  validate: value => {
    return !isContainHtmlTags(value)
  }
})

extend('isPhoneNumber', {
  message: (_, values) => i18n.t('errors.field_phone_number_not_valid', values),
  validate: value => {
    return isPhoneNumber(value)
  }
})

extend('isWhiteSpaces', {
  message: (_, values) => i18n.t('errors.field_non_whitespaces', values),
  validate: value => {
    return noWhiteSpaces(value)
  }
})

extend('isUsernameUsed', {
  message: (_, values) => i18n.t('errors.username_are_used', values),
  validate: async(value) => {
    let isUsed = true
    if (value.length > 3) {
      const response = await store.dispatch('user/checkUsernameEmail', {
        params: value
      })
      isUsed = response.data
    }
    return !isUsed
  }
})

extend('isEmailUsed', {
  message: (_, values) => i18n.t('errors.email_are_used', values),
  validate: async(value) => {
    let isUsed = true
    if (value.length > 3) {
      const response = await store.dispatch('user/checkUsernameEmail', {
        params: value
      })
      isUsed = response.data
    }
    return !isUsed
  }
})

extend('atLeastOne', {
  message: 'At least one item must be selected.',
  validate: (value) => {
    return value.length > 0
  }
})
