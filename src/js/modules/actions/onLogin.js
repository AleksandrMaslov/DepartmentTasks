import LoginModalController from '../controllers/modal/loginModalController.js'
import DatabaseController from '../controllers/database/databaseController.js'
import PopupController from '../controllers/components/popupController.js'
import AuthorizationController from '../controllers/components/authorizationController.js'

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
  popup.showWelcome()
  login.hide()

  new AuthorizationController().setAuthorized(true)
  const { report } = response
  const { hash } = report
  console.log(hash)
  // loacalStorage
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
