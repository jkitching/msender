import React, { Component } from 'react'
import style from './style.scss'

import { MESSENGER_MODE_LINK } from '../../models/messenger'

import Button from '../button'

const ButtonContainer = (props) => {
  const { msender } = props
  let text = "Ouvrir ma messagerie"
  if (msender.get('messenger').getMode() === MESSENGER_MODE_LINK) {
    text = "Envoyer le message"
  }
  return (
    <div className={props.mobileOnly ? style.button_container_mobile : style.button_container}>
      <Button isLink={true}
              href={msender.get('messenger').getMailtoLink(msender)}
              enabled={props.enabled}>
        {text}
      </Button>
    </div>
  )
}

export default ButtonContainer
