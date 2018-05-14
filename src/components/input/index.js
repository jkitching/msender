import React from 'react'
import style from './style.scss'

const Input = props => {
  return (
    <input type="text" className={style.input} {...props} />
  )
}

export default Input
