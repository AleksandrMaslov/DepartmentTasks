const SCRIPT_ID =
  'AKfycbyy0KOn4EZZwAjtVeztBwgXlz_7dtIEoW_clMNe8HHmS_0NM94ID123osKpbuPruNMHfA'

const PARAMS = {
  sheet: 'TASKS',
}

const requestParams = Object.entries(PARAMS)
  .filter((parameter) => !parameter.includes(undefined))
  .map((parameter) => parameter.join('='))
  .join('&')
const url = `https://script.google.com/macros/s/${SCRIPT_ID}/exec?${requestParams}`

export default async function requestTasks() {
  const response = await fetch(url)
  const data = await response.json()
  return data
}
