export default class ContextMenuController {
  constructor() {
    this.context = document.querySelector('.context')
    this.edit = this.context.querySelector('.context__item_edit')
    this.open = this.context.querySelector('.context__item_open')
    this.close = this.context.querySelector('.context__item_close')
  }

  define() {
    document.addEventListener('click', this.hide)
  }

  show(x, y, isActive) {
    if (isActive) {
      this.open.setAttribute('disabled', '')
      this.close.removeAttribute('disabled')
    } else {
      this.open.removeAttribute('disabled')
      this.close.setAttribute('disabled', '')
    }

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
