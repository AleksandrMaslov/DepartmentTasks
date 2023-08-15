import DatabaseController from '../controllers/databaseController.js'
import TaskListController from '../controllers/taskListController.js'

export default async function createTaskList(blockClass) {
  const response = await new DatabaseController().requestTasks()
  const { result, data } = response
  if (!result === 'success') return

  const taskListController = new TaskListController(blockClass)
  taskListController.addTable()
  // taskListController.addHeader(data)
  Object.entries(data).forEach((keyValue) =>
    taskListController.addRow(keyValue)
  )
}
