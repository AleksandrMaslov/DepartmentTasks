import LoginModalController from '../modal/loginModalController.js'
import onLogout from '../../actions/onLogout.js'

export default class AuthorizationController {
  constructor() {
    this.authorization = document.querySelector(`.authorization`)
    this.name = this.authorization.querySelector(`.authorization__name`)
    this.avatar = this.authorization.querySelector(`.authorization__avatar`)
    this.login = this.authorization.querySelector(`.authorization__login`)
    this.loggedin = this.authorization.querySelector(`.authorization__loggedin`)
    this.logout = this.authorization.querySelector(`.authorization__logout`)
  }

  define() {
    this.defineLogin()
    this.defineLogout()
  }

  setAuthorized(isAuthorized) {
    if (isAuthorized) {
      this.loggedin.style.display = 'flex'
      this.login.style.display = 'none'
      return
    }

    this.loggedin.style.display = 'none'
    this.login.style.display = 'initial'
  }

  setUserData({ username, name, avatar }) {
    this.name.innerHTML = name
    this.authorization.setAttribute('key', username)
    if (!avatar)
      return (this.avatar.src = './img/authorization/authorization-avatar.png')
    this.avatar.src = this.convertDriveImgUrl(avatar)
  }

  convertDriveImgUrl(url) {
    if (!url.includes('drive.google.com')) return

    const id = url.split('/d/')[1].split('/view?')[0]
    return `https://drive.google.com/uc?id=${id}`
  }

  clearUserData() {
    this.avatar.src = './img/authorization/authorization-avatar.png'
    this.name.innerHTML = ''
    this.authorization.removeAttribute('key')
  }

  getKey() {
    return this.authorization.getAttribute('key')
  }

  defineLogin() {
    this.login.onclick = () => new LoginModalController().show()
  }

  defineLogout() {
    this.logout.onclick = onLogout
  }
}
