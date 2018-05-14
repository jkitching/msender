import { h } from 'preact'
import style from './style.scss'

const Input = props => {
  return (
    <input type="text" className={style.input} {...props} />
  )
}

export default Input
