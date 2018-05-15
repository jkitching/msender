import React, { Component } from 'react'
import style from './style.scss'

import Button from '../button'

const ButtonContainer = (props) => {
  const { msender } = props
  return (
    <div className={style.button_container}>
      <Button isLink={true}
              href={msender.get('messenger').getMailtoLink(msender)}>
        Ouvrir ma messagerie
      </Button>
    </div>
  )
}

export default ButtonContainer
