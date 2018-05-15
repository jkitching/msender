let poly = require('preact-cli/lib/lib/webpack/polyfills')

import React, { Component } from 'react'
import habitat from 'preact-habitat'

import Widget from './components/msender'

let _habitat = habitat(Widget);

(() => {
  let linkElement = document.createElement('link')
  linkElement.setAttribute('rel', 'stylesheet')
  linkElement.setAttribute('type', 'text/css')
  linkElement.setAttribute('href', 'https://fonts.googleapis.com/css?family=Montserrat:900')
  document.head.appendChild(linkElement)
})();

setTimeout(() => {
  jQuery(document).trigger('petition:didSucceed', {
    postData: {
      first_name: 'Micha',
      last_name: 'Mazaheri',
      email: 'micha@mazaheri.me',
      city: 'Paris',
      postal_code: '75015',
      country_code: 'FR',
      newsletter: true
    }
  })
}, 1500);

_habitat.render({
  selector: '[data-widget-host="habitat"]',
  clean: true
});
