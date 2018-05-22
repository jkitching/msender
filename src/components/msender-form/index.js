import React, { Component } from 'react'
import style from './style.scss'

import Step from '../step'
import InputLabel from '../input-label'
import SelectLabel from '../select-label'
import Checkbox from '../checkbox'
import CopyAdvice from '../copy-advice'
import ButtonContainer from '../button-container'

import { getMessengers, MESSENGER_MODE_NONE, MESSENGER_MODE_COPY } from '../../models/messenger'
import detectEmailMessenger from '../../utils/detectEmailMessenger'
import isEmailValid from '../../utils/isEmailValid'
import mailchimpMsenderSubscribe from '../../utils/mailchimpMsenderSubscribe'

class MsenderFormStepInfo extends Component {
  constructor() {
    super()
    this.onInputFirstName = this.onInputFirstName.bind(this)
    this.onInputLastName = this.onInputLastName.bind(this)
    this.onInputEmail = this.onInputEmail.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangeSendMailChimp = this.onChangeSendMailChimp.bind(this)
  }

  onInputFirstName(e) {
    const { setIn } = this.props
    setIn(['first_name'], e.target.value)
  }

  onInputLastName(e) {
    const { setIn } = this.props
    setIn(['last_name'], e.target.value)
  }

  onInputEmail(e) {
    const { setIn } = this.props
    setIn(['email'], e.target.value)
  }

  onChangeEmail(e) {
    const { msender, setIn } = this.props

    // ignore on mobile
    if (msender.get('is_mobile_or_tablet')) {
      return
    }

    // detect email messenger
    detectEmailMessenger(e.target.value).then(messenger => {
      if (messenger) {
        setIn(['messenger'], messenger)
      }
    })
  }

  onChangeSendMailChimp(val) {
    const { setIn } = this.props
    setIn(['send_mailchimp'], val)
  }

  renderMailChimpCheckbox() {
    const { msender } = this.props
    if (!msender.get('enable_mailchimp')) {
      return null
    }
    return (
      <Checkbox labelText="Tenez-moi au courant des prochaines campagnes et actions de L214"
                value={msender.get('send_mailchimp')}
                onChange={this.onChangeSendMailChimp} />
    )
  }

  render() {
    const { msender, number } = this.props
    return (
      <Step title="Mes informations" number={number}>
        <InputLabel labelText="Prénom"
                    value={msender.get('first_name')}
                    onInput={this.onInputFirstName} />
        <InputLabel labelText="Nom"
                    value={msender.get('last_name')}
                    onInput={this.onInputLastName} />
        <InputLabel labelText="Email"
                    inputType="email"
                    value={msender.get('email')}
                    onInput={this.onInputEmail}
                    onChange={this.onEmailChange} />
        {this.renderMailChimpCheckbox()}
      </Step>
    )
  }
}

class MsenderFormStepDetails extends Component {
  constructor() {
    super()
    this.onChangeDepartment = this.onChangeDepartment.bind(this)
    this.onChangeSelectTo = this.onChangeSelectTo.bind(this)
  }

  getStepName() {
    const { msender } = this.props
    let name = msender.get('step_two_title')
    if (!name) {
      name = 'Destinataires'
    }
    return name
  }

  onChangeDepartment(e) {
    const { msender, setIn } = this.props
    setIn(['department'], msender.getDepartments()
                                 .find(d => e.target.value === d.get('code')))
  }

  onChangeSelectTo(e) {
    const { msender, setIn } = this.props
    setIn(['message_to_current'], msender.get('message_to')
                                         .find(d => e.target.value === d.get('email')))
  }

  renderSelectDepartment() {
    const { msender, enabled } = this.props
    if (!msender.getSelectDepartmentMode()) {
      return null
    }
    return (
      <SelectLabel labelText="Département"
                   value={msender.getIn(['department', 'code'])}
                   options={msender.getDepartments().map(d => d.getSelectOption()).toArray()}
                   enabled={enabled}
                   onChange={this.onChangeDepartment} />
    )
  }

