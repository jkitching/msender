import React, { Component } from 'react'
import style from './style.scss'

import CopyButton from '../button-copy'

class ValueField extends Component {
  constructor(props) {
    super()
    this.state = {
      inputId: Math.round(Math.random()*1e9).toString()
    }
  }

  render() {
    const { props } = this
    const { inputId } = this.state
    return (
      <div className={props.multiline ? style.value_field_multiline : style.value_field}>
        <div className={props.multiline ? style.label_container_multiline : style.label_container}>
          <label htmlFor={inputId} className={style.label}>
            <span>
              <span>{props.labelText}</span>
              {(props.labelHint && props.labelHint.length) > 0 ?
               <span className={style.label_hint}>{` ${props.labelHint}`}</span> :
               null
              }
            </span>
            {props.multiline ? <CopyButton value={props.value} /> : null}
          </label>
          {props.multiline ?
           ( <textarea id={inputId} type="text" readonly={true} className={style.input_multiline} value={props.value} /> ) :
           ( <input id={inputId} type="text" readonly={true} className={style.input} value={props.value} /> )
          }
          {!props.multiline ? <span className={style.copy_container}><CopyButton value={props.value} /></span> : null}
        </div>
      </div>
    )
  }
}

export default ValueField
