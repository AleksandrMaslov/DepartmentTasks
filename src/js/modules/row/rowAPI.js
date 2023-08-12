export default class RowAPI {
  constructor(event) {
    this.actionElement = event.srcElement
    this.action = this.actionElement.getAttribute('key')
    this.row = this.actionElement.closest('.tasks__row')
    this.key = this.row.getAttribute('key')

    this.blockClass = 'tasks'
    this.progressClass = 'progress'
    this.cellClass = `${this.blockClass}__cell`
    this.cellContentClass = `${this.blockClass}__cell-content`
    this.actionClass = `${this.blockClass}__action`
    this.actionContentClass = `${this.blockClass}__action-content`
  }

  getAction() {
    return this.action
  }

  getKey() {
    return this.key
  }

  getCellData(header) {
    const cell = this.row.querySelector(`.${this.cellClass}[key=${header}]`)
    const content = cell.querySelector(`.${this.cellContentClass}`)
    return content.innerHTML
  }

  updateCellData(header, value) {
    const cell = this.row.querySelector(`.${this.cellClass}[key=${header}]`)
    const content = cell.querySelector(`.${this.cellContentClass}`)
    content.innerHTML = value
  }

  setInProgress() {
    this.actionElement.style.display = 'none'
    const action = this.actionElement.closest(`.${this.actionClass}`)
    const progress = this.createProgress()
    action.appendChild(progress)
  }

  removeInProgress() {
    const action = this.actionElement.closest(`.${this.actionClass}`)
    const progress = action.querySelector(`.${this.progressClass}`)
    progress.remove()
    this.actionElement.style.display = 'initial'
  }

  createProgress() {
    const element = document.createElement('span')
    element.classList.add('progress')
    return element
  }
}
