import { h } from 'preact'
import style from './style.scss'

const ValueField = props => {
  return (
    <div className={props.multiline ? style.value_field_multiline : style.value_field}>
      <label className={props.multiline ? style.label_multiline : style.label}>
        <span className={style.label_text}>
          <span>{props.labelText}</span>
          {(props.labelHint && props.labelHint.length) > 0 ?
           <span className={style.label_hint}>{` ${props.labelHint}`}</span> :
           null
          }
        </span>
        {props.multiline ?
         ( <textarea type="text" readonly={true} className={style.input_multiline} value={props.value} /> ) :
         ( <input type="text" readonly={true} className={style.input} value={props.value} /> )
        }
      </label>
    </div>
  )
}

export default ValueField
