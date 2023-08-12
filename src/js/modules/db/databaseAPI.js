export default class DatabaseAPI {
  SCRIPT_ID =
    'AKfycbyy0KOn4EZZwAjtVeztBwgXlz_7dtIEoW_clMNe8HHmS_0NM94ID123osKpbuPruNMHfA'

  constructor() {
    this.baseUrl = `https://script.google.com/macros/s/${this.SCRIPT_ID}/exec`
  }

  async requestTasks() {
    const url = this.generateUrl({ sheet: 'TASKS' })
    const response = await fetch(url)
    return await response.json()
  }

  generateUrl(params) {
    const requestParams = Object.entries(params)
      .filter((parameter) => !parameter.includes(undefined))
      .map((parameter) => parameter.join('='))
      .join('&')
    return `${this.baseUrl}?${requestParams}`
  }
}
