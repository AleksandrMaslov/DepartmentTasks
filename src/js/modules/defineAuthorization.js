import AuthorizationController from './controllers/authorizationController.js'

export default function defineAuthorization() {
  new AuthorizationController().define()
}
