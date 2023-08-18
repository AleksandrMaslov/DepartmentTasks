import CommentModalController from '../controllers/modal/commentModalController.js'

export default async function onSave() {
  const comment = new CommentModalController()
  if (comment.areInputsNotValid()) return

  const key = comment.getTaskKey()
  console.log(key)
}

// function isNotSuccessRequest(response) {
//   const { result } = response
//   return result !== 'success'
// }
