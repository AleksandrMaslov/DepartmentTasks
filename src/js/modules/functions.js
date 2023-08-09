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
