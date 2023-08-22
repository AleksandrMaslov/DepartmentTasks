export default class TaskRowController {
  HEADER_IS_ACTIVE = 'isActive'
  IS_LOADING_STATE = '.'

  constructor(rowChild) {
    this.rowClass = 'row'
    this.cellClass = `${this.rowClass}__cell`
    this.stateClass = `${this.rowClass}__state`
    this.cellContentClass = `${this.rowClass}__cell-content`
    this.actionsClass = `${this.rowClass}__actions`

    this.row = rowChild.closest(`.${this.rowClass}`)
    this.key = this.row.getAttribute('key')
  }

  getKey() {
    return this.key
  }

  getCellData(header) {
    const cell = this.row.querySelector(`.${this.cellClass}[key=${header}]`)
    return cell.getAttribute('title')
  }

  updateCellData(header, value) {
    const cell = this.row.querySelector(`.${this.cellClass}[key=${header}]`)
    const content = cell.querySelector(`.${this.cellContentClass}`)
    cell.setAttribute('title', value)
    content.innerHTML = value
  }

  setAuthorized(isAuthorized) {
    const actions = this.row.querySelector(`.${this.actionsClass}`)
    if (isAuthorized) return (actions.style.display = 'flex')
    actions.style.display = 'none'
  }

  getActivityState() {
    return this.getState(this.HEADER_IS_ACTIVE)
  }

  setActivityState(value) {
    return this.updateState(this.HEADER_IS_ACTIVE, value)
  }

  setLoadingState() {
    return this.updateState(this.HEADER_IS_ACTIVE, this.IS_LOADING_STATE)
  }

  getState(header) {
    const cell = this.row.querySelector(`.${this.stateClass}[key=${header}]`)
    return cell.getAttribute('title')
  }

  updateState(header, value) {
    const cell = this.row.querySelector(`.${this.stateClass}[key=${header}]`)
    cell.setAttribute('title', value)
  }
}
