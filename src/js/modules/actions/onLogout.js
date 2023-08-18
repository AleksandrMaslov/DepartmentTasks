import AuthorizationController from '../controllers/components/authorizationController.js'
import TaskListController from '../controllers/components/taskListController.js'
import PopupController from '../controllers/components/popupController.js'

export default async function onLogout() {
  new AuthorizationController().setAuthorized(false)
  new TaskListController().setAuthorized(false)
  new PopupController().showGoodbye()
  removeHash()
}

function removeHash() {
  localStorage.removeItem('hash')
}
