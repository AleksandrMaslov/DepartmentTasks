import onSave from '../../actions/onSave.js'

export default class CommentModalController {
  TEXT_VALID_MESSAGE = "Remark can't be blank"
  SELECT_VALID_MESSAGE = 'Select Remark type'

  constructor() {
    this.modalClass = 'modal'
    this.modalCommentClass = `${this.modalClass}_comment`
    this.modalCloseClass = `${this.modalClass}__close`
    this.formClass = 'comment-form'
    this.formTextClass = `${this.formClass}__textarea`
    this.formSelectClass = `${this.formClass}__select`
    this.saveButtonClass = `${this.formClass}__button_save`

    this.modal = document.querySelector(`.${this.modalCommentClass}`)
    this.form = this.modal.querySelector(`.${this.formClass}`)
    this.close = this.modal.querySelector(`.${this.modalCloseClass}`)
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

  showWithKey(key) {
    this.form.setAttribute('key', key)
    this.form.reset()
    this.modal.style.display = 'flex'
  }

  areInputsNotValid() {
    if (this.text.validity.valid) return false
    if (this.select.validity.valid) return false
    return true
  }

  getTaskKey() {
    return this.form.getAttribute('key')
  }

  defineClose() {
    this.close.onclick = () => (this.modal.style.display = 'none')
  }

  defineTextValidation() {
    this.text.oninvalid = (e) =>
      e.target.setCustomValidity(this.TEXT_VALID_MESSAGE)
    this.text.oninput = (e) => e.target.setCustomValidity('')
  }

  defineSelectValidation() {
    this.select.oninvalid = (e) =>
      e.target.setCustomValidity(this.SELECT_VALID_MESSAGE)
    this.select.oninput = (e) => e.target.setCustomValidity('')
  }

  defineSaveAction() {
    this.saveButton.onclick = onSave
  }
}
