import React from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import frLocaleData from 'react-intl/locale-data/fr'

import { getMessagesLocale } from '../utils/i18n'


// add local configs from React Intl
addLocaleData(enLocaleData)
addLocaleData(frLocaleData)

const style = {
  backgroundColor: '#EB9339',
  padding: '20px',
  borderRadius: '10px'
}

export const StoryDecorator = (props) => {
  const s = Object.assign({}, style, props.style)
  return (
    <div style={s}>
      {props.children}
    </div>
  )
}

export const decoratorFn = props => story => (
  <StoryDecorator {...props}>
    {story()}
  </StoryDecorator>
)

export const decoratorIntlFn = props => story => {
  const { locale, messages } = getMessagesLocale()
  return (
    <IntlProvider
      locale={locale}
      messages={messages}
    >
      {story()}
    </IntlProvider>
  )
}
