const SCRIPT_ID =
  'AKfycbxxGL8EWiPRVsN9br4PKGlBKva5ntdYjXD5xlHox2AA7DjuF2zd3mrKbfVJmS62K0euxg'

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
