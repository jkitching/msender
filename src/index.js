let poly = require('preact-cli/lib/lib/webpack/polyfills')

import React, { Component } from 'react'
import habitat from 'preact-habitat'

import Widget from './components/msender'

let _habitat = habitat(Widget);

_habitat.render({
  selector: '[data-widget-host="habitat"]',
  clean: true
});
