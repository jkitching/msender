import Immutable from 'immutable'

import { addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import frLocaleData from 'react-intl/locale-data/fr'
import deLocaleData from 'react-intl/locale-data/de'
import esLocaleData from 'react-intl/locale-data/es'
import ptLocaleData from 'react-intl/locale-data/pt'
import itLocaleData from 'react-intl/locale-data/it'
import nlLocaleData from 'react-intl/locale-data/nl'

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

export const addAllLocalData = () => {
  // add local configs from React Intl
  addLocaleData(enLocaleData)
  addLocaleData(frLocaleData)
  addLocaleData(deLocaleData)
  addLocaleData(esLocaleData)
  addLocaleData(ptLocaleData)
  addLocaleData(itLocaleData)
  addLocaleData(nlLocaleData)
}
