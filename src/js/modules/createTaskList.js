import DatabaseController from './controllers/database/databaseController.js'
import TaskListController from './controllers/components/taskListController.js'

export default async function createTaskList() {
  const response = await new DatabaseController().requestTasks()
  const { result, data } = response
  if (!result === 'success') return

  const taskListController = new TaskListController()
  taskListController.addTable()
  // taskListController.addHeader(data)
  Object.entries(data).forEach((keyValue) =>
    taskListController.addRow(keyValue)
  )
}
