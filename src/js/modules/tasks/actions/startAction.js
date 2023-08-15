import TasksRowAPI from '../../api/taskRowAPI.js'
import DatabaseAPI from '../../api/databaseAPI.js'

export default async function onStart(event) {
  const header = 'isActive'
  const rowAPI = new TasksRowAPI(event)
  const key = rowAPI.getKey()

  const currentState = rowAPI.getCellData(header)
  rowAPI.updateCellData(header, '.')

  const data = await new DatabaseAPI().switchState(key, header, currentState)

  const { result, report } = data
  const { value: newState } = report

  if (result === 'success') return rowAPI.updateCellData(header, newState)
  rowAPI.updateCellData(header, currentState)
}
