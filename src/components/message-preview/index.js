import React from 'react'
import { FormattedMessage } from 'react-intl'

import style from './style.scss'

import ValueField from '../value-field'

const MessagePreview = (props) => {
  const { msender } = props
  return (
    <div className={style.message_preview}>
      <ValueField
        renderLabelText={() => (
          <FormattedMessage id="label_value_send_to" />
        )}
        value={msender.getToEmailsString()}
      />
      <hr className={style.message_hr} />
      <ValueField
        renderLabelText={() => (
          <FormattedMessage id="label_value_subject" />
        )}
        value={msender.getSubject()}
      />
      <hr className={style.message_hr} />
      <ValueField
        renderLabelText={() => (
          <FormattedMessage id="label_value_message" />
        )}
        renderLabelHint={() => (
          <FormattedMessage id="label_value_message_hint" />
        )}
        value={msender.getMessage()}
        multiline={true}
      />
    </div>
  )
}

export default MessagePreview
