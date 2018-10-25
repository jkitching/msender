import React from 'react'
import style from './style.scss'

const LabelContainer = props => {
  const enabled = ('undefined' === typeof props.enabled || props.enabled)
  return (
    <label className={style.label}>
      <span className={enabled ? style.label_text : style.label_text_disabled}>{props.renderLabelText()}</span>
      {props.children}
    </label>
  )
}

export default LabelContainer
