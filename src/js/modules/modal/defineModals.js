import CommentModalAPI from '../api/commentModalAPI.js'
import EditModalAPI from '../api/editModalAPI.js'

export default function defineModals() {
  const commentModalAPI = new CommentModalAPI()
  const editModalAPI = new EditModalAPI()

  commentModalAPI.define()
  editModalAPI.define()
}
