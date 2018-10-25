import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

import style from './style.scss'

import { MESSENGER_MODE_LINK } from '../../models/messenger'

import Button from '../button'

const ButtonContainer = ({ msender, mobileOnly, enabled, onClick }) => (
  <div className={mobileOnly ? style.button_container_mobile : style.button_container}>
    <Button isLink={true}
            href={msender.get('messenger').getMailtoLink(msender)}
            enabled={enabled}
            onClick={onClick}>
      {msender.get('messenger').getMode() === MESSENGER_MODE_LINK ? (
        <FormattedMessage id="label_send_button_link" />
      ) : (
        <FormattedMessage id="label_send_button_open" />
      )}
    </Button>
  </div>
)

export default ButtonContainer
