import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

import style from './style.scss'

import { CopyToClipboard } from 'react-copy-to-clipboard'

const CopyIcon = (props) => {
  return (
    <svg width="14px" height="18px" viewBox="0 0 14 18" className={style.icon}>
      <g stroke="none" fill-rule="nonzero" className={style.icon_copy_group}>
        <path d="M2,4 C1.44771525,4 1,4.44771525 1,5 L1,16 C1,16.5522847 1.44771525,17 2,17 L9,17 C9.55228475,17 10,16.5522847 10,16 L10,5 C10,4.44771525 9.55228475,4 9,4 L2,4 Z M2,3 L9,3 C10.1045695,3 11,3.8954305 11,5 L11,16 C11,17.1045695 10.1045695,18 9,18 L2,18 C0.8954305,18 1.3527075e-16,17.1045695 0,16 L0,5 C-1.3527075e-16,3.8954305 0.8954305,3 2,3 Z"></path>
        <path d="M12,15 L12,14 C12.5522847,14 13,13.5522847 13,13 L13,2 C13,1.44771525 12.5522847,1 12,1 L5,1 C4.44771525,1 4,1.44771525 4,2 L3,2 C3,0.8954305 3.8954305,2.02906125e-16 5,0 L12,0 C13.1045695,-2.02906125e-16 14,0.8954305 14,2 L14,13 C14,14.1045695 13.1045695,15 12,15 Z"></path>
      </g>
    </svg>
  )
}

const CopiedIcon = (props) => {
  return (
    <svg width="14px" height="18px" viewBox="0 0 14 18" className={style.icon}>
      <g stroke-width="2.2" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" className={style.icon_copied_group}>
        <polyline id="Path-3" points="2.5 10.5 7 14 11.5 4.5"></polyline>
      </g>
    </svg>
  )
}

class CopyButton extends Component {
  constructor() {
    super()
    this.onCopy = this.onCopy.bind(this)
    this.state = {
      copied: false
    }
    this.timeout = null
  }

  render() {
    const { value } = this.props
    const { copied } = this.state
    return (
      <CopyToClipboard text={value} onCopy={this.onCopy}>
        <button className={style.button}>
          <span className={style.text}>
            {copied ? (
              <FormattedMessage id="label_copy_done" />
            ) : (
              <FormattedMessage id="label_copy_action" />
            )}
          </span>
          {copied ? <CopiedIcon /> : <CopyIcon />}
        </button>
      </CopyToClipboard>
    )
  }

  onCopy(copiedText) {
    this.setState({ copied: true })
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.timeout = setTimeout(() => {
      this.setState({ copied: false })
      this.timeout = null
    }, 5000)
    navigator.clipboard.writeText(copiedText)
  }
}

export default CopyButton
