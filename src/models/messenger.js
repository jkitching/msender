import Immutable, { Record } from 'immutable'

const urlEncode = (d) => {
  return Object.keys(d).map(k => {
    return `${encodeURIComponent(k)}=${encodeURIComponent(d[k])}`
  }).join('&')
}

export const MESSENGER_MODE_LINK = 'link'
export const MESSENGER_MODE_COPY = 'copy'
export const MESSENGER_MODE_NONE = 'none'

class Messenger extends Record({ // abstract
  identifier: null,
  name: null,
}) {
  getMode() {
    throw new Error('Abstract class')
  }
  getMailtoLink(msender) {
    throw new Error('Abstract class')
  }
}

//
// Link Mode
//

class MessengerMailto extends Record({
  identifier: null,
  name: null,
}) {
  getMode() {
    return MESSENGER_MODE_LINK
  }
  getMailtoLink(msender) {
    return `mailto:${encodeURIComponent(msender.getToEmailsString())}?` + urlEncode({
      cc: msender.getCcString(),
      bcc: msender.getBccString(),
      subject: msender.getSubject(),
      body: msender.getMessage(),
    })
  }
}

export class MessengerThunderbird extends MessengerMailto {
  constructor() {
    super({
      identifier: 'thunderbird',
      name: 'Thunderbird',
    })
  }
}

export class MessengerMacOSMail extends MessengerMailto {
  constructor() {
    super({
      identifier: 'macosmail',
      name: 'macOS Mail',
    })
  }
}

export class MessengerWindowsLiveMail extends MessengerMailto {
  constructor() {
    super({
      identifier: 'windowslivemail',
      name: 'Windows Live Mail',
    })
  }
}

export class MessengerGmail extends MessengerMailto {
  constructor() {
    super({
      identifier: 'gmail',
      name: 'Gmail',
    })
  }
  getMailtoLink(msender) {
    return 'https://mail.google.com/mail/u/0/?view=cm&fs=1&' + urlEncode({
      to: msender.getToString(),
      cc: msender.getCcString(),
      bcc: msender.getBccString(),
      su: msender.getSubject(),
      body: msender.getMessage(),
    })
  }
}

export class MessengerYahoo extends MessengerMailto {
  constructor() {
    super({
      identifier: 'yahoo',
      name: 'Yahoo',
    })
  }
  getMailtoLink(msender) {
    return 'http://compose.mail.yahoo.com/?' + urlEncode({
      to: msender.getToEmailsString(),
      cc: msender.getCcString(),
      bcc: msender.getBccString(),
      su: msender.getSubject(),
      body: msender.getMessage().replace(/\'/g, "′"),
    })
  }
}

//
// Copy Mode
//

class MessengerCopy extends MessengerMailto {
  getMode() {
    return MESSENGER_MODE_COPY
  }
}

export class MessengerOrange extends MessengerCopy {
  constructor() {
    super({
      identifier: 'orange',
      name: 'Orange',
    })
  }
  getMailtoLink() {
    return 'https://webmail1f.orange.fr/webmail/fr_FR/write.html'
  }
}

export class MessengerSFR extends MessengerCopy {
  constructor() {
    super({
      identifier: 'sfr',
      name: 'SFR',
    })
  }
  getMailtoLink() {
    return 'https://messagerie.sfr.fr/'
  }
}

export class MessengerLive extends MessengerCopy {
  constructor() {
    super({
      identifier: 'live',
      name: 'Live',
    })
  }
  getMailtoLink() {
    return 'https://login.live.com/fr'
  }
}

export class MessengerLaposte extends MessengerCopy {
  constructor() {
    super({
      identifier: 'laposte',
      name: 'Laposte.net',
    })
  }
  getMailtoLink() {
    return 'https://www.laposte.net/accueil'
  }
}

//
// Copy None
//

class MessengerNone extends MessengerMailto {
  constructor() {
    super({
      identifier: 'othernone',
      name: 'Autre',
    })
  }
  getMode() {
    return MESSENGER_MODE_NONE
  }
}

export const getMessengers = () => {
  return Immutable.List([
    new MessengerGmail(),
    new MessengerOrange(),
    new MessengerSFR(),
    new MessengerLive(),
    new MessengerYahoo(),
    new MessengerLaposte(),
    new MessengerThunderbird(),
    new MessengerMacOSMail(),
    new MessengerWindowsLiveMail(),
    new MessengerNone(),
  ])
}
