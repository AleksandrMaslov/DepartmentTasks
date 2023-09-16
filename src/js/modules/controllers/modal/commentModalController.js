import onSave from '../../actions/onSave.js'
import TaskRowController from '../components/taskRowController.js'

export default class CommentModalController {
  TEXT_VALID_MESSAGE = "Remark can't be blank"
  SELECT_VALID_MESSAGE = 'Select Remark type'
  LOADING_ATTRIBUTE = 'isLoading'
  LOADING_STATE = '1'

  constructor() {
    this.modal = document.querySelector('.modal_comment')
    this.close = this.modal.querySelector('.modal__close')
    this.description = this.modal.querySelector('.modal__description')

    this.form = this.modal.querySelector('.comment-form')
    this.text = this.form.querySelector('.comment-form__textarea')
    this.select = this.form.querySelector('.comment-form__select')
    this.saveButton = this.form.querySelector('.comment-form__button_save')
    this.resetButton = this.form.querySelector('.comment-form__button_reset')
  }

  define() {
    this.defineClose()
    this.defineTextValidation()
    this.defineSelectValidation()
    this.defineSaveAction()
  }

  show(event) {
    const row = new TaskRowController(event.srcElement)
    this.setWindowDescriptionByRow(row)
    this.setWindowKeyByRow(row)
    this.form.reset()
    this.modal.style.display = 'flex'
  }

  setWindowDescriptionByRow(row) {
    const number = row.getCellData('number')
    const name = row.getCellData('name')
    this.description.innerHTML = `${number} ${name}`
  }

  setWindowKeyByRow(row) {
    const key = row.getKey()
    this.form.setAttribute('key', key)
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
