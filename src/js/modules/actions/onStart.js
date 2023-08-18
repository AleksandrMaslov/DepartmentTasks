import DatabaseController from '../controllers/database/databaseController.js'
import TaskRowController from '../controllers/components/taskRowController.js'
import PopupController from '../controllers/components/popupController.js'

export default async function onStart(event) {
  const rowController = new TaskRowController(event.srcElement)
  const key = rowController.getKey()
  const currentState = rowController.getActivityState()

  rowController.setLoadingState()
  const state = await getNewState(key, currentState)
  rowController.setActivityState(state)
}

async function getNewState(key, currentState) {
  const HEADER = 'isActive'
  const response = await new DatabaseController().switchState(
    key,
    HEADER,
    currentState
  )

  if (isNotSuccessRequest(response)) {
    new PopupController().showServerError()
    return currentState
  }
  return response.report.value
}

function isNotSuccessRequest(response) {
  const { result } = response
  return result !== 'success'
}
