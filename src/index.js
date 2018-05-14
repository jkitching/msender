let poly = require('preact-cli/lib/lib/webpack/polyfills')

import { h } from 'preact'
import habitat from 'preact-habitat'

import Widget from './components/msender'

let _habitat = habitat(Widget);

(() => {
  let linkElement = document.createElement('link')
  linkElement.setAttribute('rel', 'stylesheet')
  linkElement.setAttribute('type', 'text/css')
  linkElement.setAttribute('href', 'https://fonts.googleapis.com/css?family=Montserrat:900')
})()

_habitat.render({
  selector: '[data-widget-host="habitat"]',
  clean: true
})
