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

  new AuthorizationController().setAuthorized(true)
  new TaskListController().setAuthorized(true)
  saveHash(response.report.hash)
  popup.showWelcome()
  login.hide()
}

function saveHash(hash) {
  localStorage.setItem('hash', hash)
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
