import onLogin from '../../actions/onLogin.js'

export default class LoginModalController {
  EMAIL_VALID_MESSAGE = 'Wrong Email format.'
  PASSWORD_VALID_MESAGE = "Password can't be blank."
  LOADING_ATTRIBUTE = 'isLoading'
  LOADING_STATE = '1'

  constructor() {
    this.modal = document.querySelector('.modal_login')
    this.close = this.modal.querySelector('.modal__close')

    this.form = this.modal.querySelector('.login-form')
    this.email = this.form.querySelector('.login-form__email')
    this.button = this.form.querySelector('.login-form__button')
    this.password = this.form.querySelector('.login-form__password')
  }

  define() {
    this.defineClose()
    this.defineEmailValidation()
    this.definePasswordValidation()
    this.defineLoginAction()
  }

  show() {
    this.form.reset()
    this.modal.style.display = 'flex'
  }

  hide() {
    this.modal.style.display = 'none'
  }

  areInputsNotValid() {
    if (!this.email.validity.valid) return true
    if (!this.password.validity.valid) return true
    return false
  }

  setLoading(isLoading) {
    if (isLoading) {
      this.button.style.pointerEvents = 'none'
      this.form.setAttribute(this.LOADING_ATTRIBUTE, this.LOADING_STATE)
      return
    }

    this.form.reset()
    this.button.style.pointerEvents = 'auto'
    this.form.removeAttribute(this.LOADING_ATTRIBUTE)
  }

  getUserData() {
    return {
      login: this.email.value,
      password: this.password.value,
    }
  }

  defineClose() {
    this.close.onclick = () => (this.modal.style.display = 'none')
  }

  defineEmailValidation() {
    this.email.oninvalid = (e) =>
      e.target.setCustomValidity(this.EMAIL_VALID_MESSAGE)
    this.email.oninput = (e) => e.target.setCustomValidity('')
  }

  definePasswordValidation() {
    this.password.oninvalid = (e) =>
      e.target.setCustomValidity(this.PASSWORD_VALID_MESAGE)
    this.password.oninput = (e) => e.target.setCustomValidity('')
  }

  defineLoginAction() {
    this.button.onclick = onLogin
  }
}
