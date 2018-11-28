let poly = require('preact-cli/lib/lib/webpack/polyfills')

import React, { Component } from 'react'
import habitat from 'preact-habitat'

import MsenderContainer from './components/msender'

// if there's a habitat found, use it
const habitatSelector = '[data-widget-host="habitat"]'
if (document.querySelector(habitatSelector)) {
  const _habitat = habitat(MsenderContainer)
  _habitat.render({
    selector: habitatSelector,
    clean: true,
  })  
}

const renderContainer = (domElement, props) => {
  React.render(<MsenderContainer {...props} />, domElement)
}

window.msender = {
  renderContainer
}

// dispatch our custom event
const event = new Event('msenderReady')
window.dispatchEvent(event)
