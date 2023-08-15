import DatabaseAPI from '../api/databaseAPI.js'
import TaskListAPI from '../api/taskListAPI.js'

export default async function createTaskList(blockClass) {
  const response = await new DatabaseAPI().requestTasks()
  const { result, data } = response
  if (!result === 'success') return

  const taskListAPI = new TaskListAPI(blockClass)
  taskListAPI.addTable()
  // taskListAPI.addHeader(data)
  Object.entries(data).forEach((keyValue) => taskListAPI.addRow(keyValue))
}
