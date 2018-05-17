import React from 'react'
import style from './style.scss'

const inhibitClick = (e) => {
  e.preventDefault()
  e.stopPropagation()
  return false
}

const noOp = () => {}

const Button = (props) => {
  const enabled = ('undefined' === typeof props.enabled || props.enabled)
  const className = (enabled ? style.button : style.button_disabled)
  return props.isLink ?
    ( <a href={props.href} className={className} target="_blank" onClick={enabled ? noOp : inhibitClick}>{props.children}</a> ) :
    ( <button className={className} onClick={enabled ? noOp : inhibitClick}>{props.children}</button> )
}

export default Button
