export default class LoginModalController {
  constructor() {
    this.modalClass = 'modal'
    this.modalCommentClass = `${this.modalClass}_login`
    this.modalCloseClass = `${this.modalClass}__close`

    this.modal = document.querySelector(`.${this.modalCommentClass}`)
  }

  define() {
    this.defineClose()
  }

  defineClose() {
    const close = this.modal.querySelector(`.${this.modalCloseClass}`)
    close.onclick = () => (this.modal.style.display = 'none')
  }
}
