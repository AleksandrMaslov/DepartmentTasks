import dateTime from '../../dateTime.js'

export default class TaskRowController {
  HEADERS = {
    IS_ACTIVE: 'isActive',
    IS_FINISHED: 'isFinished',
    IS_WRONG: 'isWrong',
    IS_ACCEPTED: 'isAccepted',
  }
  STATE = {
    ACTIVE: '1',
    NOT_ACTIVE: '0',
    LOADING: '.',
    BUSY: 'x',
  }

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

  getStateData(header) {
    const cell = this.row.querySelector(`.${this.stateClass}[key=${header}]`)
    return cell.getAttribute('title')
  }

  updateCellData(header, value) {
    const cell = this.row.querySelector(`.${this.cellClass}[key=${header}]`)
    cell.setAttribute('title', value)
    const content = cell.querySelector(`.${this.cellContentClass}`)
    content.innerHTML = value
  }

  updateState(header, value) {
    const cell = this.row.querySelector(`.${this.stateClass}[key=${header}]`)
    cell.setAttribute('title', value)
  }

  updateRowData({ number, name, responsible, editor, edited, ...states }) {
    Object.entries({ number, name, responsible, editor, edited }).forEach(
      ([header, value]) => {
        if (header === 'edited') value = dateTime(value)
        this.updateCellData(header, value)
      }
    )

    Object.entries(states).forEach(([header, value]) =>
      this.updateState(header, value)
    )
  }

  setAuthorized(isAuthorized) {
    const actions = this.row.querySelector(`.${this.actionsClass}`)
    if (isAuthorized) return (actions.style.display = 'flex')
    actions.style.display = 'none'
  }

  getActivityState() {
    return this.getStateData(this.HEADERS.IS_ACTIVE)
  }

  setLoadingActivityState() {
    this.previousActivityState = this.getActivityState()
    this.setActivityState(this.STATE.LOADING)
  }

  setPreviousActivityState() {
    this.setActivityState(this.previousActivityState)
  }

  setActivityState(value) {
    this.updateState(this.HEADERS.IS_ACTIVE, value)
  }

  isBusy() {
    return this.getActivityState() === this.STATE.BUSY
  }

  isActive() {
    return this.getActivityState() === this.STATE.ACTIVE
  }
}
