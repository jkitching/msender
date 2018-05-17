import mailchimpSubscribe from './mailchimpSubscribe'
import { getPetitionUserData } from './withPetitionBindings'

const getBestPostalCode = (msender) => {
  // try to get postal code from petition
  const userData = getPetitionUserData()
  let postalCode = userData ? userData.postal_code : null
  if (!postalCode) {
    const depCode = msender.getDepartmentCode()
    if (depCode && depCode.length > 0) {
      return `${depCode}000`
    }
  }
  return null
}

const mailchimpMsenderSubscribe = (msender) => {
  const email = msender.get('email')
  const firstName = msender.getFirstName()
  const lastName = msender.getLastName()
  const postalCode = (getBestPostalCode(msender) || '')
  const source = msender.get('mailchimp_source')
  mailchimpSubscribe(email, firstName, lastName, postalCode, source).catch(error => {
    // NoOp
  })
}

export default mailchimpMsenderSubscribe
