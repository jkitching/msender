import React from 'react'
import style from './style.scss'

const Select = props => {
  return (
    <select className={style.select} value={props.value} onChange={props.onChange}>
      {props.options.map(val => {
        return <option key={val.value} value={val.value}>{val.text}</option>
      })}
    </select>
  )
}

export default Select
