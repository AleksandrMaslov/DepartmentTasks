import PopupController from '../controllers/components/popupController.js'
import TaskListController from '../controllers/components/taskListController.js'
import TaskRowController from '../controllers/components/taskRowController.js'
import DatabaseController from '../controllers/database/databaseController.js'
import CommentModalController from '../controllers/modal/commentModalController.js'
import EditModalController from '../controllers/modal/editModalController.js'
import { isNotSuccess } from '../utils/responseValidation.js'

export default async function onSave() {
  const popup = new PopupController()
  const comment = new CommentModalController()

  const key = comment.getTaskKey()
  const hash = localStorage.getItem('hash')
  if (!hash) return popup.showUnauthorized()

  if (comment.areInputsNotValid()) return

  const commentData = comment.getData()
  const data = { key, parent: key, hash, ...commentData }

  comment.setLoading(true)
  const response = await new DatabaseController().addComment(data)
  comment.setLoading(false)

  if (isNotSuccess(response)) return popup.showServerError(response.error)

  const rowElement = new TaskListController().getRow(key)
  const row = new TaskRowController(rowElement)
  row.updateRowData(response.data)

  const edit = new EditModalController()
  if (edit.isShown()) edit.setProfileByData(response.data)

  popup.showCommentSaved()
}
