import React, { Component } from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import frLocaleData from 'react-intl/locale-data/fr'

import style from './style.scss'

import MsenderForm from '../msender-form'
import MessagePreview from '../message-preview'
import ButtonContainer from '../button-container'

import { msenderFromProps } from '../../models/msender'
import { getMessengers, MESSENGER_MODE_NONE } from '../../models/messenger'
import detectEmailMessenger from '../../utils/detectEmailMessenger'
import withPetitionBindings from '../../utils/withPetitionBindings'
import { getMessagesLocale } from '../../utils/i18n'


// add local configs from React Intl
addLocaleData(enLocaleData)
addLocaleData(frLocaleData)

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
    const { locale, messages } = getMessagesLocale(msender)
    return (
      <IntlProvider
        locale={locale}
        messages={messages}
      >
        <MSenderUI
          msender={msender}
          setIn={this.setInBound}
          didGetPetitionData={this.didGetPetitionDataBound}
        />
      </IntlProvider>
    )
  }

  setIn(keys, value) {
    const { msender } = this.state
    this.setState({
      msender: msender.setIn(keys, value)
    })
  }

  didGetPetitionData(userData) {
    const { msender } = this.state
    const departments = msender.getDepartments()
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
