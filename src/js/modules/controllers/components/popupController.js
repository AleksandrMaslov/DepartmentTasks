export default class PopupController {
  POPUP_TIMEOUT = 2500
  WARNING_TITLE = 'Warning ⚠'
  SERVER_ERROR_MESSAGE = 'Houston, we have a problem.'
  DENIED_MESSAGE = 'Access Deined. Please try to check your login and password.'
  WELCOME_MESSAGE = 'We are glad to see you again.'
  GOODBYE_MESSAGE = 'See you next time, my friend.'
  UNAUTHORIZED_MESSAGE = 'User is not authorized.'
  BUSY_MESSAGE = 'Selected task is Busy with another user.'
  SAVED_MESSAGE = 'Your comments have been saved successfully.'
  FINISHED_MESSAGE = 'The Task has been marked as Finished.'
  ACCEPTED_MESSAGE = 'The Task has been marked as Accepted.'

  constructor() {
    this.popup = document.querySelector('.popup')
    this.close = this.popup.querySelector('.popup__close')
    this.title = this.popup.querySelector('.popup__title')
    this.content = this.popup.querySelector('.popup__content')
  }

  define() {
    this.defineClose()
  }

  showServerError(message = undefined) {
    if (!message) return this.showWarning(this.SERVER_ERROR_MESSAGE)
    this.showWarning(`${this.SERVER_ERROR_MESSAGE} ${message}`)
    console.log(message)
  }

  showAccessDenied() {
    this.showWarning(this.DENIED_MESSAGE)
  }

  showWelcome() {
    this.show('Welcome!', this.WELCOME_MESSAGE)
  }

  showGoodbye() {
    this.show('Goodbye!', this.GOODBYE_MESSAGE)
  }

  showUnauthorized() {
    this.showWarning(this.UNAUTHORIZED_MESSAGE)
  }

  showBusy() {
    this.showWarning(this.BUSY_MESSAGE)
  }

  showCommentSaved() {
    this.show('Done!', this.SAVED_MESSAGE)
  }

  showTaskFinished() {
    this.show('Finished!', this.FINISHED_MESSAGE)
  }

  showTaskAccepted() {
    this.show('Accepted!', this.ACCEPTED_MESSAGE)
  }

  showWarning(message) {
    this.show(this.WARNING_TITLE, message)
  }

  show(title, message) {
    this.title.innerHTML = title
    this.content.innerHTML = message
    this.popup.style.right = '20px'
    setTimeout(() => {
      this.popup.style.right = '-320px'
    }, this.POPUP_TIMEOUT)
  }

  defineClose() {
    this.close.onclick = () => (this.popup.style.right = '-320px')
  }
}
