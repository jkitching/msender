import React from 'react'
import style from './style.scss'

import { CopyToClipboard } from 'react-copy-to-clipboard'

const CopyButton = props => {
  return (
    <CopyToClipboard text={props.value}>
      <button className={style.button}>Copy</button>
    </CopyToClipboard>
  )
}

export default CopyButton
