import onSave from '../../actions/onSave.js'
import TaskRowController from '../components/taskRowController.js'

export default class CommentModalController {
  TEXT_VALID_MESSAGE = "Remark can't be blank"
  SELECT_VALID_MESSAGE = 'Select Remark type'
  LOADING_ATTRIBUTE = 'isLoading'
  LOADING_STATE = '1'

  constructor() {
    this.modalClass = 'modal'
    this.modalCommentClass = `${this.modalClass}_comment`
    this.modalCloseClass = `${this.modalClass}__close`
    this.formClass = 'comment-form'
    this.formTextClass = `${this.formClass}__textarea`
    this.formSelectClass = `${this.formClass}__select`
    this.saveButtonClass = `${this.formClass}__button_save`
    this.resetButtonClass = `${this.formClass}__button_reset`

    this.modal = document.querySelector(`.${this.modalCommentClass}`)
    this.form = this.modal.querySelector(`.${this.formClass}`)
    this.close = this.modal.querySelector(`.${this.modalCloseClass}`)
    this.text = this.form.querySelector(`.${this.formTextClass}`)
    this.select = this.form.querySelector(`.${this.formSelectClass}`)
    this.saveButton = this.form.querySelector(`.${this.saveButtonClass}`)
    this.resetButton = this.form.querySelector(`.${this.resetButtonClass}`)
  }

  define() {
    this.defineClose()
    this.defineTextValidation()
    this.defineSelectValidation()
    this.defineSaveAction()
  }

  show(event) {
    const key = new TaskRowController(event.srcElement).getKey()
    this.form.setAttribute('key', key)
    this.form.reset()
    this.modal.style.display = 'flex'
  }

  setLoading(isLoading) {
    if (isLoading) {
      this.saveButton.style.pointerEvents = 'none'
      this.resetButton.style.pointerEvents = 'none'

      this.form.setAttribute(this.LOADING_ATTRIBUTE, this.LOADING_STATE)
      return
    }

    this.form.reset()
    this.saveButton.style.pointerEvents = 'auto'
    this.resetButton.style.pointerEvents = 'auto'

    this.form.removeAttribute(this.LOADING_ATTRIBUTE)
  }

  getData() {
    return {
      type: this.select.value,
      text: this.text.value,
    }
  }

  areInputsNotValid() {
    if (!this.text.validity.valid) return true
    if (!this.select.validity.valid) return true
    return false
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
