import LoginModalController from '../controllers/modal/loginModalController.js'
import DatabaseController from '../controllers/database/databaseController.js'
import AuthorizationController from '../controllers/components/authorizationController.js'
import TaskListController from '../controllers/components/taskListController.js'
import PopupController from '../controllers/components/popupController.js'
import { isNotSuccess, isNotValidUser } from '../dbResponseValidation.js'

export default async function onLogin() {
  const login = new LoginModalController()
  if (login.areInputsNotValid()) return

  login.setLoading(true)
  const userData = login.getUserData()
  const response = await new DatabaseController().login(userData)
  login.setLoading(false)

  const popup = new PopupController()
  if (isNotSuccess(response)) return popup.showServerError(response.error)
  if (isNotValidUser(response)) return popup.showAccessDenied()

  const { user } = response.data
  const { active, hash } = user

  const taskList = new TaskListController()
  taskList.setAuthorized(true)
  taskList.setOtherActiveTasks(active, 'BUSY')

  const auth = new AuthorizationController()
  auth.setUserData(user)
  auth.setAuthorized(true)
  localStorage.setItem('hash', hash)
  popup.showWelcome()
  login.hide()
}
