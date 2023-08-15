export default class DatabaseAPI {
  SCRIPT_ID =
    'AKfycbwW1Dx_lkpFncP-7h5O6cG_jpYUJAszOl8TZGyCCZZqh7y1DPm_9jR5ndmyiaKOX3iAxA'

  constructor() {
    this.baseUrl = `https://script.google.com/macros/s/${this.SCRIPT_ID}/exec`
  }

  async requestTasks() {
    const url = this.getUrl({ sheet: 'TASKS' })
    const response = await fetch(url)
    return await response.json()
  }

  async setCellData(key, header, value) {
    const property = Object.fromEntries([[header, value]])
    const row = Object.fromEntries([[key, property]])
    const body = { action: 'update', data: row }

    const url = this.getUrl({ sheet: 'TASKS' })
    const options = this.getPostOptions(body)
    const response = await fetch(url, options)
    return await response.json()
  }

  async switchState(key, header, currentState) {
    const newState = currentState === '0' ? '1' : '0'
    return await this.setCellData(key, header, newState)
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
