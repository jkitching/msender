import Immutable from 'immutable'

import { addLocaleData } from 'react-intl'

import translations from '../translations'


export const getMessagesLocale = (msender = null) => {
  // get the browser's locale by default
  let locale = window.navigator.language

  // if there's a hash to indicate the language, use it
  // e.g. #msender-locale=fr-FR
  const m = window.location.hash.match(/^#msender-locale=([a-z\-]+)$/i)
  if (m) {
    locale = m[1]
  }

  // override translations if not available
  let allTranslations = Immutable.fromJS(translations)
  if (msender && msender.get('translations')) {
    allTranslations = allTranslations.mergeDeep(msender.get('translations'))
  }

  // if no translations found, fall back to English
  if (typeof allTranslations.get(locale.substr(0,2)) === 'undefined') {
    locale = 'en'
  }

  // if a locale is forced in the model, use it
  if (msender && msender.get('locale')) {
    locale = msender.get('locale')
  }

  // keep only language
  locale = locale.substr(0,2)

  // return the messages
  const messages = allTranslations.get(locale.substr(0,2)).toJS()
  return { locale, messages }
}
