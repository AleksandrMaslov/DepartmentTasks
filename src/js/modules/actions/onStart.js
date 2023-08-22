import DatabaseController from '../controllers/database/databaseController.js'
import TaskRowController from '../controllers/components/taskRowController.js'
import PopupController from '../controllers/components/popupController.js'

export default async function onStart(event) {
  const hash = localStorage.getItem('hash')
  if (!hash) return popupController.showUnauthorized()

  const popupController = new PopupController()
  const rowController = new TaskRowController(event.srcElement)
  const key = rowController.getKey()
  const currentState = rowController.getActivityState()

  rowController.setLoadingState()
  const response = await new DatabaseController().taskActivityClick(key, hash)
  const isNotSuccessful = isNotSuccessRequest(response)
  const state = isNotSuccessful ? currentState : response.report.state
  rowController.setActivityState(state)
  if (isNotSuccessful) return popupController.showServerError()
  if (state === 'x') popupController.showBusy()
}

function isNotSuccessRequest(response) {
  const { result } = response
  return result !== 'success'
}
