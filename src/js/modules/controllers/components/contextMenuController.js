import { isNotSuccess } from '../../utils/responseValidation.js'
import DatabaseController from '../database/databaseController.js'
import EditModelController from '../modal/editModalController.js'
import CommentsTreeController from './commentsTreeController.js'
import PopupController from './popupController.js'
import TaskListController from './taskListController.js'
import TaskRowController from './taskRowController.js'

export default class ContextMenuController {
  constructor(comment) {
    this.context = document.querySelector('.context')
    this.edit = this.context.querySelector('.context__item_edit')
    this.open = this.context.querySelector('.context__item_open')
    this.close = this.context.querySelector('.context__item_close')
    this.reply = this.context.querySelector('.context__item_reply')

    if (!comment) return
    this.comment = comment
    this.isActive = !!+this.comment.getAttribute('isActive')
    this.key = this.comment.getAttribute('key')
  }

  define() {
    document.addEventListener('click', this.hide)
  }

  show(x, y) {
    this.open.onclick = this.onSwitchState
    this.close.onclick = this.onSwitchState
    this.edit.onclick = this.onEdit
    this.reply.onclick = this.onReply

    if (this.isActive) {
      this.open.setAttribute('disabled', '')
      this.close.removeAttribute('disabled')
    } else {
      this.open.removeAttribute('disabled')
      this.close.setAttribute('disabled', '')
    }

    this.context.style.left = `${x}px`
    this.context.style.top = `${y}px`

    this.context.style.opacity = '0'
    this.context.style.display = 'block'
    this.context.style.opacity = '1'
  }

  hide = () => {
    this.context.style.opacity = '0'
    this.context.style.display = 'none'
  }

  onSwitchState = () => {
    const hash = localStorage.getItem('hash')
    const edit = new EditModelController()
    edit.setCommentsLoading(true)
    edit.setButtonsNotEnabled(true)

    new DatabaseController()
      .swithCommentState({
        key: this.key,
        hash,
      })
      .then((response) => {
        if (isNotSuccess(response))
          return new PopupController().showServerError(response.error)

        const { comment, task } = response.data
        new CommentsTreeController().updateCommentData(this.key, comment)

        const rowElement = new TaskListController().getRow(comment.key)
        new TaskRowController(rowElement).updateRowData(task)

        edit.setCommentsLoading(false)
        edit.setButtonsNotEnabled(false)
      })
  }

  onEdit = () => {
    console.log(this.key)
  }

  onReply = () => {
    console.log(this.key)
  }
}
