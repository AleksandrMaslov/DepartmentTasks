import dateTime from '../../utils/dateTime.js'

export default class CommentsTreeController {
  constructor() {
    this.comments = document.querySelector('.comments')
    this.commentsContent = document.querySelector('.comments__content')
  }

  clear() {
    this.commentsContent.innerHTML = ''
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

    parentElement.innerHTML += `
    <details class="comments__details">
      <summary 
        class="comments__item"
        key="${commentKey}"
        type="${type}"
        isActive="${isActive}"
        title="Created: ${responsible}\nEdited: ${dateTime(
      edited
    )}\nEditor: ${editor}"
      >
        ${text}
      </summary>
    </details>
    `
  }
}
