import DatabaseController from './controllers/database/databaseController.js'
import TaskListController from './controllers/components/taskListController.js'
import PopupController from './controllers/components/popupController.js'
import { isNotSuccess, isNotValidUser } from './dbResponseValidation.js'
import LoginModalController from './controllers/modal/loginModalController.js'
import AuthorizationController from './controllers/components/authorizationController.js'

export default async function loadAppData() {
  const login = new LoginModalController()
  const popup = new PopupController()
  login.setLoading(true)

  const hash = localStorage.getItem('hash')
  const response = await new DatabaseController().requestTasks(hash)
  login.setLoading(false)

  if (isNotSuccess(response)) return popup.showServerError(response.error)

  const { tasks, user } = response.data
  createTaskList(tasks)

  if (isNotValidUser(response)) return localStorage.removeItem('hash')

  setAuthorized(user)
  popup.showWelcome()
  login.hide()
}

async function setAuthorized(user) {
  const taskList = new TaskListController()
  taskList.setAuthorized(true)
  taskList.setOtherActiveTasks(user.active, 'BUSY')

  const auth = new AuthorizationController()
  auth.setUserData(user)
  auth.setAuthorized(true)
}

function createTaskList(tasks) {
  const taskListController = new TaskListController()
  taskListController.addTable()
  Object.entries(tasks).forEach((keyValue) =>
    taskListController.addRow(keyValue)
  )
}
