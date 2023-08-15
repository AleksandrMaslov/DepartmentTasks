import TaskRowController from '../../controllers/taskRowController.js'
import DatabaseController from '../../controllers/databaseController.js'

export default async function onStart(event) {
  const header = 'isActive'
  const rowController = new TaskRowController(event)
  const key = rowController.getKey()

  const currentState = rowController.getCellData(header)
  rowController.updateCellData(header, '.')

  const data = await new DatabaseController().switchState(
    key,
    header,
    currentState
  )

  const { result, report } = data
  const { value: newState } = report

  if (result === 'success')
    return rowController.updateCellData(header, newState)
  rowController.updateCellData(header, currentState)
}
