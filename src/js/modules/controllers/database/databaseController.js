export default class DatabaseController {
  SCRIPT_ID =
    'AKfycbwW1Dx_lkpFncP-7h5O6cG_jpYUJAszOl8TZGyCCZZqh7y1DPm_9jR5ndmyiaKOX3iAxA'

  TASKS_SHEET = 'TASKS'
  USERS_SHEET = 'USERS'

  constructor() {
    this.baseUrl = `https://script.google.com/macros/s/${this.SCRIPT_ID}/exec`
  }

  async requestTasks() {
    const url = this.getUrl({ sheet: this.TASKS_SHEET })
    const response = await fetch(url)
    return await response.json()
  }

  async login({ login, password }) {
    const body = { action: 'login', data: { login, password } }
    const url = this.getUrl({ sheet: this.USERS_SHEET })
    return await this.post(url, body)
  }

  async authorize(hash) {
    const body = { action: 'authorize', data: { hash } }
    const url = this.getUrl({ sheet: this.USERS_SHEET })
    return await this.post(url, body)
  }

  async switchState(key, header, currentState) {
    const newState = currentState === '0' ? '1' : '0'
    return await this.setCellData(key, header, newState)
  }

  async setCellData(key, header, value) {
    const property = Object.fromEntries([[header, value]])
    const row = Object.fromEntries([[key, property]])
    const body = { action: 'update', data: row }
    const url = this.getUrl({ sheet: this.TASKS_SHEET })
    return await this.post(url, body)
  }

  async post(url, body) {
    const options = this.getPostOptions(body)
    const response = await fetch(url, options)
    return await response.json()
  }

  getUrl(params) {
    const requestParams = Object.entries(params)
      .filter((parameter) => !parameter.includes(undefined))
      .map((parameter) => parameter.join('='))
      .join('&')
    return `${this.baseUrl}?${requestParams}`
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
