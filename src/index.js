let poly = require('preact-cli/lib/lib/webpack/polyfills')

import React, { Component } from 'react'
import habitat from 'preact-habitat'

import MsenderContainer from './components/msender'

const _habitat = habitat(MsenderContainer)

_habitat.render({
  selector: '[data-widget-host="habitat"]',
  clean: true,
})

document.addEventListener('copy', e => {
  const textContent = e.target.textContent;
  const filterText = 'CopyToClipboard\n';
  if (textContent.startsWith(filterText)) {
    e.clipboardData.setData('text/plain', textContent.replace(filterText, ''));
    e.preventDefault();
  }
});
