import React, { Component } from 'react'
import style from './style.scss'

import CopyButton from '../button-copy'

class ValueField extends Component {
  constructor(props) {
    super()
    this.state = {
      inputId: Math.round(Math.random()*1e9).toString()
    }
    this.inputRef = null
    this.selectContentBound = this.selectContent.bind(this)
  }

  render() {
    const { props } = this
    const { inputId } = this.state
    return (
      <div className={props.multiline ? style.value_field_multiline : style.value_field}>
        <div className={props.multiline ? style.label_container_multiline : style.label_container}>
          <label htmlFor={inputId} className={style.label} onClick={this.selectContentBound}>
            <span>
              <span>{props.renderLabelText()}</span>
              {props.renderLabelHint && (
                <span className={style.label_hint}>
                  <span>{` `}</span>
                  {props.renderLabelHint()}
                </span>
              )}
            </span>
            {props.multiline ? <CopyButton value={props.value} /> : null}
          </label>
          {props.multiline ?
           ( <textarea id={inputId}
                       type="text"
                       readonly={true}
                       className={style.input_multiline}
                       value={props.value}
                       ref={(ref) => this.inputRef = ref}
                       onFocus={this.selectContentBound}
             /> ) :
           ( <input id={inputId}
                    type="text"
                    readonly={true}
                    className={style.input}
                    value={props.value}
                    ref={(ref) => this.inputRef = ref}
                    onFocus={this.selectContentBound}
             /> )
          }
          {!props.multiline ? <span className={style.copy_container}><CopyButton value={props.value} /></span> : null}
        </div>
      </div>
    )
  }

  selectContent() {
    if (this.inputRef) {
      this.inputRef.setSelectionRange(0, this.inputRef.value.length)
    }
  }
}

export default ValueField
