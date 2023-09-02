import LoginModalController from '../modal/loginModalController.js'
import onLogout from '../../actions/onLogout.js'

export default class AuthorizationController {
  constructor() {
    this.authorizationClass = 'authorization'
    this.loginClass = `${this.authorizationClass}__login`
    this.loggedinClass = `${this.authorizationClass}__loggedin`
    this.nameClass = `${this.authorizationClass}__name`
    this.avatarClass = `${this.authorizationClass}__avatar`
    this.logoutClass = `${this.authorizationClass}__logout`

    this.authorization = document.querySelector(`.${this.authorizationClass}`)
    this.login = this.authorization.querySelector(`.${this.loginClass}`)
    this.loggedin = this.authorization.querySelector(`.${this.loggedinClass}`)
    this.name = this.authorization.querySelector(`.${this.nameClass}`)
    this.avatar = this.authorization.querySelector(`.${this.avatarClass}`)
    this.logout = this.authorization.querySelector(`.${this.logoutClass}`)
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
    this.avatar.src = this.convertDriveImgUrl(avatar)
    this.name.innerHTML = name
    this.authorization.setAttribute('key', username)
  }

  convertDriveImgUrl(url) {
    if (!url.includes('drive.google.com')) return

    const id = url.split('/d/')[1].split('/view?')[0]
    return `https://drive.google.com/uc?id=${id}`
  }

  clearUserData() {
    this.avatar.src = ''
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
