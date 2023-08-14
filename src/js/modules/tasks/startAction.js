import RowAPI from '../row/rowAPI.js'
import DatabaseAPI from '../db/databaseAPI.js'

export default async function onStart(event) {
  const header = 'isActive'
  const rowAPI = new RowAPI(event)
  const key = rowAPI.getKey()
  const currentState = rowAPI.getCellData(header)
  rowAPI.setIsLoading()

  const dbAPI = new DatabaseAPI()
  const data = await dbAPI.switchState(key, header, currentState)

  console.log(data)
  const { result, report } = data
  const { value } = report
  if (result === 'success') rowAPI.updateCellData(header, value)
  rowAPI.removeIsLoading()
}
