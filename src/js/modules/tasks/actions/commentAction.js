export default function onComment() {
  const commentForm = document.querySelector('.comment-form')
  commentForm.reset()

  const modal = document.querySelector('.modal_comment')
  modal.style.display = 'flex'
}
