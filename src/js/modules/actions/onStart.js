import DatabaseController from '../controllers/database/databaseController.js'
import TaskRowController from '../controllers/components/taskRowController.js'
import PopupController from '../controllers/components/popupController.js'

export default async function onStart(event) {
  const hash = localStorage.getItem('hash')
  if (!hash) return popupController.showUnauthorized()

  const HEADER = 'isActive'
  const popupController = new PopupController()
  const rowController = new TaskRowController(event.srcElement)
  const key = rowController.getKey()
  const currentState = rowController.getActivityState()

  const dbController = new DatabaseController()
  rowController.setLoadingState()
  const response = await dbController.switchState(key, HEADER, currentState)
  const isNotSuccessful = isNotSuccessRequest(response)
  const state = isNotSuccessful ? currentState : response.report.value
  rowController.setActivityState(state)
  if (isNotSuccessful) return popupController.showServerError()

  //check if currentState doesnt match with DB
  //DB state should not be changed separately
  const report = await dbController.startTask(key, hash)
  console.log(report)
}

function isNotSuccessRequest(response) {
  const { result } = response
  return result !== 'success'
}
