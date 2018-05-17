const urlEncode = (d) => {
  return Object.keys(d).map(k => {
    return `${encodeURIComponent(k)}=${encodeURIComponent(d[k])}`
  }).join('&')
}

export default urlEncode
