import onAccept from '../../actions/onAccept.js'
import onFinish from '../../actions/onFinish.js'
import dateTime from '../../utils/dateTime.js'
import { isNotSuccess } from '../../utils/responseValidation.js'
import CommentsTreeController from '../components/commentsTreeController.js'
import PopupController from '../components/popupController.js'
import TaskRowController from '../components/taskRowController.js'
import DatabaseController from '../database/databaseController.js'
import CommentModalController from './commentModalController.js'

export default class EditModalController {
  constructor() {
    this.modal = document.querySelector(`.modal_edit`)
    this.close = this.modal.querySelector(`.modal__close`)
    this.description = this.modal.querySelector(`.modal__description`)

    this.state = this.modal.querySelector(`.edit__state`)
    this.editor = this.modal.querySelector(`.edit__editor`)
    this.edited = this.modal.querySelector(`.edit__edited`)
    this.responsible = this.modal.querySelector(`.edit__responsible`)
    this.finishButton = this.modal.querySelector(`.edit__button_finish`)
    this.finishLoader = this.modal.querySelector(`.edit__loader_finish`)
    this.acceptButton = this.modal.querySelector(`.edit__button_accept`)
    this.acceptLoader = this.modal.querySelector(`.edit__loader_accept`)
    this.commentButton = this.modal.querySelector(`.edit__button_comment`)

    this.time = this.modal.querySelector(`.time`)
    this.timeTotal = this.modal.querySelector(`.time__total`)
    this.timeLoader = this.modal.querySelector(`.time__loader`)
    this.timeGrid = this.modal.querySelector(`.time__grid`)

    this.commentsLoader = this.modal.querySelector(`.comments__loader`)
    this.commentsDetails = this.modal.querySelector(`.comments__details`)
  }

  define() {
    this.defineClose()
  }

  show(event) {
    this.setLoading(true)
    this.defineClickListeners(event)
    const row = new TaskRowController(event.srcElement)
    this.setWindowDescriptionByRow(row)
    this.setWindowKeyByRow(row)
    this.setProfileByRow(row)
    this.setAllDetailsClosed()
    this.getTimeCommentsData()
    this.modal.style.display = 'flex'
  }

  hide() {
    this.modal.style.display = 'none'
  }

  getTimeCommentsData() {
    const { key } = this.getKeyHash()
    new DatabaseController().getTimeCommentsData({ key }).then((response) => {
      if (!this.isShown()) return

      const isTaskStillOpened = key == this.getKeyHash().key
      if (!isTaskStillOpened) return

      if (isNotSuccess(response))
        return new PopupController().showServerError(response.error)
      const { time, comments } = response.data

      if (time) {
        this.setTime(time)
        this.setTimeLoading(false)
      }

      if (comments) {
        this.setComments(comments)
        this.setCommentsLoading(false)
      }
    })
  }

  setTime(timeData) {
    const { total, data } = timeData
    this.timeTotal.innerHTML = total ? total : 0
    this.timeGrid.innerHTML = data
      ? data.map((time) => `<p>${time}</p>`).join('')
      : ['Current task', 'is not started']
          .map((text) => `<p>${text}</p>`)
          .join('')
  }

  setComments(commentsData) {
    const comments = new CommentsTreeController()
  }

  isShown() {
    return this.modal.style.display !== 'none'
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
      this.commentsLoader.style.display = 'block'
      if (!this.commentsDetails) return
      this.commentsDetails.style.pointerEvents = 'none'
      this.commentsDetails.style.opacity = '0'
      return
    }

    this.commentsLoader.style.display = 'none'
    if (!this.commentsDetails) return
    this.commentsDetails.style.opacity = '1'
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
    this.close.onclick = () => this.hide()
  }

  defineClickListeners(event) {
    this.commentButton.onclick = () => new CommentModalController().show(event)
    this.finishButton.onclick = onFinish
    this.acceptButton.onclick = onAccept
  }
}
