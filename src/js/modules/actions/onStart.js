import DatabaseController from '../controllers/database/databaseController.js'
import TaskRowController from '../controllers/components/taskRowController.js'
import PopupController from '../controllers/components/popupController.js'
import TaskListController from '../controllers/components/taskListController.js'

export default async function onStart(event) {
  const hash = localStorage.getItem('hash')
  if (!hash) return popup.showUnauthorized()

  const popup = new PopupController()
  const row = new TaskRowController(event.srcElement)
  const key = row.getKey()

  row.setLoadingActivityState()
  const response = await new DatabaseController().taskActivityClick(key, hash)
  if (isNotSuccessRequest(response)) {
    row.setPreviousActivityState()
    return popup.showServerError()
  }

  row.setActivityState(response.report.isActive)
  if (row.isActive())
    return new TaskListController().switchParallels(key, 'NOT_ACTIVE')
  if (row.isBusy()) return popup.showBusy()
}

function isNotSuccessRequest(response) {
  return response.result !== 'success'
}
