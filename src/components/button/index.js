import React from 'react'
import style from './style.scss'

const Button = props => {
  return props.isLink ?
    ( <a href={props.href} className={style.button} target="_blank">{props.children}</a> ) :
    ( <button className={style.button}>{props.children}</button> )
}

export default Button
