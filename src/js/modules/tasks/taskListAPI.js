import DatabaseAPI from '../db/databaseAPI.js'
import RowAPI from '../row/rowAPI.js'

export default class TaskListAPI {
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
    this.key = 'key'
    this.block = document.querySelector(`.${this.blockClass}`)

    this.actions = {
      edit: {
        title: 'Edit',
        alt: 'tasks-edit',
        src: 'img/tasks/tasks-edit.png',
        onclick: this.onEditClick,
      },
      comment: {
        title: 'Comment',
        alt: 'tasks-comment',
        src: 'img/tasks/tasks-comment.png',
        onclick: this.onCommentClick,
      },
      start: {
        title: 'Start',
        alt: 'tasks-start',
        src: 'img/tasks/tasks-start.png',
        onclick: this.onStartClick,
      },
    }
  }

  addTable() {
    this.list = document.createElement('div')
    this.list.classList.add(`${this.listClass}`)
    this.block.replaceChildren(this.list)
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

    Object.entries(properties).forEach((property) => {
      const cell = this.createCell(property)
      row.appendChild(cell)
    })

    const rowActions = this.createRowActions()
    row.appendChild(rowActions)
    this.list.appendChild(row)
  }

  removeRowById(id) {
    const elements = this.list.querySelectorAll(`div[${this.key}='${id}']`)
    console.log(elements)
    elements.forEach((element) => element.remove())
  }

  insertRow() {
    // parentElement.insertBefore(newElement, referenceElement);
  }

  createRow(key) {
    const row = document.createElement('div')
    row.classList.add(`${this.rowClass}`)
    row.setAttribute(this.key, key)
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

  createCell(property) {
    const [header, value] = property
    const cell = document.createElement('div')
    cell.classList.add(`${this.cellClass}`)
    cell.setAttribute('title', value)
    cell.setAttribute('key', header)
    cell.innerHTML = value
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
    if (name !== 'start') action.classList.add('modal__open')
    action.setAttribute('key', name)
    action.setAttribute('src', this.actions[name].src)
    action.setAttribute('alt', this.actions[name].alt)
    action.setAttribute('title', this.actions[name].title)
    action.onclick = this.actions[name].onclick
    return action
  }

  onEditClick = () => alert('Default Edit Action')

  onCommentClick = () => alert('Default Comment Action')

  onStartClick = async (event) => {
    const header = 'isActive'
    const rowAPI = new RowAPI(event)
    const key = rowAPI.getKey()
    const currentState = rowAPI.getCellData(header)
    const dbAPI = new DatabaseAPI()
    const data = await dbAPI.switchState(key, header, currentState)
    console.log(data)
  }
}
