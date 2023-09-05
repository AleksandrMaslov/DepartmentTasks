import TaskRowController from '../components/taskRowController.js'
import CommentModalController from './commentModalController.js'

export default class EditModalController {
  constructor() {
    this.modalClass = 'modal'
    this.modalCommentClass = `${this.modalClass}_edit`
    this.modalDescriptionClass = `${this.modalClass}__description`
    this.modalCloseClass = `${this.modalClass}__close`

    this.editClass = 'edit'
    this.commentButtonClass = `${this.editClass}__button_comment`

    this.modal = document.querySelector(`.${this.modalCommentClass}`)
    this.description = this.modal.querySelector(
      `.${this.modalDescriptionClass}`
    )
    this.close = this.modal.querySelector(`.${this.modalCloseClass}`)
    this.commentButton = this.modal.querySelector(`.${this.commentButtonClass}`)
  }

  define() {
    this.defineClose()
  }

  show(event) {
    const row = new TaskRowController(event.srcElement)
    const key = row.getKey()
    const number = row.getCellData('number')
    const name = row.getCellData('name')

    this.description.innerHTML = `${number} ${name}`

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
