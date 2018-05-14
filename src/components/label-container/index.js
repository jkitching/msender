import React from 'react'
import style from './style.scss'

const LabelContainer = props => {
  return (
    <label className={style.label}>
      <span className={style.label_text}>{props.labelText}</span>
      {props.children}
    </label>
  )
}

export default LabelContainer
