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
    this.block = document.querySelector(`.${this.blockClass}`)
  }

  addTable() {
    this.list = document.createElement('div')
    this.list.classList.add(`${this.listClass}`)
    this.block.appendChild(this.list)
  }

  addHeader(data) {
    this.header = document.createElement('div')
    this.header.classList.add(`${this.hearedRowClass}`)
    const properties = Object.values(data)[0]
    const headers = ['id', ...Object.keys(properties)]
    headers.forEach((header) => {
      const headerCell = document.createElement('div')
      headerCell.classList.add(`${this.headerClass}`)
      headerCell.innerHTML = `${header.toUpperCase()}`
      this.header.appendChild(headerCell)
    })
    this.list.appendChild(this.header)
  }

  addRow(keyValue) {
    const [key, properties] = keyValue
    const row = document.createElement('div')
    row.classList.add(`${this.rowClass}`)
    const cellsData = [key, ...Object.values(properties)]
    cellsData.forEach((cellData) => {
      const cell = document.createElement('div')
      cell.classList.add(`${this.cellClass}`)
      cell.innerHTML = `${cellData}`
      row.appendChild(cell)
    })
    this.list.appendChild(row)
  }
}
