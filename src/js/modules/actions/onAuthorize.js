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
  new TaskListController().setAuthorized(true)
  const authController = new AuthorizationController()
  authController.setUserData(response.report)
  authController.setAuthorized(true)
  popup.showWelcome()
  login.hide()
}

function isNotSuccessRequest(response) {
  const { result } = response
  return result !== 'success'
}

function isNotUserValid(response) {
  const { report } = response
  const { status } = report
  return status !== 'accepted'
}
