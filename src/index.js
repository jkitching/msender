let poly = require('preact-cli/lib/lib/webpack/polyfills')

import React, { Component } from 'react'
import habitat from 'preact-habitat'

import MsenderContainer from './components/msender'

const _habitat = habitat(MsenderContainer)

_habitat.render({
  selector: '[data-widget-host="habitat"]',
  clean: true,
})
