import React, { Component } from 'react'
import style from './style.scss'

import Step from '../step'
import InputLabel from '../input-label'
import SelectLabel from '../select-label'
import MessagePreview from '../message-preview'
import CopyAdvice from '../copy-advice'
import ButtonContainer from '../button-container'

import { msenderFromProps } from '../../models/msender'
import { getDepartments } from '../../models/department'
import { getMessengers, MESSENGER_MODE_NONE, MESSENGER_MODE_COPY } from '../../models/messenger'
import detectEmailMessenger from '../../utils/detectEmailMessenger'
import withPetitionBindings from '../../utils/withPetitionBindings'
import isEmailValid from '../../utils/isEmailValid'

const departments = getDepartments()
const messengers = getMessengers()

const MsenderForm = (props) => {
  const { msender, setIn } = props
  const onEmailChange = (e) => {
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
  const selectDepartment = msender.get('select_department')
  const selectTo = msender.get('select_to')
  const infoStep = 1
  let detailsStep = null
  let sendStep = 2
  if (selectDepartment || selectTo) {
    detailsStep = 2
    sendStep = 3
  }
  return (
    <div className={style.msender_form}>
      <Step title="Mes informations" number={infoStep}>
        <InputLabel labelText="Prénom"
                    value={msender.get('first_name')}
                    onInput={(e) => setIn(['first_name'], e.target.value)} />
        <InputLabel labelText="Nom"
                    value={msender.get('last_name')}
                    onInput={(e) => setIn(['last_name'], e.target.value)} />
        <InputLabel labelText="Email"
                    inputType="email"
                    value={msender.get('email')}
                    onInput={(e) => setIn(['email'], e.target.value)}
                    onChange={onEmailChange} />
      </Step>
      {detailsStep !== null ?
        (
          <Step title="Mes magasins" number={detailsStep}>
            <SelectLabel labelText="Département"
                         value={msender.getIn(['department', 'code'])}
                         options={departments.map(d => d.getSelectOption()).toArray()}
                         onChange={(e) => { setIn(['department'], departments.find(d => e.target.value === d.get('code'))) }} />
            <SelectLabel labelText="Enseigne"
                         value={msender.getIn(['message_to_current', 'email'])}
                         options={msender.get('message_to').map(d => d.getSelectOption()).toArray()}
                         onChange={(e) => { setIn(['message_to_current'], msender.get('message_to').find(d => e.target.value === d.get('email'))) }} />
          </Step>
        ) : null
      }
      <Step title="Envoyer mon message" number={sendStep}>
        {!msender.get('is_mobile_or_tablet') ?
          ( <SelectLabel labelText="Messagerie"
                         value={msender.getIn(['messenger', 'identifier'])}
                         options={messengers.map(m => ({
                          value: m.get('identifier'),
                          text: m.get('name'),
                         })).toArray()}
                         onChange={(e) => { setIn(['messenger'], messengers.find(d => e.target.value === d.get('identifier'))) }} />
          ) : null
        }
        {isEmailValid(msender.get('email')) && 
         (msender.get('messenger').getMode() === MESSENGER_MODE_COPY ||
          msender.get('messenger').getMode() === MESSENGER_MODE_NONE) ?
          (
            <CopyAdvice />
          ) : null
        }
        {msender.get('messenger').getMode() !== MESSENGER_MODE_NONE ? <ButtonContainer msender={msender} /> : null}
      </Step>
      <div className={style.message_hint_mobile}>
        Ci-dessous le message à envoyer. Vous pourrez le modifier dans votre messagerie.
      </div>
    </div>
  )
}

const MSenderUI = withPetitionBindings((props) => {
  const { msender } = props
  return (
    <div className={style.msender}>
      <MsenderForm {...props} />
      <MessagePreview {...props} />
      {msender.get('messenger').getMode() !== MESSENGER_MODE_NONE ? <ButtonContainer msender={msender} mobileOnly={true} /> : null}
    </div>
  )
})

export default class MsenderContainer extends Component {
  constructor(props) {
    super()
    this.state = {
      msender: msenderFromProps(props)
    }
    this.setInBound = this.setIn.bind(this)
    this.didGetPetitionDataBound = this.didGetPetitionData.bind(this)
  }

  render() {
    const { msender } = this.state
    return <MSenderUI msender={msender}
                      setIn={this.setInBound}
                      didGetPetitionData={this.didGetPetitionDataBound} />
  }

  setIn(keys, value) {
    const { msender } = this.state
    this.setState({
      msender: msender.setIn(keys, value)
    })
  }

  didGetPetitionData(userData) {
    const { msender } = this.state
    if ((!msender.get('first_name') || msender.get('first_name').length === 0) &&
        (!msender.get('last_name') || msender.get('last_name').length === 0)) {
      this.setIn(['first_name'], userData.first_name)
      this.setIn(['last_name'], userData.last_name)
      this.setIn(['email'], userData.email)
      this.setIn(['department'], departments.find(d => userData.postal_code.substr(0, 2).toString() === d.get('code')))

      // ignore on mobile
      if (!msender.get('is_mobile_or_tablet')) {
        detectEmailMessenger(userData.email).then(messenger => {
          if (messenger) {
            this.setIn(['messenger'], messenger)
          }
        })
      }
    }
  }
}
