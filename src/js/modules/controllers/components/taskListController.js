import onStart from '../../actions/onStart.js'
import TaskRowController from './taskRowController.js'
import EditModalController from '../modal/editModalController.js'
import CommentModalController from '../modal/commentModalController.js'
import AuthorizationController from './authorizationController.js'
import dateTime from '../../utils/dateTime.js'

export default class TaskListController {
  constructor() {
    this.listClass = `tasks__list`
    this.rowClass = `row`
    this.actionContentClass = `row__action-content`

    this.block = document.querySelector(`.tasks`)
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
        modifier: 'row__action-content_start',
        title: 'Start',
        alt: 'tasks-start',
        src: 'img/tasks/tasks-start.png',
        onclick: this.onStartClick,
      },
      pause: {
        class: this.actionContentClass,
        modifier: 'row__action-content_pause',
        title: 'Pause',
        alt: 'tasks-pause',
        src: 'img/tasks/tasks-pause.png',
        onclick: this.onStartClick,
      },
      busy: {
        class: this.actionContentClass,
        modifier: 'row__action-content_busy',
        title: 'Busy',
        alt: 'tasks-busy',
        src: 'img/tasks/tasks-busy.png',
      },
      loader: {
        class: 'row__loader',
        modifier: 'row__action-content_loading',
        title: 'Loading',
      },
    }
  }

  addTable() {
    this.list = document.createElement('div')
    this.list.classList.add(this.listClass)
    this.block.replaceChildren(this.list)
  }

  addRow([key, properties]) {
    const row = this.createRow(key)
    row.appendChild(this.createRowLogo())
    const [number, name, responsible, editor, edited, ...states] =
      Object.entries(properties)
    ;[number, name, responsible].forEach((property) =>
      row.appendChild(this.createCell(property))
    )
    row.appendChild(this.createUpdated(editor, edited))
    states.forEach((property) => row.appendChild(this.createState(property)))
    row.appendChild(this.createIndicators())
    row.appendChild(this.createRowActions())
    this.list.appendChild(row)
  }

  getRow(key) {
    const list = document.querySelector(`.${this.listClass}`)
    const className = `.${this.rowClass}[key='${key}']`
    return list.querySelector(className)
  }

  setAuthorized(isAuthorized) {
    const list = document.querySelector(`.${this.listClass}`)
    if (!list) return
    Array.from(list.children).forEach((row) => {
      new TaskRowController(row).setAuthorized(isAuthorized)
    })
  }

  setOtherActiveTasksState(activeKey, state) {
    const list = document.querySelector(`.${this.listClass}`)
    if (!list) return

    Array.from(list.children).forEach((row) => {
      const controller = new TaskRowController(row)
      const key = controller.getKey()
      const currentState = controller.getActivityState()

      if (key === activeKey)
        return controller.setActivityState(controller.STATE.ACTIVE)
      if (currentState !== controller.STATE.ACTIVE) return
      controller.setActivityState(controller.STATE[state])
    })
  }

  createRow(key) {
    const row = document.createElement('div')
    row.classList.add(this.rowClass)
    row.setAttribute('key', key)
    return row
  }

  createRowLogo() {
    return Object.assign(document.createElement('div'), {
      className: 'row__logo',
      innerHTML: `<img
      // src="img/tasks/tasks-marker.png"
      // alt="tasks-marker"
      // ></img>`,
    })
  }

  createCell([header, value]) {
    if (header === 'edited') value = dateTime(value)
    const cell = document.createElement('div')
    cell.classList.add('row__cell')
    cell.classList.add(`row__cell_${header}`)
    cell.setAttribute('title', value)
    cell.setAttribute('key', header)
    const content = document.createElement('div')
    content.classList.add('row__cell-content')
    content.innerHTML = value
    cell.appendChild(content)
    return cell
  }

  createState([header, value]) {
    const state = document.createElement('div')
    state.classList.add('row__state')
    state.classList.add(`row__state_${header}`)
    state.setAttribute('title', value)
    state.setAttribute('key', header)
    return state
  }

  createUpdated(editor, edited) {
    const updated = document.createElement('div')
    updated.classList.add('row__updated')
    updated.appendChild(this.createCell(edited))
    updated.appendChild(this.createCell(editor))
    return updated
  }

  createIndicators() {
    const indicators = document.createElement('div')
    indicators.classList.add('row__indicators')
    const notesIndicator = document.createElement('div')
    notesIndicator.classList.add('row__indicator')
    notesIndicator.classList.add('row__indicator_notes')
    const commentsIndicator = document.createElement('div')
    commentsIndicator.classList.add('row__indicator')
    commentsIndicator.classList.add('row__indicator_comments')
    const questionsIndicator = document.createElement('div')
    questionsIndicator.classList.add('row__indicator')
    questionsIndicator.classList.add('row__indicator_questions')

    indicators.appendChild(notesIndicator)
    indicators.appendChild(commentsIndicator)
    indicators.appendChild(questionsIndicator)
    return indicators
  }

  createRowActions() {
    const rowActions = document.createElement('div')
    rowActions.classList.add('row__actions')
    if (this.isAuthorized) rowActions.style.display = 'flex'
    rowActions.appendChild(this.createAction('edit'))
    rowActions.appendChild(this.createAction('comment'))
    rowActions.appendChild(this.createAction('start'))
    return rowActions
  }

  createAction(name) {
    const action = document.createElement('div')
    action.classList.add('row__action')
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

  onEditClick = (event) => new EditModalController().show(event)

  onCommentClick = (event) => new CommentModalController().show(event)

  onStartClick = onStart

  // removeRowById(id) {
  //   const elements = this.list.querySelectorAll(`div[${this.key}='${id}']`)
  //   console.log(elements)
  //   elements.forEach((element) => element.remove())
  // }

  // insertRow() {
  //   // parentElement.insertBefore(newElement, referenceElement);
  // }
}
