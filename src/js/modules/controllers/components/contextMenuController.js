export default class ContextMenuController {
  constructor() {
    this.context = document.querySelector('.context')
  }

  define() {
    document.addEventListener('click', this.hide)
  }

  show(x, y) {
    this.context.style.left = `${x}px`
    this.context.style.top = `${y}px`
    this.context.style.opacity = '0'
    this.context.style.display = 'block'
    this.context.style.opacity = '1'
  }

  hide = () => {
    this.context.style.opacity = '0'
    this.context.style.display = 'none'
  }
}
