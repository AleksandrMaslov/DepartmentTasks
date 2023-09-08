import TaskRowController from '../components/taskRowController.js'
import CommentModalController from './commentModalController.js'

export default class EditModalController {
  constructor() {
    this.modalClass = 'modal'
    this.modalCommentClass = `${this.modalClass}_edit`
    this.modalDescriptionClass = `${this.modalClass}__description`
    this.modalCloseClass = `${this.modalClass}__close`

    this.editClass = 'edit'
    this.stateClass = `${this.editClass}__state`
    this.responsibleClass = `${this.editClass}__responsible`
    this.editorClass = `${this.editClass}__editor`
    this.editedClass = `${this.editClass}__edited`
    this.commentButtonClass = `${this.editClass}__button_comment`

    this.modal = document.querySelector(`.${this.modalCommentClass}`)
    this.description = this.modal.querySelector(
      `.${this.modalDescriptionClass}`
    )
    this.close = this.modal.querySelector(`.${this.modalCloseClass}`)
    this.state = this.modal.querySelector(`.${this.stateClass}`)
    this.responsible = this.modal.querySelector(`.${this.responsibleClass}`)
    this.editor = this.modal.querySelector(`.${this.editorClass}`)
    this.edited = this.modal.querySelector(`.${this.editedClass}`)
    this.commentButton = this.modal.querySelector(`.${this.commentButtonClass}`)
  }

  define() {
    this.defineClose()
  }

  show(event) {
    const row = new TaskRowController(event.srcElement)
    this.setWindowDescriptionByRow(row)
    this.setWindowKeyByRow(row)
    this.setProfileByRow(row)
    this.defineCommentClick(event)
    this.modal.style.display = 'flex'
  }

  setProfileByRow(row) {
    this.responsible.innerHTML = row.getCellData('responsible')
    this.editor.innerHTML = row.getCellData('editor')
    this.edited.innerHTML = row.getCellData('edited')
    this.state.innerHTML =
      row.getStateData(row.HEADER_IS_ACTIVE) === row.STATE.ACTIVE
        ? 'ACTIVE'
        : 'NOT ACTIVE'
  }

  setWindowDescriptionByRow(row) {
    const number = row.getCellData('number')
    const name = row.getCellData('name')
    this.description.innerHTML = `${number} ${name}`
  }

  setWindowKeyByRow(row) {
    const key = row.getKey()
    this.modal.setAttribute('key', key)
  }

  defineCommentClick(event) {
    this.commentButton.onclick = () => new CommentModalController().show(event)
  }

  getTaskKey() {
    return this.modal.getAttribute('key')
  }

  defineClose() {
    this.close.onclick = () => (this.modal.style.display = 'none')
  }
}
