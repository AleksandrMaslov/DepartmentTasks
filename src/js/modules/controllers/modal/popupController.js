export default class PopupController {
  POPUP_TIMEOUT = 2500
  WARNING_TITLE = 'Warning ⚠'
  DENIED_MESSAGE = 'Access Deined. Please try to check your login and password.'
  WELCOME_MESSAGE = 'We are glad to see you again.'

  constructor() {
    this.popupClass = 'popup'
    this.popupShowedClass = `${this.popupClass}_showed`
    this.popupCloseClass = `${this.popupClass}__close`
    this.popupTitleClass = `${this.popupClass}__title`
    this.popupContentClass = `${this.popupClass}__content`

    this.popup = document.querySelector(`.${this.popupClass}`)
    this.title = this.popup.querySelector(`.${this.popupTitleClass}`)
    this.content = this.popup.querySelector(`.${this.popupContentClass}`)
  }

  define() {
    this.defineClose()
  }

  defineClose() {
    const close = this.popup.querySelector(`.${this.popupCloseClass}`)
    close.onclick = () => (this.popup.style.right = '-320px')
  }

  showAccessDenied() {
    this.showWarning(this.DENIED_MESSAGE)
  }

  showWelcome() {
    this.show('Welcome!', this.WELCOME_MESSAGE)
  }

  showWarning(message) {}

  show(title, message) {
    this.title.innerHTML = title
    this.content.innerHTML = message
    this.popup.style.right = '20px'
    setTimeout(() => {
      this.popup.style.right = '-320px'
    }, this.POPUP_TIMEOUT)
  }
}
