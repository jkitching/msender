import Immutable, { Record } from 'immutable'

import { MessengerGmail, MessengerMailto } from './messenger'
import { makeRecipientList } from './recipient'
import { getDepartments,
         DEPARTMENT_MODE_DEFAULT,
         DEPARTMENT_MODE_METROPOLITAN,
         DEPARTMENT_MODE_LEGISLATIVE } from './department'

import isMobileOrTablet from '../utils/isMobileOrTablet'
import normalizeName from '../utils/normalizeName'
const is_mobile_or_tablet = isMobileOrTablet()

export default class Msender extends Record({
  first_name: null,
  last_name: null,
  email: null,
  department: null,
  message_to: null,
  message_cc: null,
  message_bcc: null,
  message_subject: null,
  message_text: null,
  message_to_current: null,
  select_department: false,
  select_to: false,
  step_two_title: null,
  filter_to_department: null,
  messenger: (is_mobile_or_tablet ? new MessengerMailto() : new MessengerGmail()),
  is_mobile_or_tablet: is_mobile_or_tablet,
  enable_mailchimp: false,
  send_mailchimp: false,
  mailchimp_is_sent: false,
  mailchimp_source: 'msender',
}) {
  getName() {
    const firstName = this.getFirstName()
    const lastName = this.getLastName()
    return `${firstName} ${lastName}`
  }
  getFirstName() {
    return normalizeName(this.get('first_name') || '')
  }
  getLastName() {
    return normalizeName(this.get('last_name') || '')
  }
  getDepartmentName() {
    const department = this.get('department')
    if (department) {
      return department.get('name')
    }
    return ''
  }
  getDepartmentCode() {
    const department = this.get('department')
    if (department) {
      return department.get('code')
    }
    return ''
  }
  getFilterToDepartmentMode() {
    const mode = this.get('filter_to_department')
    if (!mode) {
      return null
    }
    switch (mode) {
      case DEPARTMENT_MODE_DEFAULT:
      case DEPARTMENT_MODE_METROPOLITAN:
      case DEPARTMENT_MODE_LEGISLATIVE:
        return mode
      default:
        return DEPARTMENT_MODE_DEFAULT
    }
  }
  getDepartments() {
    const mode = this.getFilterToDepartmentMode()
    if (!mode) {
      return Immutable.List()
    }
    return getDepartments(mode)
  }

  getToRecipients() {
    if (this.get('select_to') && this.get('message_to_current')) {
      return Immutable.List([this.get('message_to_current')])
    }
    else if (this.getFilterToDepartmentMode()) {
      const code = this.getDepartmentCode()
      if (!code) {
        return Immutable.List()
      }
      return this.get('message_to')
                 .filter(recipient => recipient.get('department_code') === code)
                 .sortBy(recipient => recipient.get('last_name'))
    }
    return this.get('message_to')
  }
  getToString(separator = ', ') {
    return this.getToRecipients().map(recipient => recipient.getToString()).join(separator)
  }
  getToEmailsString(separator = ', ') {
    return this.getToRecipients().map(recipient => recipient.getToEmail()).join(separator)
  }
  getCcString(separator = ', ') {
    return this.get('message_cc').map(recipient => recipient.getToEmail()).join(separator)
  }
  getBccString(separator = ', ') {
    return this.get('message_bcc').map(recipient => recipient.getToEmail()).join(separator)
  }
  getSubject() {
    return this.get('message_subject') || ''
  }
  getMessage() {
    let message = this.get('message_text') || ''
    message = message.replace('{{name}}', this.getName())
    message = message.replace('{{first_name}}', this.getFirstName())
    message = message.replace('{{last_name}}', this.getLastName())
    message = message.replace('{{department_name}}', this.getDepartmentName())
    message = message.replace('{{department_code}}', this.getDepartmentCode())
    return message
  }
}

export const msenderFromProps = (props) => {
  const to = makeRecipientList(props.to)
  const cc = makeRecipientList(props.cc)
  const bcc = makeRecipientList(props.bcc)
  let message_to_current = null
  if (props.select_to) {
    if (props.select_to_random) {
      message_to_current = to.get(Math.round(Math.random() * (to.count() - 1)))
    } else {
      message_to_current = to.first()
    }
  }
  return new Msender({
    first_name: props.first_name,
    last_name: props.last_name,
    email: props.email,
    message_to: to,
    message_cc: cc,
    message_bcc: bcc,
    message_subject: props.subject,
    message_text: props.message,
    message_to_current: message_to_current,
    select_department: props.select_department,
    select_to: props.select_to,
    step_two_title: props.step_two_title,
    filter_to_department: props.filter_to_department,
    enable_mailchimp: (!!props.enable_mailchimp),
    send_mailchimp: (!!props.send_mailchimp),
    mailchimp_source: (props.mailchimp_source ? props.mailchimp_source : 'msender'),
  })
}
