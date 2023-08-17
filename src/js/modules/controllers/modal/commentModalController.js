export default class CommentModalController {
  constructor() {
    this.modalClass = 'modal'
    this.modalCommentClass = `${this.modalClass}_comment`
    this.modalCloseClass = `${this.modalClass}__close`
    this.formClass = 'comment-form'
    this.formTextClass = `${this.formClass}__textarea`
    this.formSelectClass = `${this.formClass}__select`
    this.saveButtonClass = `${this.formClass}__button_save`

    this.textValidationMessage = "Remark can't be blank"
    this.selectValidationMessage = 'Select Remark type'

    this.modal = document.querySelector(`.${this.modalCommentClass}`)
    this.form = this.modal.querySelector(`.${this.formClass}`)
    this.text = this.form.querySelector(`.${this.formTextClass}`)
    this.select = this.form.querySelector(`.${this.formSelectClass}`)
    this.saveButton = this.form.querySelector(`.${this.saveButtonClass}`)
  }

  define() {
    this.defineClose()
    this.defineTextValidation()
    this.defineSelectValidation()
    this.defineSaveAction()
  }

  defineClose() {
    const close = this.modal.querySelector(`.${this.modalCloseClass}`)
    close.onclick = () => (this.modal.style.display = 'none')
  }

  defineTextValidation() {
    this.text.oninvalid = (e) =>
      e.target.setCustomValidity(this.textValidationMessage)
    this.text.oninput = (e) => e.target.setCustomValidity('')
  }

  defineSelectValidation() {
    this.select.oninvalid = (e) =>
      e.target.setCustomValidity(this.selectValidationMessage)
    this.select.oninput = (e) => e.target.setCustomValidity('')
  }

  defineSaveAction() {
    this.saveButton.onclick = this.onSaveClick
  }

  onCommentClick(key) {
    this.form.setAttribute('key', key)
    this.form.reset()
    this.modal.style.display = 'flex'
  }

  onSaveClick() {
    const key = this.form.getAttribute('key')
    const text = this.form.querySelector('.comment-form__textarea')
    const select = this.form.querySelector('.comment-form__select')
    if (!text.validity.valid) return
    if (!select.validity.valid) return

    console.log(key)
    console.log(text.value)
    console.log(select.value)
  }
}
