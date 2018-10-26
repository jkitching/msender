import React from 'react'

import Input from '../input'
import LabelContainer from '../label-container'

const InputLabel = props => {
  return (
    <LabelContainer renderLabelText={props.renderLabelText} enabled={props.enabled}>
      <Input {...props} />
    </LabelContainer>
  )
}

export default InputLabel
