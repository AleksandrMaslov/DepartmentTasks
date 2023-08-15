import onStart from './actions/startAction.js'
import onEdit from './actions/editAction.js'
import onComment from './actions/commentAction.js'

export default class TaskListAPI {
  constructor(blockClass) {
    this.blockClass = blockClass
    this.listClass = `${this.blockClass}__list`
    this.headerClass = `${blockClass}__header`
    this.hearedRowClass = `${this.headerClass}-row`

    this.rowClass = `row`
    this.logoClass = `${this.rowClass}__logo`
    this.cellClass = `${this.rowClass}__cell`
    this.cellContentClass = `${this.cellClass}-content`

    this.indicatorsClass = `${this.rowClass}__indicators`
    this.indicatorClass = `${this.rowClass}__indicator`
    this.indicatorNotesClass = `${this.indicatorClass}_notes`
    this.indicatorCommentsClass = `${this.indicatorClass}_comments`
    this.indicatorQuestionClass = `${this.indicatorClass}_questions`

    this.actionsClass = `${this.rowClass}__actions`
    this.actionClass = `${this.rowClass}__action`
    this.loaderClass = `${this.rowClass}__loader`
    this.actionContentClass = `${this.actionClass}-content`
    this.actionContentStartClass = `${this.actionContentClass}_start`
    this.actionContentPauseClass = `${this.actionContentClass}_pause`
    this.actionContentLoadingClass = `${this.actionContentClass}_loading`
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
      pause: {
        title: 'Pause',
        alt: 'tasks-pause',
        src: 'img/tasks/tasks-pause.png',
        onclick: this.onStartClick,
      },
    }
  }

  addTable() {
    this.list = document.createElement('div')
    this.list.classList.add(this.listClass)
    this.block.replaceChildren(this.list)
  }

  addHeader(data) {
    this.header = document.createElement('div')
    this.header.classList.add(this.hearedRowClass)
    const properties = Object.keys(Object.values(data)[0])

    const headerLogo = document.createElement('div')
    headerLogo.classList.add(this.logoClass)
    this.header.appendChild(headerLogo)

    properties.forEach((header) => {
      const headerCell = document.createElement('div')
      headerCell.classList.add(this.headerClass)
      headerCell.innerHTML = `${header.toUpperCase()}`
      this.header.appendChild(headerCell)
    })

    const headerActions = document.createElement('div')
    headerActions.classList.add(this.actionsClass)
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

    const rowIndicators = this.createIndicators()
    row.appendChild(rowIndicators)

    const rowActions = this.createRowActions()
    row.appendChild(rowActions)
    this.list.appendChild(row)
  }

  // removeRowById(id) {
  //   const elements = this.list.querySelectorAll(`div[${this.key}='${id}']`)
  //   console.log(elements)
  //   elements.forEach((element) => element.remove())
  // }

  // insertRow() {
  //   // parentElement.insertBefore(newElement, referenceElement);
  // }

  createRow(key) {
    const row = document.createElement('div')
    row.classList.add(this.rowClass)
    row.setAttribute(this.key, key)
    return row
  }

  createRowLogo() {
    const rowLogo = document.createElement('div')
    rowLogo.classList.add(this.logoClass)
    const logo = document.createElement('img')
    logo.setAttribute('src', 'img/tasks/tasks-marker.png')
    logo.setAttribute('alt', 'tasks-marker')
    rowLogo.appendChild(logo)
    return rowLogo
  }

  createCell(property) {
    const [header, value] = property
    const cell = document.createElement('div')
    cell.classList.add(this.cellClass)
    cell.classList.add(`${this.cellClass}_${header}`)
    cell.setAttribute('title', value)
    cell.setAttribute('key', header)
    const content = document.createElement('div')
    content.classList.add(this.cellContentClass)
    content.innerHTML = value
    cell.appendChild(content)
    return cell
  }

  createIndicators() {
    const indicators = document.createElement('div')
    indicators.classList.add(this.indicatorsClass)
    const notesIndicator = document.createElement('div')
    notesIndicator.classList.add(this.indicatorClass)
    notesIndicator.classList.add(this.indicatorNotesClass)
    const commentsIndicator = document.createElement('div')
    commentsIndicator.classList.add(this.indicatorCommentsClass)
    commentsIndicator.classList.add(this.indicatorClass)
    const questionsIndicator = document.createElement('div')
    questionsIndicator.classList.add(this.indicatorQuestionClass)
    questionsIndicator.classList.add(this.indicatorClass)

    indicators.appendChild(notesIndicator)
    indicators.appendChild(commentsIndicator)
    indicators.appendChild(questionsIndicator)
    return indicators
  }

  createRowActions() {
    const rowActions = document.createElement('div')
    rowActions.classList.add(this.actionsClass)
    rowActions.appendChild(this.createAction('edit'))
    rowActions.appendChild(this.createAction('comment'))
    rowActions.appendChild(this.createAction('start'))
    return rowActions
  }

  createAction(name) {
    const action = document.createElement('div')
    action.classList.add(this.actionClass)

    const actionContent = document.createElement('img')
    actionContent.classList.add(this.actionContentClass)
    actionContent.setAttribute('src', this.actions[name].src)
    actionContent.setAttribute('alt', this.actions[name].alt)
    actionContent.setAttribute('title', this.actions[name].title)

    if (name === 'start') {
      actionContent.classList.add(this.actionContentStartClass)
      action.appendChild(this.createPauseActionContent())
      action.appendChild(this.createLoadingContent())
    }

    action.appendChild(actionContent)
    action.onclick = this.actions[name].onclick
    return action
  }

  createPauseActionContent() {
    const actionPauseContent = document.createElement('img')
    actionPauseContent.classList.add(this.actionContentClass)
    actionPauseContent.classList.add(this.actionContentPauseClass)
    actionPauseContent.setAttribute('src', this.actions.pause.src)
    actionPauseContent.setAttribute('alt', this.actions.pause.alt)
    actionPauseContent.setAttribute('title', this.actions.pause.title)
    return actionPauseContent
  }

  createLoadingContent() {
    const actionLoadingContent = document.createElement('span')
    actionLoadingContent.classList.add(this.loaderClass)
    actionLoadingContent.classList.add(this.actionContentLoadingClass)
    return actionLoadingContent
  }

  onEditClick = onEdit
  onCommentClick = onComment
  onStartClick = onStart
}
