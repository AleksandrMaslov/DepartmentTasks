import TaskRowController from '../components/taskRowController.js'
import CommentModalController from './commentModalController.js'

export default class EditModalController {
  constructor() {
    this.modalClass = 'modal'
    this.modalCommentClass = `${this.modalClass}_edit`
    this.modalDescriptionClass = `${this.modalClass}__description`
    this.modalCloseClass = `${this.modalClass}__close`

    this.editClass = 'edit'
    this.timeClass = 'time'
    this.commentsClass = 'comments'
    this.stateClass = `${this.editClass}__state`
    this.responsibleClass = `${this.editClass}__responsible`
    this.editorClass = `${this.editClass}__editor`
    this.editedClass = `${this.editClass}__edited`
    this.timeLoaderClass = `${this.timeClass}__loader`
    this.timeTotalClass = `${this.timeClass}__total`
    this.commentsLoaderClass = `${this.commentsClass}__loader`
    this.commentsDetailsClass = `${this.commentsClass}__details`
    this.commentButtonClass = `${this.editClass}__button_comment`
    this.finishButtonClass = `${this.editClass}__button_finish`
    this.acceptButtonClass = `${this.editClass}__button_accept`

    this.modal = document.querySelector(`.${this.modalCommentClass}`)
    this.description = this.modal.querySelector(
      `.${this.modalDescriptionClass}`
    )
    this.close = this.modal.querySelector(`.${this.modalCloseClass}`)
    this.state = this.modal.querySelector(`.${this.stateClass}`)
    this.responsible = this.modal.querySelector(`.${this.responsibleClass}`)
    this.editor = this.modal.querySelector(`.${this.editorClass}`)
    this.edited = this.modal.querySelector(`.${this.editedClass}`)
    this.time = this.modal.querySelector(`.${this.timeClass}`)
    this.timeLoader = this.modal.querySelector(`.${this.timeLoaderClass}`)
    this.timeTotal = this.modal.querySelector(`.${this.timeTotalClass}`)
    this.commentsLoader = this.modal.querySelector(
      `.${this.commentsLoaderClass}`
    )
    this.commentsDetails = this.modal.querySelector(
      `.${this.commentsDetailsClass}`
    )
    this.commentButton = this.modal.querySelector(`.${this.commentButtonClass}`)
    this.finishButton = this.modal.querySelector(`.${this.finishButtonClass}`)
    this.acceptButton = this.modal.querySelector(`.${this.acceptButtonClass}`)
  }

  define() {
    this.defineClose()
  }

  show(event) {
    const row = new TaskRowController(event.srcElement)
    this.setWindowDescriptionByRow(row)
    this.setWindowKeyByRow(row)
    this.setProfileByRow(row)
    this.setAllDetailsClosed()
    this.defineCommentClick(event)
    this.modal.style.display = 'flex'

    this.setLoading(true)
    this.setLoading(false)
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

  setAllDetailsClosed() {
    const details = this.modal.getElementsByTagName('details')
    Array.from(details).forEach((detail) => (detail.open = false))
  }

  defineCommentClick(event) {
    this.commentButton.onclick = () => new CommentModalController().show(event)
  }

  setLoading(isLoading) {
    if (isLoading) {
      this.timeTotal.style.display = 'none'
      this.timeLoader.style.display = 'flex'
      this.commentsDetails.style.display = 'none'
      this.commentsLoader.style.display = 'block'

      this.time.style.pointerEvents = 'none'
      this.commentButton.style.pointerEvents = 'none'
      this.acceptButton.style.pointerEvents = 'none'
      this.finishButton.style.pointerEvents = 'none'
      return
    }

    this.timeTotal.style.display = 'initial'
    this.timeLoader.style.display = 'none'
    this.commentsDetails.style.display = 'initial'
    this.commentsLoader.style.display = 'none'

    this.time.style.pointerEvents = 'auto'
    this.commentButton.style.pointerEvents = 'auto'
    this.acceptButton.style.pointerEvents = 'auto'
    this.finishButton.style.pointerEvents = 'auto'
  }

  getTaskKey() {
    return this.modal.getAttribute('key')
  }

  defineClose() {
    this.close.onclick = () => (this.modal.style.display = 'none')
  }
}
