import urlEncode from './urlEncode'

const mailchimpSubscribe = (email, firstName = '', lastName = '', postalCode = '', source = 'msender') => {
  return new Promise((resolve, reject) => {
    if (!jQuery) {
      reject(new Error('Needs jQuery for MailChimp subscribe'))
      return
    }
    jQuery.ajax({
      type: 'GET',
      url: 'https://l214.us1.list-manage.com/subscribe/post-json?c=?',
      dataType: 'jsonp',
      data: {
        'u': 'd966ad21e6ae06dd7948a6c6d',
        'id': '2859894380',
        'b_d966ad21e6ae06dd7948a6c6d_2859894380': '',
        'subscribe': 'Subscribe',
        'EMAIL': email,
        'PRENOM': firstName,
        'NOM': lastName,
        'CP': postalCode,
        'SOURCE': source,
      },
      contentType: "application/json",
      success: (response) => {
        if (response.result === 'success') {
          resolve(response)
        } else {
          reject(new Error(response.msg))
        }
      },
      error: (error) => {
        reject(error)
      }
    })
  })
}

export default mailchimpSubscribe
