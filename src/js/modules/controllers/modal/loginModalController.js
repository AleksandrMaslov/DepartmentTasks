import onLogin from '../../actions/onLogin.js'

export default class LoginModalController {
  EMAIL_VALID_MESSAGE = 'Wrong Email format.'
  PASSWORD_VALID_MESAGE = "Password can't be blank."
  LOADING_ATTRIBUTE = 'isLoading'
  LOADING_STATE = '1'

  constructor() {
    this.modalClass = 'modal'
    this.modalLoginClass = `${this.modalClass}_login`
    this.modalCloseClass = `${this.modalClass}__close`
    this.formClass = 'login-form'
    this.formEmailClass = `${this.formClass}__email`
    this.formPasswordClass = `${this.formClass}__password`
    this.buttonClass = `${this.formClass}__button`

    this.modal = document.querySelector(`.${this.modalLoginClass}`)
    this.form = this.modal.querySelector(`.${this.formClass}`)
    this.close = this.modal.querySelector(`.${this.modalCloseClass}`)
    this.email = this.form.querySelector(`.${this.formEmailClass}`)
    this.password = this.form.querySelector(`.${this.formPasswordClass}`)
    this.button = this.form.querySelector(`.${this.buttonClass}`)
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
    if (this.email.validity.valid) return false
    if (this.password.validity.valid) return false
    return true
  }

  setLoading(isLoading) {
    if (isLoading)
      return this.form.setAttribute(this.LOADING_ATTRIBUTE, this.LOADING_STATE)
    this.form.reset()
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
