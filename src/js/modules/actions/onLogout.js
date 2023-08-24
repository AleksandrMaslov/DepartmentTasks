import AuthorizationController from '../controllers/components/authorizationController.js'
import TaskListController from '../controllers/components/taskListController.js'
import PopupController from '../controllers/components/popupController.js'

export default async function onLogout() {
  new TaskListController().setAuthorized(false)
  new PopupController().showGoodbye()
  const auth = new AuthorizationController()
  auth.setAuthorized(false)
  auth.clearUserData()
  localStorage.removeItem('hash')
}
