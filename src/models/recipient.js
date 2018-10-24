import Immutable, { Record } from 'immutable'

const RECIPIENT_GENDER_MALE = 'm'
const RECIPIENT_GENDER_FEMALE = 'f'
const RECIPIENT_GENDER_NEUTRAL = 'n'

const RECIPIENT_FORMAT_TITLE_NAME = 'title' // e.g. "M. Macron"
const RECIPIENT_FORMAT_FULL_NAME = 'full' // e.g. "Emmanuel Macron"
const RECIPIENT_FORMAT_TITLE_FULL_NAME = 'titlefull' // e.g. "M. Emmanuel Macron"
const RECIPIENT_FORMAT_ORGANIZATION = 'org' // e.g. "Présidence de la République"

export default class Recipient extends Record({
  first_name: null,
  last_name: null,
  organization: null,
  email: null,
  gender: RECIPIENT_GENDER_NEUTRAL,
  format: RECIPIENT_FORMAT_TITLE_NAME,
}) {
  getTitle() {
    switch (this.get('gender')) {
      case RECIPIENT_GENDER_MALE:
        return 'M.'
      case RECIPIENT_GENDER_FEMALE:
        return 'Mme'
      default:
        return null
    }
  }
  getNameStringFormat(format) {
    switch (format) {
      case RECIPIENT_FORMAT_TITLE_NAME:
        return `${this.getTitle() || ''} ${this.get('last_name') || ''}`
      case RECIPIENT_FORMAT_FULL_NAME:
        return `${this.get('first_name') || ''} ${this.get('last_name') || ''}`
      case RECIPIENT_FORMAT_TITLE_FULL_NAME:
        return `${this.getTitle() || ''} ${this.get('first_name') || ''} ${this.get('last_name') || ''}`
      case RECIPIENT_FORMAT_ORGANIZATION:
        return (this.get('organization') || '')
    }
  }
  getNameString() {
    return this.getNameStringFormat(this.get('format'))
  }
  getToEmail() {
    return this.get('email')
  }
  getToString() {
    return `${this.getNameString()} <${this.get('email')}>`
  }
}

const normalizeInput = (str) => {
  if ('string' === typeof str) {
    return str.trim()
  }
  return null
}

const normalizeGender = (gender) => {
  switch ((normalizeInput(gender) || '').toLowerCase()) {
    case 'm':
    case 'h':
      return RECIPIENT_GENDER_MALE
    case 'f':
      return RECIPIENT_GENDER_FEMALE
    default:
      return RECIPIENT_GENDER_NEUTRAL
  }
}

export const makeRecipient = (source) => {
  return new Recipient({
    first_name: normalizeInput(source.firstname),
    last_name: normalizeInput(source.lastname),
    organization: normalizeInput(source.organization),
    email: normalizeInput(source.email),
    gender: normalizeGender(source.gender),
  })
}

export const makeRecipientList = (source) => {
  if (!source) {
    return Immutable.List()
  }
  return Immutable.List(source).map(d => makeRecipient(d))
}
