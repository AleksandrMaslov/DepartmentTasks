import onStart from '../../actions/onStart.js'
import TaskRowController from './taskRowController.js'
import EditModalController from '../modal/editModalController.js'
import CommentModalController from '../modal/commentModalController.js'
import AuthorizationController from './authorizationController.js'

export default class TaskListController {
  constructor() {
    this.blockClass = 'tasks'
    this.listClass = `${this.blockClass}__list`
    this.headerClass = `${this.blockClass}__header`
    this.hearedRowClass = `${this.headerClass}-row`

    this.rowClass = `row`
    this.logoClass = `${this.rowClass}__logo`
    this.cellClass = `${this.rowClass}__cell`
    this.stateClass = `${this.rowClass}__state`
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
    this.actionContentBusyClass = `${this.actionContentClass}_busy`
    this.key = 'key'
    this.block = document.querySelector(`.${this.blockClass}`)

    this.isAuthorized = new AuthorizationController().getKey()

    this.actions = {
      edit: {
        class: this.actionContentClass,
        modifier: undefined,
        title: 'Edit',
        alt: 'tasks-edit',
        src: 'img/tasks/tasks-edit.png',
        onclick: this.onEditClick,
      },
      comment: {
        class: this.actionContentClass,
        modifier: undefined,
        title: 'Comment',
        alt: 'tasks-comment',
        src: 'img/tasks/tasks-comment.png',
        onclick: this.onCommentClick,
      },
      start: {
        class: this.actionContentClass,
        modifier: this.actionContentStartClass,
        title: 'Start',
        alt: 'tasks-start',
        src: 'img/tasks/tasks-start.png',
        onclick: this.onStartClick,
      },
      pause: {
        class: this.actionContentClass,
        modifier: this.actionContentPauseClass,
        title: 'Pause',
        alt: 'tasks-pause',
        src: 'img/tasks/tasks-pause.png',
        onclick: this.onStartClick,
      },
      busy: {
        class: this.actionContentClass,
        modifier: this.actionContentBusyClass,
        title: 'Busy',
        alt: 'tasks-busy',
        src: 'img/tasks/tasks-busy.png',
      },
      loader: {
        class: this.loaderClass,
        modifier: this.actionContentLoadingClass,
        title: 'Loading',
      },
    }

    this.propertiesDefinition = {
      number: this.createCell,
      name: this.createCell,
      responsible: this.createCell,
      edited: this.createCell,
      time: this.createCell,
      isActive: this.createState,
      isFinished: this.createState,
      isWrong: this.createState,
      isAccepted: this.createState,
      isNoted: this.createState,
      isAsked: this.createState,
      isCommented: this.createState,
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
      const header = property[0]
      const cell = this.propertiesDefinition[header].call(this, property)
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

  setAuthorized(isAuthorized) {
    const list = document.querySelector(`.${this.listClass}`)
    if (!list) return
    Array.from(list.children).forEach((row) => {
      new TaskRowController(row).setAuthorized(isAuthorized)
    })
  }

  checkBusy(activeKey) {
    const list = document.querySelector(`.${this.listClass}`)
    if (!list) return

    Array.from(list.children).forEach((row) => {
      const controller = new TaskRowController(row)
      const key = controller.getKey()
      const state = controller.getActivityState()
      if (state !== controller.STATE.ACTIVE) return
      if (key === activeKey) return
      controller.setActivityState(controller.STATE.BUSY)
    })
  }

  uncheckPreviuos(activeKey) {
    const list = document.querySelector(`.${this.listClass}`)
    if (!list) return

    Array.from(list.children).forEach((row) => {
      const controller = new TaskRowController(row)
      const key = controller.getKey()
      const state = controller.getActivityState()
      if (state !== controller.STATE.ACTIVE) return
      if (key === activeKey) return
      controller.setActivityState(controller.STATE.NOT_ACTIVE)
    })
  }

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

  createState(property) {
    const [header, value] = property
    const state = document.createElement('div')
    state.classList.add(this.stateClass)
    state.classList.add(`${this.stateClass}_${header}`)
    state.setAttribute('title', value)
    state.setAttribute('key', header)
    return state
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
    if (this.isAuthorized) rowActions.style.display = 'flex'
    rowActions.appendChild(this.createAction('edit'))
    rowActions.appendChild(this.createAction('comment'))
    rowActions.appendChild(this.createAction('start'))
    return rowActions
  }

  createAction(name) {
    const action = document.createElement('div')
    action.classList.add(this.actionClass)
    action.appendChild(this.createActionContent(name))
    if (name !== 'start') return action
    action.appendChild(this.createActionContent('pause'))
    action.appendChild(this.createActionContent('busy'))
    action.appendChild(this.createActionContent('loader'))
    return action
  }

  createActionContent(name) {
    const content = document.createElement('img')
    content.classList.add(this.actions[name].class)
    if (this.actions[name].modifier)
      content.classList.add(this.actions[name].modifier)
    if (name === 'loader') return content
    content.setAttribute('src', this.actions[name].src)
    content.setAttribute('alt', this.actions[name].alt)
    content.setAttribute('title', this.actions[name].title)
    if (name === 'busy') return content
    content.onclick = this.actions[name].onclick
    return content
  }

  onEditClick = () => new EditModalController().show()

  onCommentClick = (event) => {
    const key = new TaskRowController(event.srcElement).getKey()
    new CommentModalController().showWithKey(key)
  }

  onStartClick = onStart
}
