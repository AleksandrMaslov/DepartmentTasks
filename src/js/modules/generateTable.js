export default function generateRows({ blockClass, responseData }) {
  const { result, data } = responseData
  if (!result === 'success') return

  const taskListAPI = new TaskListAPI(blockClass)
  taskListAPI.addTable()
  taskListAPI.addHeader(data)
  Object.entries(data).forEach((keyValue) => taskListAPI.addRow(keyValue))
}

class TaskListAPI {
  constructor(blockClass) {
    this.blockClass = blockClass
    this.listClass = `${this.blockClass}__list`
    this.hearedRowClass = `${blockClass}__header-row`
    this.headerClass = `${blockClass}__header`
    this.rowClass = `${blockClass}__row`
    this.cellClass = `${blockClass}__cell`
    this.cellWrapperClass = `${blockClass}__cell-wrapper`
    this.block = document.querySelector(`.${this.blockClass}`)
  }

  addTable() {
    this.block.innerHTML = `<div class='${this.listClass}'></div>`
    this.list = document.querySelector(`.${this.listClass}`)
  }

  addHeader(data) {
    this.list.innerHTML = `
    <div class='${this.hearedRowClass}'>
      <div class="${this.headerClass}">
        ID
      </div>
    </div>`

    this.header = document.querySelector(`.${this.hearedRowClass}`)
    const properties = Object.values(data)[0]
    Object.keys(properties).forEach((property) => {
      this.header.innerHTML += `
      <div class="${this.headerClass}">
        ${property.toUpperCase()}
      </div>`
    })
  }

  addRow(keyValue) {
    const [key, properties] = keyValue
    const row = document.createElement('div')
    row.classList.add(`${this.rowClass}`)
    row.innerHTML = `
    <div class="${this.cellClass}">
      ${key}
    </div>`
    Object.values(properties).forEach((property) => {
      row.innerHTML += `
      <div class="${this.cellClass}">
        ${property}
      </div>`
    })
    this.list.appendChild(row)
  }
}
