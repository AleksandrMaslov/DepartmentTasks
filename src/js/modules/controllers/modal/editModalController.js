import onAccept from '../../actions/onAccept.js'
import onFinish from '../../actions/onFinish.js'
import dateTime from '../../utils/dateTime.js'
import TaskRowController from '../components/taskRowController.js'
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

    this.commentsLoader = this.modal.querySelector(`.comments__loader`)
    this.commentsDetails = this.modal.querySelector(`.comments__details`)
  }

  define() {
    this.defineClose()
  }

  show(event) {
    const times = ['adas', '100', 'asdad', '244']

    const row = new TaskRowController(event.srcElement)
    this.defineClickListeners(event)
    this.setWindowDescriptionByRow(row)
    this.setWindowKeyByRow(row)
    this.setProfileByRow(row)
    this.setTime(times)
    this.setComments()
    this.setAllDetailsClosed()
    this.modal.style.display = 'flex'

    this.setLoading(true)
    setTimeout(() => {
      this.setLoading(false)
    }, 2000)
  }

  setTime(times) {}

  setComments() {}

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

  defineClickListeners(event) {
    this.commentButton.onclick = () => new CommentModalController().show(event)
    this.finishButton.onclick = onFinish
    this.acceptButton.onclick = onAccept
  }
}
