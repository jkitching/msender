import { h, Component } from 'preact'
import style from './style.scss'

import Input from '../input'

const InputLabel = props => {
  return (
    <label className={style.label}>
    	<span className={style.label_text}>{props.labelText}</span>
    	<Input {...props} />
    </label>
  )
}

export default InputLabel
