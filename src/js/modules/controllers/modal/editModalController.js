import dateTime from '../../utils/dateTime.js'
import { isNotSuccess } from '../../utils/responseValidation.js'
import PopupController from '../components/popupController.js'
import TaskListController from '../components/taskListController.js'
import TaskRowController from '../components/taskRowController.js'
import DatabaseController from '../database/databaseController.js'
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
    this.loaderFinishClass = `${this.editClass}__loader_finish`
    this.loaderAcceptClass = `${this.editClass}__loader_accept`

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
    this.finishLoader = this.modal.querySelector(`.${this.loaderFinishClass}`)
    this.acceptButton = this.modal.querySelector(`.${this.acceptButtonClass}`)
    this.acceptLoader = this.modal.querySelector(`.${this.loaderAcceptClass}`)
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
    this.defineClickListeners(event)
    this.modal.style.display = 'flex'

    this.setLoading(true)
    setTimeout(() => {
      this.setLoading(false)
    }, 2000)
  }

  setProfileByRow(row) {
    const data = {
      responsible: row.getCellData('responsible'),
      editor: row.getCellData('editor'),
      edited: row.getCellData('edited'),
      isActive: row.getStateData(row.HEADERS.IS_ACTIVE),
      isFinished: row.getStateData(row.HEADERS.IS_FINISHED),
      isAccepted: row.getStateData(row.HEADERS.IS_ACCEPTED),
      isWrong: row.getStateData(row.HEADERS.IS_WRONG),
    }

    this.setProfileByData(data)
  }

  setProfileByData(data) {
    const {
      responsible,
      editor,
      edited,
      isActive,
      isFinished,
      isAccepted,
      isWrong,
    } = data

    this.editor.innerHTML = editor
    this.edited.innerHTML = edited.includes('-') ? edited : dateTime(edited)
    this.responsible.innerHTML = responsible
    if (isActive === 'x') return (this.state.innerHTML = 'BUSY')
    if (!!+isAccepted) return (this.state.innerHTML = 'ACCEPTED')
    if (!!+isWrong) return (this.state.innerHTML = 'TO BE FIXED')
    if (!!+isFinished) return (this.state.innerHTML = 'FINISHED')
    if (!!+isActive) return (this.state.innerHTML = 'ACTIVE')
    this.state.innerHTML = 'NOT ACTIVE'
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

  defineClickListeners(event) {
    this.commentButton.onclick = () => new CommentModalController().show(event)
    this.finishButton.onclick = async () => this.onFinishClick()
    this.acceptButton.onclick = async () => this.onAcceptClick()
  }

  async onFinishClick() {
    const data = this.getKeyHash()
    const { key, hash } = data

    const popup = new PopupController()
    if (!hash) return popup.showUnauthorized()

    this.setFinishLoading(true)
    const response = await new DatabaseController().setFinished(data)
    this.setFinishLoading(false)
    if (isNotSuccess(response)) return popup.showServerError(response.error)

    const rowElement = new TaskListController().getRow(key)
    const row = new TaskRowController(rowElement)
    row.updateRowData(response.data)
    this.setProfileByData(response.data)
    if (response.data.isActive === row.STATE.BUSY) return popup.showBusy()
    popup.showTaskFinished()
  }

  async onAcceptClick() {
    const data = this.getKeyHash()
    const { key, hash } = data

    const popup = new PopupController()
    if (!hash) return popup.showUnauthorized()

    this.setAcceptLoading(true)
    const response = await new DatabaseController().setAccepted(data)
    this.setAcceptLoading(false)
    if (isNotSuccess(response)) return popup.showServerError(response.error)

    const rowElement = new TaskListController().getRow(key)
    const row = new TaskRowController(rowElement)
    row.updateRowData(response.data)
    this.setProfileByData(response.data)
    if (response.data.isActive === row.STATE.BUSY) return popup.showBusy()
    popup.showTaskAccepted()
  }

  setFinishLoading(isLoading) {
    this.setButtonsNotEnabled(isLoading)

    if (isLoading) {
      this.finishLoader.style.display = 'block'
      this.finishButton.style.color = 'transparent'
      return
    }

    this.finishLoader.style.display = 'none'
    this.finishButton.style.color = 'initial'
  }

  setAcceptLoading(isLoading) {
    this.setButtonsNotEnabled(isLoading)

    if (isLoading) {
      this.acceptLoader.style.display = 'block'
      this.acceptButton.style.color = 'transparent'
      return
    }

    this.acceptLoader.style.display = 'none'
    this.acceptButton.style.color = 'initial'
  }

  setLoading(isLoading) {
    this.setTimeLoading(isLoading)
    this.setCommentsLoading(isLoading)
    this.setButtonsNotEnabled(isLoading)
  }

  setTimeLoading(isLoading) {
    if (isLoading) {
      this.time.style.pointerEvents = 'none'
      this.timeTotal.style.opacity = '0'
      this.timeLoader.style.display = 'flex'
      return
    }

    this.timeTotal.style.opacity = '1'
    this.timeLoader.style.display = 'none'
    this.time.style.pointerEvents = 'auto'
  }

  setCommentsLoading(isLoading) {
    if (isLoading) {
      this.commentsDetails.style.pointerEvents = 'none'
      this.commentsDetails.style.opacity = '0'
      this.commentsLoader.style.display = 'block'
      return
    }

    this.commentsDetails.style.opacity = '1'
    this.commentsLoader.style.display = 'none'
    this.commentsDetails.style.pointerEvents = 'auto'
  }

  setButtonsNotEnabled(isNotEnabled) {
    if (isNotEnabled) {
      this.commentButton.style.pointerEvents = 'none'
      this.acceptButton.style.pointerEvents = 'none'
      this.finishButton.style.pointerEvents = 'none'
      return
    }

    this.commentButton.style.pointerEvents = 'auto'
    this.acceptButton.style.pointerEvents = 'auto'
    this.finishButton.style.pointerEvents = 'auto'
  }

  getKeyHash() {
    const key = this.modal.getAttribute('key')
    const hash = localStorage.getItem('hash')
    return { key, hash }
  }

  defineClose() {
    this.close.onclick = () => (this.modal.style.display = 'none')
  }
}
