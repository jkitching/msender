import React, { Component } from 'react'
import style from './style.scss'

import Step from '../step'
import InputLabel from '../input-label'
import SelectLabel from '../select-label'
import Button from '../button'
import MessagePreview from '../message-preview'

const MsenderForm = (props) => {
  return (
    <div className={style.msender_form}>
      <Step title="Mes informations" number="1">
        <InputLabel labelText="Prénom" value="Micha" />
        <InputLabel labelText="Nom" value="Mazaheri" />
        <InputLabel labelText="Email" value="micha@mazaheri.me" />
      </Step>
      <Step title="Les magasins autour de moi" number="2">
        <SelectLabel labelText="Département" value="Micha" options={[
          {val: '28', text: '28 - Eure-et-Loir'},
          {val: '75', text: '75 - Paris'},
        ]} onChange={(v) => { console.log(v) }} />
      </Step>
      <Step title="Envoyer mon message" number="3">
        <Button>Ouvrir ma messagerie</Button>
      </Step>
    </div>
  )
}

export default class Msender extends Component {
  render(props) {
    return (
      <div className={style.msender}>
        <MsenderForm />
        <MessagePreview />
      </div>
    )
  }
}
