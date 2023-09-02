import CommentModalController from './commentModalController.js'

export default class EditModalController {
  constructor() {
    this.modalClass = 'modal'
    this.modalCommentClass = `${this.modalClass}_edit`
    this.modalCloseClass = `${this.modalClass}__close`

    this.editClass = 'edit'
    this.editButtonClass = `${this.editClass}__button`

    this.modal = document.querySelector(`.${this.modalCommentClass}`)
    this.close = this.modal.querySelector(`.${this.modalCloseClass}`)
    this.comment = this.modal.querySelector(`.${this.editButtonClass}`)
  }

  define() {
    this.defineClose()
  }

  showWithKey(key) {
    this.modal.setAttribute('key', key)
    this.modal.style.display = 'flex'

    this.comment.onclick = () => {
      new CommentModalController().showWithKey(key)
    }
  }

  getTaskKey() {
    return this.modal.getAttribute('key')
  }

  defineClose() {
    this.close.onclick = () => (this.modal.style.display = 'none')
  }
}
