import React from 'react'
import style from './style.scss'

const Checkbox = props => {
  const enabled = ('undefined' === typeof props.enabled || props.enabled)
  return (
    <label className={style.label}>
      <input type="checkbox" checked={props.value} onClick={() => { props.onChange(!props.value) }} />
      <span className={enabled ? style.label_text : style.label_text_disabled}>{props.labelText}</span>
    </label>
  )
}

export default Checkbox
