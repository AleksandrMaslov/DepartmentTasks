import RowAPI from '../row/rowAPI.js'

export default function defineModal() {
  const modal = document.querySelector('.modal')
  const windows = Array.from(modal.children)

  function openModal(event) {
    const action = new RowAPI(event).getActionName()
    const window = document.querySelector(`.modal__window_${action}`)
    window.style.display = 'flex'
    modal.style.display = 'flex'
  }

  function closeModal() {
    modal.style.display = 'none'
    windows.forEach((window) => {
      window.style.display = 'none'
    })
  }

  Array.from(document.getElementsByClassName('modal__open')).forEach(
    (element) => (element.onclick = openModal)
  )

  Array.from(document.getElementsByClassName('modal__close')).forEach(
    (element) => (element.onclick = closeModal)
  )
}
