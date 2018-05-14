import {
  MessengerGmail,
  MessengerYahoo,
  MessengerOrange,
  MessengerSFR,
  MessengerLive,
  MessengerLaposte
} from '../models/messenger'


// Query domain DNS (type MX fields) to check if hostname uses Google Mail (G Suite)
const hostnameUsesGoogleMail = hostname => {
  const url = 'https://dns.google.com/resolve?name=' + encodeURIComponent(hostname) +'&type=MX'
  return fetch(url).then(res => res.json()).then(d => {
    if (d.Status !== 0 || !d.Answer) {
      return false
    }
    return d.Answer.reduce((acc, val) => {
      return acc || (val.data.indexOf('google.com.') >= 0 || val.data.indexOf('googlemail.com.') >= 0)
    }, false)
  })
}


// Detects which email messenger is used for the email
const detectEmailMessenger = (email) => {
  return new Promise((resolve, reject) => {
    const m = email.match(/([^@]+)@([^\.]+\..{2,})/)
    if (!m) {
      reject(new Error('Invalid email address'))
      return
    }
    const hostname = m[2]
    switch (hostname) {
      case 'gmail.com':
        resolve(new MessengerGmail())
        break
      case 'yahoo.com':
      case 'yahoo.fr':
        resolve(new MessengerYahoo())
        break
      case 'orange.fr':
      case 'wanadoo.fr':
        resolve(new MessengerOrange())
        break
      case 'sfr.fr':
        resolve(new MessengerSFR())
        break
      case 'live.com':
      case 'live.fr':
      case 'hotmail.com':
      case 'hotmail.fr':
      case 'msn.com':
        resolve(new MessengerLive())
        break
      case 'laposte.net':
        resolve(new MessengerLaposte())
        break
      default:
        hostnameUsesGoogleMail(hostname).then(usesGoogleMail => {
          if (usesGoogleMail) {
            resolve(new MessengerGmail())
          }
          resolve(null)
        })
    }
  })
}

export default detectEmailMessenger
