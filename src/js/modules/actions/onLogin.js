import LoginModalController from '../controllers/modal/loginModalController.js'
import DatabaseController from '../controllers/databaseController.js'
import PopupController from '../controllers/modal/popupController.js'

export default async function onLogin() {
  const login = new LoginModalController()
  if (login.areInputsNotValid()) return

  login.setLoading(true)
  const userData = login.getUserData()
  const response = await new DatabaseController().login(userData)
  login.setLoading(false)

  showPopupByResponse(response)
  if (isNotUserValid(response)) return
  login.hide()
  const { hash } = report
  // loacalStorage
}

function showPopupByResponse(response) {
  const popup = new PopupController()
  if (isNotSuccessRequest(response)) return popup.showServerError()
  if (isNotUserValid(response)) return popup.showAccessDenied()
  popup.showWelcome()
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
