import TaskRowController from '../components/taskRowController.js'
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
    this.commentButton = this.modal.querySelector(`.${this.editButtonClass}`)
  }

  define() {
    this.defineClose()
  }

  show(event) {
    const key = new TaskRowController(event.srcElement).getKey()
    this.modal.setAttribute('key', key)
    this.modal.style.display = 'flex'

    this.commentButton.onclick = () => {
      new CommentModalController().show(event)
    }
  }

  getTaskKey() {
    return this.modal.getAttribute('key')
  }

  defineClose() {
    this.close.onclick = () => (this.modal.style.display = 'none')
  }
}
