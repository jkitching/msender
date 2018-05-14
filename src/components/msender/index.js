import React, { Component } from 'react'
import style from './style.scss'

import Step from '../step'
import InputLabel from '../input-label'
import SelectLabel from '../select-label'
import Button from '../button'
import MessagePreview from '../message-preview'

import { msenderFromProps } from '../../models/msender'
import { getDepartments } from '../../models/department'
import { getMessengers, MESSENGER_MODE_NONE } from '../../models/messenger'
import detectEmailMessenger from '../../utils/detectEmailMessenger'

const departments = getDepartments()
const messengers = getMessengers()

const MsenderForm = (props) => {
  const { msender, setIn } = props
  const onEmailChange = (e) => {
    detectEmailMessenger(e.target.value).then(messenger => {
      if (messenger) {
        setIn(['messenger'], messenger)
      }
    })
  }
  return (
    <div className={style.msender_form}>
      <Step title="Mes informations" number="1">
        <InputLabel labelText="Prénom"
                    value={msender.get('first_name')}
                    onInput={(e) => setIn(['first_name'], e.target.value)} />
        <InputLabel labelText="Nom"
                    value={msender.get('last_name')}
                    onInput={(e) => setIn(['last_name'], e.target.value)} />
        <InputLabel labelText="Email"
                    value={msender.get('email')}
                    onInput={(e) => setIn(['email'], e.target.value)}
                    onChange={onEmailChange} />
      </Step>
      <Step title="Les magasins autour de moi" number="2">
        <SelectLabel labelText="Département"
                     value={msender.getIn(['department', 'code'])}
                     options={departments.map(d => d.getSelectOption()).toArray()}
                     onChange={(e) => { setIn(['department'], departments.find(d => e.target.value == d.get('code'))) }} />
      </Step>
      <Step title="Envoyer mon message" number="3">
        <SelectLabel labelText="Messagerie"
                     value={msender.getIn(['messenger', 'identifier'])}
                     options={messengers.map(m => ({
                      value: m.get('identifier'),
                      text: m.get('name'),
                     })).toArray()}
                     onChange={(e) => { setIn(['messenger'], messengers.find(d => e.target.value == d.get('identifier'))) }} />
        {msender.get('messenger').getMode() !== MESSENGER_MODE_NONE ?
          (
            <Button isLink={true}
                    href={msender.get('messenger').getMailtoLink(msender)}>
              Ouvrir ma messagerie
            </Button>
          ) : null
        }
      </Step>
    </div>
  )
}

export default class MsenderContainer extends Component {
  constructor(props) {
    super()
    this.state = {
      msender: msenderFromProps(props)
    }
    this.setInBound = this.setIn.bind(this)
  }

  render() {
    const { msender } = this.state
    return (
      <div className={style.msender}>
        <MsenderForm msender={msender} setIn={this.setInBound} />
        <MessagePreview msender={msender} setIn={this.setInBound} />
      </div>
    )
  }

  setIn(keys, value) {
    const { msender } = this.state
    this.setState({
      msender: msender.setIn(keys, value)
    })
  }
}
