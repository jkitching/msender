const isEmailValid = (email) => {
  if ('string' !== typeof email) {
    return false
  }
  return !!email.match(/([^@]+)@([^\.]+\..{2,})/)
}

export default isEmailValid
