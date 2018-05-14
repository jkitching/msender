import React from 'react'
import style from './style.scss'

const Select = props => {
  return (
    <select value={props.value} onChange={props.didChange}>
      {props.options.map(val => {
        return <option key={val.value} value={val.value}>{val.text}</option>
      })}
    </select>
  )
}

export default Select
