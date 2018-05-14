import { Record } from 'immutable'

import { MessengerNone } from './messenger'

export default class Msender extends Record({
  first_name: null,
  last_name: null,
  email: null,
  department: null,
  message_to: null,
  message_bcc: null,
  message_subject: null,
  message_text: null,
  messenger: new MessengerNone(),
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
  
  getToString() {
    return this.get('message_to')
  }
  getToEmailsString() {
    return this.get('message_to')
  }
  getCcString() {
    return ''
  }
  getBccString() {
    return this.get('message_bcc')
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
  return new Msender({
    message_to: props.to,
    message_bcc: props.bcc,
    message_subject: props.subject,
    message_text: props.message,
  })
}
