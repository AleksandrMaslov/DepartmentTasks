export default class TaskRowController {
  HEADER_IS_ACTIVE = 'isActive'
  IS_LOADING_STATE = '.'

  constructor(event) {
    this.rowClass = 'row'
    this.cellClass = `${this.rowClass}__cell`
    this.cellContentClass = `${this.rowClass}__cell-content`
    this.actionClass = `${this.rowClass}__action`
    this.actionContentClass = `${this.rowClass}__action-content`
    this.loaderClass = `${this.rowClass}__loader`

    this.actionContent = event.srcElement
    this.action = this.actionContent.closest(`.${this.actionClass}`)

    this.row = this.actionContent.closest(`.${this.rowClass}`)
    this.key = this.row.getAttribute('key')
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
    cell.setAttribute('title', value)
    content.innerHTML = value
  }

  getActivityState() {
    return this.getCellData(this.HEADER_IS_ACTIVE)
  }

  setActivityState(value) {
    return this.updateCellData(this.HEADER_IS_ACTIVE, value)
  }

  setLoadingState() {
    return this.updateCellData(this.HEADER_IS_ACTIVE, this.IS_LOADING_STATE)
  }
}
