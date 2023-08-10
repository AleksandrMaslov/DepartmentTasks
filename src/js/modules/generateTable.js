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
    this.logoClass = `${blockClass}__logo`
    this.actionsClass = `${blockClass}__actions`
    this.actionClass = `${blockClass}__action`
    this.taskId = 'taskId'
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
    const properties = Object.keys(Object.values(data)[0])

    const headerLogo = document.createElement('div')
    headerLogo.classList.add(`${this.logoClass}`)
    this.header.appendChild(headerLogo)

    properties.forEach((header) => {
      const headerCell = document.createElement('div')
      headerCell.classList.add(`${this.headerClass}`)
      headerCell.innerHTML = `${header.toUpperCase()}`
      this.header.appendChild(headerCell)
    })

    const headerActions = document.createElement('div')
    headerActions.classList.add(`${this.actionsClass}`)
    this.header.appendChild(headerActions)

    this.list.appendChild(this.header)
  }

  addRow(keyValue) {
    const [key, properties] = keyValue
    const row = this.createRow(key)
    const rowLogo = this.createRowLogo()
    row.appendChild(rowLogo)

    Object.values(properties).forEach((cellData) => {
      const data = `${cellData}`
      const cell = this.createCell(data)
      row.appendChild(cell)
    })

    const rowActions = this.createRowActions()
    row.appendChild(rowActions)
    this.list.appendChild(row)
  }

  removeRowById(id) {
    const elements = this.list.querySelectorAll(`div[${this.taskId}='${id}']`)
    console.log(elements)
    elements.forEach((element) => element.remove())
  }

  insertRow() {
    // parentElement.insertBefore(newElement, referenceElement);
  }

  createRow(key) {
    const row = document.createElement('div')
    row.classList.add(`${this.rowClass}`)
    row.setAttribute(this.taskId, key)
    row.onclick = row.remove
    return row
  }

  createRowLogo() {
    const rowLogo = document.createElement('div')
    rowLogo.classList.add(`${this.logoClass}`)
    const logo = document.createElement('img')
    logo.setAttribute('src', 'img/tasks/tasks-marker.png')
    logo.setAttribute('alt', 'tasks-marker')
    rowLogo.appendChild(logo)
    return rowLogo
  }

  createCell(data) {
    const cell = document.createElement('div')
    cell.classList.add(`${this.cellClass}`)
    cell.setAttribute('title', data)
    cell.innerHTML = data
    return cell
  }

  createRowActions() {
    const rowActions = document.createElement('div')
    rowActions.classList.add(`${this.actionsClass}`)
    rowActions.appendChild(this.createAction('edit'))
    rowActions.appendChild(this.createAction('comment'))
    rowActions.appendChild(this.createAction('start'))
    return rowActions
  }

  createAction(name) {
    const action = document.createElement('img')
    action.classList.add(`${this.actionClass}`)
    action.setAttribute('src', `img/tasks/tasks-${name}.png`)
    action.setAttribute('alt', `tasks-${name}`)
    return action
  }
}
