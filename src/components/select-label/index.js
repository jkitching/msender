import React from 'react'

import Select from '../select'
import LabelContainer from '../label-container'

const InputLabel = props => {
  return (
    <LabelContainer labelText={props.labelText} enabled={props.enabled}>
      <Select {...props} />
    </LabelContainer>
  )
}

export default InputLabel
