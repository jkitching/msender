import React from 'react'

import Select from '../select'
import LabelContainer from '../label-container'

const InputLabel = props => {
  return (
    <LabelContainer renderLabelText={props.renderLabelText} enabled={props.enabled}>
      <Select {...props} />
    </LabelContainer>
  )
}

export default InputLabel
