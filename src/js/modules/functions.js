export function defineWebpClass() {
  function testWebp(callback) {
    var webp = new Image()
    webp.onload = webp.onerror = function () {
      callback(webp.height == 2)
    }
    webp.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  }

  testWebp(function (isSupporting) {
    let className = isSupporting ? 'webp' : 'no-webp'
    document.documentElement.classList.add(className)
  })
}

export function defineModal() {
  const modal = document.querySelector('.modal')
  function openModal() {
    modal.style.display = 'block'
  }
  function closeModal() {
    modal.style.display = 'none'
  }
  Array.from(document.getElementsByClassName('modal__open')).forEach(
    (element) => (element.onclick = openModal)
  )
  Array.from(document.getElementsByClassName('modal__close')).forEach(
    (element) => (element.onclick = closeModal)
  )
}
