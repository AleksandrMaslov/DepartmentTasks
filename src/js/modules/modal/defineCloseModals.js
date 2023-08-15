export default function defineCloseModals() {
  const modals = document.getElementsByClassName('modal')
  const windows = Array.from(modals)

  function closeModal() {
    windows.forEach((window) => (window.style.display = 'none'))
  }

  Array.from(document.getElementsByClassName('modal__close')).forEach(
    (element) => (element.onclick = closeModal)
  )
}
