import onAuthorize from './actions/onAuthorize.js'

export default function tryToAuthorize() {
  const hash = localStorage.getItem('hash')
  if (!hash) return
  onAuthorize(hash)
}
