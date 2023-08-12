export default class RowAPI {
  constructor(event) {
    this.actionElement = event.srcElement
    this.action = this.actionElement.getAttribute('key')
    this.row = this.actionElement.closest('.tasks__row')
    this.id = this.row.getAttribute('key')
  }

  getAction() {
    return this.action
  }

  getId() {
    return this.id
  }

  getCellData(header) {
    const cell = this.row.querySelector(`.tasks__cell[key=${header}]`)
    return cell.innerHTML
  }
}
