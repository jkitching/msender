import React from 'react'
import { FormattedMessage } from 'react-intl'

import style from './style.scss'

import ValueField from '../value-field'
import { FILTER_RECIPIENT_NONE } from '../../models/msender'


const MessagePreview = (props) => {
  const { msender } = props
  return (
    <div className={style.message_preview}>
      {msender.get('filter_recipient') !== FILTER_RECIPIENT_NONE && (
        <React.Fragment>
          <ValueField
            renderLabelText={() => (
              <FormattedMessage id="label_value_send_to" />
            )}
            value={msender.getToEmailsString()}
          />
          <hr className={style.message_hr} />
        </React.Fragment>
      )}
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
