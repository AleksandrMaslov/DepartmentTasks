import PopupController from '../controllers/components/popupController.js'
import TaskListController from '../controllers/components/taskListController.js'
import TaskRowController from '../controllers/components/taskRowController.js'
import DatabaseController from '../controllers/database/databaseController.js'
import EditModalController from '../controllers/modal/editModalController.js'
import { isNotSuccess } from '../utils/responseValidation.js'

export default async function onAccept() {
  const edit = new EditModalController()
  const data = edit.getKeyHash()
  const { key, hash } = data

  const popup = new PopupController()
  if (!hash) return popup.showUnauthorized()

  edit.setAcceptLoading(true)
  const response = await new DatabaseController().setTaskAccepted(data)
  edit.setAcceptLoading(false)
  if (isNotSuccess(response)) return popup.showServerError(response.error)

  const rowElement = new TaskListController().getRow(key)
  const row = new TaskRowController(rowElement)
  row.updateRowData(response.data)
  edit.setProfileByData(response.data)

  if (response.data.isActive === row.STATE.BUSY) return popup.showBusy()
  popup.showTaskAccepted()
}
