import Immutable, { Record } from 'immutable'

import { MessengerNone, MessengerMailto } from './messenger'
import { makeRecipientList } from './recipient'

import isMobileOrTablet from '../utils/isMobileOrTablet'
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
  messenger: (is_mobile_or_tablet ? new MessengerMailto() : new MessengerNone()),
  is_mobile_or_tablet: is_mobile_or_tablet,
}) {
  getName() {
    const firstName = this.getFirstName()
    const lastName = this.getLastName()
    return `${firstName} ${lastName}`
  }
  getFirstName() {
    return this.get('first_name') || ''
  }
  getLastName() {
    return this.get('last_name') || ''
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
  
  getToRecipients() {
    if (this.get('select_to') && this.get('message_to_current')) {
      return Immutable.List([this.get('message_to_current')])
    }
    return this.get('message_to')
  }
  getToString() {
    return this.getToRecipients().map(recipient => recipient.getToString()).join(', ')
  }
  getToEmailsString() {
    return this.getToRecipients().map(recipient => recipient.getToEmail()).join(', ')
  }
  getCcString() {
    return this.get('message_cc').map(recipient => recipient.getToEmail()).join(', ')
  }
  getBccString() {
    return this.get('message_bcc').map(recipient => recipient.getToEmail()).join(', ')
  }
  getSubject() {
    return this.get('message_subject')
  }
  getMessage() {
    let message = this.get('message_text')
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
    message_to: to,
    message_cc: cc,
    message_bcc: bcc,
    message_subject: props.subject,
    message_text: props.message,
    message_to_current: message_to_current,
    select_department: props.select_department,
    select_to: props.select_to,
  })
}
