import DatabaseController from '../controllers/database/databaseController.js'
import TaskRowController from '../controllers/components/taskRowController.js'
import PopupController from '../controllers/components/popupController.js'
import TaskListController from '../controllers/components/taskListController.js'
import { isNotSuccess } from '../responseValidation.js'

export default async function onStart(event) {
  const popup = new PopupController()
  const hash = localStorage.getItem('hash')
  if (!hash) return popup.showUnauthorized()

  const row = new TaskRowController(event.srcElement)
  const key = row.getKey()
  row.setLoadingActivityState()

  const response = await new DatabaseController().taskActivityClick(key, hash)
  if (isNotSuccess(response)) {
    row.setPreviousActivityState()
    return popup.showServerError(response.error)
  }

  row.updateRowData(response.data)
  if (row.isActive())
    return new TaskListController().setOtherActiveTasks(key, 'NOT_ACTIVE')
  if (row.isBusy()) return popup.showBusy()
}
