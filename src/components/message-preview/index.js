import React from 'react'
import style from './style.scss'

import ValueField from '../value-field'

const MessagePreview = (props) => {
  const { msender } = props
  return (
    <div className={style.message_preview}>
      <ValueField labelText="Envoyer à :" value={msender.getToEmailsString()} />
      <hr className={style.message_hr} />
      <ValueField labelText="Objet :" value={msender.getSubject()} />
      <hr className={style.message_hr} />
      <ValueField labelText="Message :"
                  labelHint="(vous pourrez le modifier dans votre boite email)"
                  value={msender.getMessage()}
                  multiline={true} />
    </div>
  )
}

export default MessagePreview
