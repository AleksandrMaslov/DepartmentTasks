import DatabaseController from '../controllers/database/databaseController.js'
import TaskRowController from '../controllers/components/taskRowController.js'
import PopupController from '../controllers/components/popupController.js'
import TaskListController from '../controllers/components/taskListController.js'
import { isNotSuccess } from '../utils/responseValidation.js'

export default async function onStart(event) {
  const popup = new PopupController()
  const hash = localStorage.getItem('hash')
  if (!hash) return popup.showUnauthorized()

  const row = new TaskRowController(event.srcElement)
  const key = row.getKey()
  row.setLoadingActivityState()

  const data = { key, hash }
  const response = await new DatabaseController().taskActivityClick(data)
  if (isNotSuccess(response)) {
    row.setPreviousActivityState()
    return popup.showServerError(response.error)
  }

  const [currentRowData, previousRowData] = response.data
  row.updateRowData(currentRowData)

  if (previousRowData) {
    const { key, ...restPreviousData } = previousRowData
    const previousRowElement = new TaskListController().getRow(key)
    const previousRow = new TaskRowController(previousRowElement)
    previousRow.updateRowData(restPreviousData)
  }

  if (row.isActive())
    return new TaskListController().setOtherActiveTasksState(key, 'NOT_ACTIVE')

  if (row.isBusy()) return popup.showBusy()
}
