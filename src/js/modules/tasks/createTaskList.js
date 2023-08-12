import DatabaseAPI from '../db/databaseAPI.js'
import TaskListAPI from './taskListAPI.js'

export default async function createTaskList(blockClass) {
  const dbAPI = new DatabaseAPI()
  const response = await dbAPI.requestTasks()
  const { result, data } = response
  if (!result === 'success') return

  const taskListAPI = new TaskListAPI(blockClass)
  taskListAPI.addTable()
  // taskListAPI.addHeader(data)
  Object.entries(data).forEach((keyValue) => taskListAPI.addRow(keyValue))
}
