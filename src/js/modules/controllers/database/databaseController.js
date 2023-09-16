export default class DatabaseController {
  SCRIPT_ID =
    'AKfycbxOnoR3KrFWInXrAukFyw8beYsUanTtR8gCd6r8xv7-927TQKxbR4C9LuaqjjNa6YXpXA'

  TASKS_SHEET = 'TASKS'
  USERS_SHEET = 'USERS'
  TIME_SHEET = 'TIME'

  constructor() {
    this.baseUrl = `https://script.google.com/macros/s/${this.SCRIPT_ID}/exec`
  }

  async requestTasks(hash) {
    const body = { action: 'tasksAuth', data: { hash } }
    return this.post(this.baseUrl, body)
  }

  async login(data) {
    const body = { action: 'login', data }
    return this.post(this.baseUrl, body)
  }

  async taskActivityClick(data) {
    const body = { action: 'task', data }
    return this.post(this.baseUrl, body)
  }

  async setFinished(data) {
    const body = { action: 'finished', data }
    return this.post(this.baseUrl, body)
  }

  async setAccepted(data) {
    const body = { action: 'accepted', data }
    return this.post(this.baseUrl, body)
  }

  async addComment(data) {
    const body = { action: 'comment', data }
    return this.post(this.baseUrl, body)
  }

  async getTimeCommentsData(data) {
    const body = { action: 'edit', data }
    return this.post(this.baseUrl, body)
  }

  async post(url, body) {
    const options = this.getPostOptions(body)
    const response = await fetch(url, options)
    return response.json()
  }

  getPostOptions(body) {
    return {
      redirect: 'follow',
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body),
    }
  }
}
