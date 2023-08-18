import TaskRowController from '../controllers/taskRowController.js'
import DatabaseController from '../controllers/databaseController.js'

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
  const { result, report } = response
  const { value: newState } = report
  return result === 'success' ? newState : currentState
}
