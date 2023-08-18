import AuthorizationController from '../controllers/components/authorizationController.js'
import PopupController from '../controllers/components/popupController.js'

export default async function onLogout() {
  new AuthorizationController().setAuthorized(false)
  new PopupController().showGoodbye()
}
