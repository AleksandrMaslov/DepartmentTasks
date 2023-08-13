export default class RowAPI {
  constructor(event) {
    this.rowClass = 'row'
    this.cellClass = `${this.rowClass}__cell`
    this.cellContentClass = `${this.rowClass}__cell-content`
    this.actionClass = `${this.rowClass}__action`
    this.actionContentClass = `${this.rowClass}__action-content`
    this.loaderClass = `${this.rowClass}__loader`

    this.actionContent = event.srcElement
    this.action = this.actionContent.closest(`.${this.actionClass}`)
    this.actionName = this.action.getAttribute('key')

    this.row = this.actionContent.closest(`.${this.rowClass}`)
    this.key = this.row.getAttribute('key')
  }

  getActionName() {
    return this.actionName
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

  setIsLoading() {
    this.actionContent.style.display = 'none'
    const loader = this.createLoader()
    this.action.appendChild(loader)
  }

  removeIsLoading() {
    const action = this.actionContent.closest(`.${this.actionClass}`)
    const loader = action.querySelector(`.${this.loaderClass}`)
    loader.remove()
    this.actionContent.style.display = 'initial'
  }

  createLoader() {
    const loader = document.createElement('span')
    loader.classList.add(this.loaderClass)
    return loader
  }
}
