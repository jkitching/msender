import React from 'react'

import Input from '../input'
import LabelContainer from '../label-container'

const InputLabel = props => {
  return (
    <LabelContainer labelText={props.labelText}>
      <Input {...props} />
    </LabelContainer>
  )
}

export default InputLabel
