import React from 'react'
import style from './style.scss'

const inhibitClick = (onClick) => {
  return (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onClick) {
      onClick(e)
    }
    return false
  }
}

const noOp = (onClick) => {
  return (e) => {
    if (onClick) {
      onClick(e)
    }
    return true
  }
}

const Button = (props) => {
  const enabled = ('undefined' === typeof props.enabled || props.enabled)
  const className = (enabled ? style.button : style.button_disabled)
  const onClickFn = enabled ? noOp(props.onClick) : inhibitClick(props.onClick)
  return props.isLink ?
    ( <a href={props.href} className={className} target="_blank" onClick={onClickFn}>{props.children}</a> ) :
    ( <button className={className} onClick={onClickFn}>{props.children}</button> )
}

export default Button
