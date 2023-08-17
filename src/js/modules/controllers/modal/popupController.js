export default class PopupController {
  constructor() {
    this.POPUP_TIMEOUT = 2500

    this.popupClass = 'popup'
    this.popupShowedClass = `${this.popupClass}_showed`
    this.popupCloseClass = `${this.popupClass}__close`
    this.popupTitleClass = `${this.popupClass}__title`
    this.popupContentClass = `${this.popupClass}__content`

    this.popup = document.querySelector(`.${this.popupClass}`)
    this.title = this.popup.querySelector(`.${this.popupTitleClass}`)
    this.content = this.popup.querySelector(`.${this.popupContentClass}`)
  }

  define() {
    this.defineClose()
  }

  defineClose() {
    const close = this.popup.querySelector(`.${this.popupCloseClass}`)
    close.onclick = () => (this.popup.style.right = '-320px')
  }

  show(title, message) {
    this.title.innerHTML = title
    this.content.innerHTML = message
    this.popup.style.right = '20px'
    setTimeout(() => {
      this.popup.style.right = '-320px'
    }, this.POPUP_TIMEOUT)
  }
}
