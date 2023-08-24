import DatabaseController from '../controllers/database/databaseController.js'
import PopupController from '../controllers/components/popupController.js'
import TaskListController from '../controllers/components/taskListController.js'
import LoginModalController from '../controllers/modal/loginModalController.js'
import AuthorizationController from '../controllers/components/authorizationController.js'

export default async function onAuthorize(hash) {
  const login = new LoginModalController()
  login.setLoading(true)
  const response = await new DatabaseController().authorize(hash)
  login.setLoading(false)

  const popup = new PopupController()
  if (isNotSuccessRequest(response)) return popup.showServerError()
  if (isNotUserValid(response)) return localStorage.removeItem('hash')

  const taskList = new TaskListController()
  taskList.setAuthorized(true)
  taskList.switchParallels(response.report.active, 'BUSY')

  const auth = new AuthorizationController()
  auth.setUserData(response.report)
  auth.setAuthorized(true)

  popup.showWelcome()
  login.hide()
}

function isNotSuccessRequest(response) {
  return response.result !== 'success'
}

function isNotUserValid(response) {
  return response.report.status !== 'accepted'
}
