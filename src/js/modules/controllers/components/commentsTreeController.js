import dateTime from '../../utils/dateTime.js'
import ContextMenuController from './contextMenuController.js'

export default class CommentsTreeController {
  constructor() {
    this.comments = document.querySelector('.comments')
    this.commentsContent = this.comments.querySelector('.comments__content')
  }

  clear() {
    this.commentsContent.innerHTML = ''
  }

  updateCommentData(key, data) {
    const comment = this.commentsContent.querySelector(
      `.comments__item[key="${key}"]`
    )

    const { type, isActive, text, ...users } = data
    const { responsible, editor, edited } = users

    const capitalizedType = `${type[0].toUpperCase()}${type.slice(1)}`
    const title = `${capitalizedType}\nCreated by: ${responsible}\nEdited: ${dateTime(
      edited
    )}\nEditor: ${editor}`

    comment.setAttribute('type', type)
    comment.setAttribute('title', title)
    comment.setAttribute('isActive', isActive)
    comment.innerHTML = text
  }

  addComment(data) {
    const [commentKey, properties] = data
    const { parent, key } = properties

    if (parent === key)
      return this.addCommentToElement(this.commentsContent, {
        commentKey,
        ...properties,
      })

    const parentElement = this.commentsContent
      .querySelector(`.comments__item[key="${parent}"]`)
      .closest('.comments__details')
    this.addCommentToElement(parentElement, { commentKey, ...properties })
  }

  addCommentToElement(parentElement, data) {
    const { commentKey, type, isActive, text, ...users } = data
    const { responsible, editor, edited } = users
    const capitalizedType = `${type[0].toUpperCase()}${type.slice(1)}`
    const title = `${capitalizedType}\nCreated by: ${responsible}\nEdited: ${dateTime(
      edited
    )}\nEditor: ${editor}`

    const details = document.createElement('details')
    details.className = 'comments__details'
    details.innerHTML = `
      <summary 
        class="comments__item"
        key="${commentKey}"
        type="${type}"
        isActive="${isActive}"
        title="${title}"
      >
        ${text}
      </summary>
    `
    parentElement.appendChild(details)

    const item = details.querySelector('.comments__item')
    item.oncontextmenu = (event) => {
      event.preventDefault()
      const x = event.clientX
      const y = event.clientY
      const comment = event.srcElement
      new ContextMenuController(comment).show(x, y, commentKey, isActive)
    }
  }
}
