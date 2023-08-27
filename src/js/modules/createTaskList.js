import DatabaseController from './controllers/database/databaseController.js'
import TaskListController from './controllers/components/taskListController.js'
import PopupController from './controllers/components/popupController.js'

export default async function createTaskList() {
  const response = await new DatabaseController().requestTasks()
  if (isNotSuccessRequest(response))
    return new PopupController().showServerError(response.error)

  const taskListController = new TaskListController()
  taskListController.addTable()
  Object.entries(response.data).forEach((keyValue) =>
    taskListController.addRow(keyValue)
  )
}

function isNotSuccessRequest(response) {
  return response.result !== 'success'
}
