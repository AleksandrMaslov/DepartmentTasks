import AuthorizationController from './controllers/components/authorizationController.js'

export default function defineAuthorization() {
  new AuthorizationController().define()
}
