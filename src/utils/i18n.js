import Immutable from 'immutable'

import { addLocaleData } from 'react-intl'
import deLocaleData from 'react-intl/locale-data/de'
import enLocaleData from 'react-intl/locale-data/en'
import esLocaleData from 'react-intl/locale-data/es'
import frLocaleData from 'react-intl/locale-data/fr'
import idLocaleData from 'react-intl/locale-data/id'
import itLocaleData from 'react-intl/locale-data/it'
import jaLocaleData from 'react-intl/locale-data/ja'
import koLocaleData from 'react-intl/locale-data/ko'
import msLocaleData from 'react-intl/locale-data/ms'
import nlLocaleData from 'react-intl/locale-data/nl'
import ptLocaleData from 'react-intl/locale-data/pt'
import thLocaleData from 'react-intl/locale-data/th'
import viLocaleData from 'react-intl/locale-data/vi'
import zhLocaleData from 'react-intl/locale-data/zh'

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
  addLocaleData(deLocaleData)
  addLocaleData(enLocaleData)
  addLocaleData(esLocaleData)
  addLocaleData(frLocaleData)
  addLocaleData(idLocaleData)
  addLocaleData(itLocaleData)
  addLocaleData(jaLocaleData)
  addLocaleData(koLocaleData)
  addLocaleData(msLocaleData)
  addLocaleData(nlLocaleData)
  addLocaleData(ptLocaleData)
  addLocaleData(thLocaleData)
  addLocaleData(viLocaleData)
  addLocaleData(zhLocaleData)
}
