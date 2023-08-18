import LoginModalController from './controllers/modal/loginModalController.js'
import CommentModalController from './controllers/modal/commentModalController.js'
import EditModalController from './controllers/modal/editModalController.js'
import PopupController from './controllers/modal/popupController.js'

export default function defineModals() {
  const loginModalController = new LoginModalController()
  const commentModalController = new CommentModalController()
  const editModalController = new EditModalController()
  const popupController = new PopupController()

  loginModalController.define()
  commentModalController.define()
  editModalController.define()
  popupController.define()
}
