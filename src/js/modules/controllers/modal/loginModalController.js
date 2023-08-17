import DatabaseController from '../databaseController.js'
import PopupController from './popupController.js'

export default class LoginModalController {
  constructor() {
    this.modalClass = 'modal'
    this.modalLoginClass = `${this.modalClass}_login`
    this.modalCloseClass = `${this.modalClass}__close`
    this.formClass = 'login-form'
    this.formEmailClass = `${this.formClass}__email`
    this.formPasswordClass = `${this.formClass}__password`
    this.buttonClass = `${this.formClass}__button`

    this.emailValidationMessage = 'Wrong Email format.'
    this.passwordValidationMessage = "Password can't be blank."
    this.deniedMessage =
      'Access Deined. Please try to check your login and password.'
    this.welcomeMessage = 'We are glad to see you again.'

    this.modal = document.querySelector(`.${this.modalLoginClass}`)
    this.form = this.modal.querySelector(`.${this.formClass}`)
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

  defineClose() {
    const close = this.modal.querySelector(`.${this.modalCloseClass}`)
    close.onclick = () => (this.modal.style.display = 'none')
  }

  defineEmailValidation() {
    this.email.oninvalid = (e) =>
      e.target.setCustomValidity(this.emailValidationMessage)
    this.email.oninput = (e) => e.target.setCustomValidity('')
  }

  definePasswordValidation() {
    this.password.oninvalid = (e) =>
      e.target.setCustomValidity(this.passwordValidationMessage)
    this.password.oninput = (e) => e.target.setCustomValidity('')
  }

  defineLoginAction() {
    this.button.onclick = async () => {
      if (!this.email.validity.valid) return
      if (!this.password.validity.valid) return
      this.form.setAttribute('isLoading', '1')

      const data = await new DatabaseController().login({
        login: this.email.value,
        password: this.password.value,
      })

      this.form.reset()
      this.form.removeAttribute('isLoading')
      const { result, report } = data
      const { status, hash } = report

      const popup = new PopupController()
      if (status === 'denied')
        return popup.show('Warning ⚠', this.deniedMessage)

      this.modal.style.display = 'none'
      popup.show('Welcome!', this.welcomeMessage)
    }
  }
}
