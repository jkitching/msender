import React from 'react'
import style from './style.scss'

const Input = props => {
  return (
    <input type={props.inputType ? props.inputType : 'text'} className={style.input} {...props} />
  )
}

export default Input
