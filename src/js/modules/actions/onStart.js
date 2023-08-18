import TaskRowController from '../controllers/taskRowController.js'
import DatabaseController from '../controllers/databaseController.js'
import PopupController from '../controllers/modal/popupController.js'

export default async function onStart(event) {
  const HEADER = 'isActive'
  const IS_LOADING_STATE = '.'

  const rowController = new TaskRowController(event)
  const key = rowController.getKey()
  const currentState = rowController.getCellData(HEADER)

  rowController.updateCellData(HEADER, IS_LOADING_STATE)
  const state = await getNewState(key, HEADER, currentState)
  rowController.updateCellData(HEADER, state)
}

async function getNewState(key, header, currentState) {
  const response = await new DatabaseController().switchState(
    key,
    header,
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
