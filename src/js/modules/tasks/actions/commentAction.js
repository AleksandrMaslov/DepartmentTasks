import TasksRowController from '../../controllers/taskRowController.js'
import CommentModalController from '../../controllers/commentModalController.js'

export default function onComment(event) {
  const key = new TasksRowController(event).getKey()
  new CommentModalController().onCommentClick(key)
}
