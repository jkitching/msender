import { h } from 'preact'
import style from './style.scss'

const Button = props => {
  return (
    <button className={style.button}>{props.children}</button>
  )
}

export default Button
