import { Repeat } from 'immutable'
import Msender, { FILTER_RECIPIENT_ALL } from '../msender'
import { MessengerMailto,
         MessengerGmail,
         MessengerYahoo } from '../../models/messenger'
import { makeRecipientList } from '../recipient'


describe('MessengerMailto.getMailtoLink', () => {
  test('mailto', () => {
    const msender = new Msender({
      message_to: makeRecipientList([
        {
          "organization": "Target",
          "email": "person@target.com",
          "format": "org",
        }
      ]),
      message_cc: makeRecipientList(),
      message_bcc: makeRecipientList(),
      message_subject: 'Test subject',
      message_text: 'Test text',
      filter_recipient: FILTER_RECIPIENT_ALL,
    })
    const messenger = new MessengerMailto()
    const link = messenger.getMailtoLink(msender)
    expect(link).toEqual('mailto:person%40target.com?cc=&bcc=&subject=Test%20subject&body=Test%20text')
  })
  test('mailto (with limit)', () => {
    const maxChars = 2000
    const msender = new Msender({
      message_to: makeRecipientList(Repeat({
        "organization": "Target",
        "email": "person@target.com",
        "format": "org",
      }, 100)),
      message_cc: makeRecipientList(),
      message_bcc: makeRecipientList(),
      message_subject: 'Test subject',
      message_text: 'Test text',
      max_chars: maxChars,
      filter_recipient: FILTER_RECIPIENT_ALL,
    })
    const messenger = new MessengerMailto()
    const link = messenger.getMailtoLink(msender)
    expect(link.length).toBeLessThanOrEqual(maxChars, 'must be less than (or equal to) the limit')
    expect(link.length).toBeGreaterThan(maxChars * 0.8, 'must be greater than ~80% of the limit')
    const emails = Repeat('person%40target.com', 88).join('%2C')
    expect(link).toEqual(`mailto:${emails}?cc=&bcc=&subject=Test%20subject&body=Test%20text`)
  })
})


describe('MessengerGmail.getMailtoLink', () => {
  test('mailto', () => {
    const msender = new Msender({
      message_to: makeRecipientList([
        {
          "organization": "Target",
          "email": "person@target.com",
          "format": "org",
        }
      ]),
      message_cc: makeRecipientList(),
      message_bcc: makeRecipientList(),
      message_subject: 'Test subject',
      message_text: 'Test text',
      filter_recipient: FILTER_RECIPIENT_ALL,
    })
    const messenger = new MessengerGmail()
    const link = messenger.getMailtoLink(msender)
    expect(link).toEqual('https://mail.google.com/mail/u/0/?view=cm&fs=1&to=Target%20%3Cperson%40target.com%3E&cc=&bcc=&su=Test%20subject&body=Test%20text')
  })
  test('mailto (with limit)', () => {
    const maxChars = 2000
    const msender = new Msender({
      message_to: makeRecipientList(Repeat({
        "organization": "Target",
        "email": "person@target.com",
        "format": "org",
      }, 100)),
      message_cc: makeRecipientList(),
      message_bcc: makeRecipientList(),
      message_subject: 'Test subject',
      message_text: 'Test text',
      max_chars: maxChars,
      filter_recipient: FILTER_RECIPIENT_ALL,
    })
    const messenger = new MessengerGmail()
    const link = messenger.getMailtoLink(msender)
    expect(link.length).toBeLessThanOrEqual(maxChars, 'must be less than (or equal to) the limit')
    expect(link.length).toBeGreaterThan(maxChars * 0.8, 'must be greater than ~80% of the limit')
    const emails = Repeat('person%40target.com', 86).join('%2C')
    expect(link).toEqual(`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${emails}&cc=&bcc=&su=Test%20subject&body=Test%20text`)
  })
})


describe('MessengerYahoo.getMailtoLink', () => {
  test('mailto', () => {
    const msender = new Msender({
      message_to: makeRecipientList([
        {
          "organization": "Target",
          "email": "person@target.com",
          "format": "org",
        }
      ]),
      message_cc: makeRecipientList(),
      message_bcc: makeRecipientList(),
      message_subject: 'Test subject',
      message_text: 'Test text',
      filter_recipient: FILTER_RECIPIENT_ALL,
    })
    const messenger = new MessengerYahoo()
    const link = messenger.getMailtoLink(msender)
    expect(link).toEqual('http://compose.mail.yahoo.com/?to=person%40target.com&cc=&bcc=&su=Test%20subject&body=Test%20text')
  })
  test('mailto (with limit)', () => {
    const maxChars = 2000
    const msender = new Msender({
      message_to: makeRecipientList(Repeat({
        "organization": "Target",
        "email": "person@target.com",
        "format": "org",
      }, 100)),
      message_cc: makeRecipientList(),
      message_bcc: makeRecipientList(),
      message_subject: 'Test subject',
      message_text: 'Test text',
      max_chars: maxChars,
      filter_recipient: FILTER_RECIPIENT_ALL,
    })
    const messenger = new MessengerYahoo()
    const link = messenger.getMailtoLink(msender)
    expect(link.length).toBeLessThanOrEqual(maxChars, 'must be less than (or equal to) the limit')
    expect(link.length).toBeGreaterThan(maxChars * 0.8, 'must be greater than ~80% of the limit')
    const emails = Repeat('person%40target.com', 87).join('%2C')
    expect(link).toEqual(`http://compose.mail.yahoo.com/?to=${emails}&cc=&bcc=&su=Test%20subject&body=Test%20text`)
  })
})