  renderSelectTo() {
    const { msender, enabled } = this.props
    if (!msender.get('select_to')) {
      return null
    }
    return (
      <SelectLabel labelText="Enseigne"
                   value={msender.getIn(['message_to_current', 'email'])}
                   options={msender.get('message_to').map(d => d.getSelectOption()).toArray()}
                   enabled={enabled}
                   onChange={this.onChangeSelectTo} />
    )
  }

  render() {
    const { msender, number } = this.props
    return (
      <Step title={this.getStepName()} number={number}>
        {this.renderSelectDepartment()}
        {this.renderSelectTo()}
      </Step>
    )
  }
}

class MsenderFormStepSend extends Component {
  constructor() {
    super()
    this.onChangeMessenger = this.onChangeMessenger.bind(this)
    this.onSend = this.onSend.bind(this)
  }

  onChangeMessenger(e) {
    const { setIn } = this.props
    setIn(['messenger'], getMessengers().find(d => e.target.value === d.get('identifier')))
  }

  onSend() {
    const { msender, setIn } = this.props
    if (msender.get('enable_mailchimp') &&
        msender.get('send_mailchimp') &&
        !msender.get('mailchimp_is_sent')) {
      setIn(['mailchimp_is_sent'], true)
      mailchimpMsenderSubscribe(msender)
    }
  }

  renderSelectMessenger() {
    const { msender, enabled } = this.props
    if (msender.get('is_mobile_or_tablet')) {
      return null
    }
    return (
      <SelectLabel labelText="Messagerie"
                   value={msender.getIn(['messenger', 'identifier'])}
                   options={getMessengers().map(m => ({
                    value: m.get('identifier'),
                    text: m.get('name'),
                   })).toArray()}
                   enabled={enabled}
                   onChange={this.onChangeMessenger} />
    )
  }

  renderCopyAdvice() {
    const { msender } = this.props
    if (isEmailValid(msender.get('email')) && 
        (msender.get('messenger').getMode() === MESSENGER_MODE_COPY ||
         msender.get('messenger').getMode() === MESSENGER_MODE_NONE)) {
      return <CopyAdvice />
    }
    return null
  }

  renderSendButton() {
    const { msender, enabled } = this.props
    if (msender.get('messenger').getMode() === MESSENGER_MODE_NONE) {
      return null
    }
    const sendButtonEnabled = (enabled && !!msender.getIn(['messenger', 'identifier']))
    return (
      <ButtonContainer msender={msender}
                       enabled={sendButtonEnabled}
                       onClick={this.onSend} />
    )
  }

  render() {
    const { msender, number } = this.props
    return (
      <Step title="Envoyer mon message" number={number}>
        {this.renderSelectMessenger()}
        {this.renderCopyAdvice()}
        {this.renderSendButton()}
      </Step>
    )
  }
}

export default class MsenderForm extends Component {
  render() {
    const { msender, setIn } = this.props

    // step numbers
    const infoStep = 1
    let detailsStep = null
    let sendStep = 2
    if (!!msender.getSelectDepartmentMode() || !!msender.get('select_to')) {
      detailsStep = 2
      sendStep = 3
    }

    // step activation
    let stepTwoEnabled = msender.isInfosValid()
    let stepThreeEnabled = (msender.isInfosValid() &&
                            msender.isDepartmentValid() &&
                            msender.isSelectToValid())

    return (
      <div className={style.msender_form}>
        <MsenderFormStepInfo msender={msender}
                             setIn={setIn}
                             number={1} />
        {detailsStep !== null ?
          (
            <MsenderFormStepDetails msender={msender}
                                    setIn={setIn}
                                    number={detailsStep}
                                    enabled={stepTwoEnabled} />
          ) : null
        }
        <MsenderFormStepSend msender={msender}
                             setIn={setIn}
                             number={sendStep}
                             enabled={stepThreeEnabled} />
        <div className={style.message_hint_mobile}>
          Ci-dessous le message à envoyer. Vous pourrez le modifier dans votre messagerie.
        </div>
      </div>
    )
  }
}
