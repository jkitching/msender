const toUpperCaseFirst = (str) => {
  if ('string' !== typeof str || str.length === 0) {
    return str
  }
  return str[0].toUpperCase() + str.substr(1).toLowerCase()
}

export default toUpperCaseFirst
