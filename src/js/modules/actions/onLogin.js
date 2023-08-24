import LoginModalController from '../controllers/modal/loginModalController.js'
import DatabaseController from '../controllers/database/databaseController.js'
import AuthorizationController from '../controllers/components/authorizationController.js'
import TaskListController from '../controllers/components/taskListController.js'
import PopupController from '../controllers/components/popupController.js'

export default async function onLogin() {
  const login = new LoginModalController()
  if (login.areInputsNotValid()) return

  login.setLoading(true)
  const userData = login.getUserData()
  const response = await new DatabaseController().login(userData)
  login.setLoading(false)

  const popup = new PopupController()
  if (isNotSuccessRequest(response)) return popup.showServerError()
  if (isNotUserValid(response)) return popup.showAccessDenied()

  const taskList = new TaskListController()
  taskList.setAuthorized(true)
  taskList.switchParallels(response.report.active, 'BUSY')

  const auth = new AuthorizationController()
  auth.setUserData(response.report)
  auth.setAuthorized(true)
  localStorage.setItem('hash', response.report.hash)
  popup.showWelcome()
  login.hide()
}

function isNotSuccessRequest(response) {
  return response.result !== 'success'
}

function isNotUserValid(response) {
  return response.report.status !== 'accepted'
}
