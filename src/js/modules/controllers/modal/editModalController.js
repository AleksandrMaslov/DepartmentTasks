export default class EditModalController {
  constructor() {
    this.modalClass = 'modal'
    this.modalCommentClass = `${this.modalClass}_edit`
    this.modalCloseClass = `${this.modalClass}__close`

    this.modal = document.querySelector(`.${this.modalCommentClass}`)
    this.close = this.modal.querySelector(`.${this.modalCloseClass}`)
  }

  define() {
    this.defineClose()
  }

  show() {
    this.modal.style.display = 'flex'
  }

  defineClose() {
    this.close.onclick = () => (this.modal.style.display = 'none')
  }
}
