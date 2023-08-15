import TasksRowAPI from '../../api/taskRowAPI.js'
import CommentModalAPI from '../../api/commentModalAPI.js'

export default function onComment(event) {
  const key = new TasksRowAPI(event).getKey()
  new CommentModalAPI().onCommentClick(key)
}
