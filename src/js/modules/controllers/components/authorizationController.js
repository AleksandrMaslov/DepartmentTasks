import LoginModalController from '../modal/loginModalController.js'
import onLogout from '../../actions/onLogout.js'

export default class AuthorizationController {
  constructor() {
    this.authorizationClass = 'authorization'
    this.loginClass = `${this.authorizationClass}__login`
    this.loggedinClass = `${this.authorizationClass}__loggedin`
    this.logoutClass = `${this.authorizationClass}__logout`

    this.authorization = document.querySelector(`.${this.authorizationClass}`)
    this.login = this.authorization.querySelector(`.${this.loginClass}`)
    this.loggedin = this.authorization.querySelector(`.${this.loggedinClass}`)
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

  defineLogin() {
    this.login.onclick = () => new LoginModalController().show()
  }

  defineLogout() {
    this.logout.onclick = onLogout
  }
}
