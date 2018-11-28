let poly = require('preact-cli/lib/lib/webpack/polyfills')

import React, { Component } from 'react'

import MsenderContainer from './components/msender'

const renderContainer = (domElement, props) => {
  React.render(<MsenderContainer {...props} />, domElement)
}

window.msender = {
  renderContainer
}

// dispatch our custom event
const event = new Event('msenderReady')
window.dispatchEvent(event)
