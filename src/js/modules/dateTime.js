export default function dateTime(timestamp) {
  if (timestamp.length === 0) return ''
  const currentDate = new Date(+timestamp)
  const year = currentDate.getFullYear()
  let month = currentDate.getMonth() + 1
  if (month < 10) month = `0${month}`
  let day = currentDate.getDate()
  if (day < 10) day = `0${day}`
  const hours = currentDate.getHours()
  let minutes = currentDate.getMinutes()
  if (minutes < 10) minutes = `0${minutes}`
  let seconds = currentDate.getSeconds()
  if (seconds < 10) seconds = `0${seconds}`
  const date = `${year}-${month}-${day}`
  const time = `${hours}:${minutes}:${seconds}`
  return `${date} ${time}`
}
