import CommentModalController from '../controllers/commentModalController.js'
import EditModalController from '../controllers/editModalController.js'

export default function defineModals() {
  const commentModalController = new CommentModalController()
  const editModalController = new EditModalController()

  commentModalController.define()
  editModalController.define()
}
