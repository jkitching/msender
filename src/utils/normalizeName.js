import toUpperCaseFirst from './toUpperCaseFirst'

const normalizeName = (str) => {
  if ('string' !== typeof str || str.length === 0) {
    return str
  }
  return str.trim()
            .split(/\s+/)
            .map(s => toUpperCaseFirst(s))
            .join(' ')
}

export default normalizeName
