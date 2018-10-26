import React from 'react'
import style from './style.scss'

const Select = props => {
  const enabled = ('undefined' === typeof props.enabled || props.enabled)
  return (
    <select className={style.select} value={props.value} onChange={props.onChange} disabled={!enabled}>
      {props.options.map(val => {
        return <option key={val.value} value={val.value}>{val.text}</option>
      })}
    </select>
  )
}

export default Select
