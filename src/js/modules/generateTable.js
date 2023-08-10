export default function generateRows({ targetClass, responseData }) {
  const container = document.querySelector(`.${targetClass}`)
  const { result, data } = responseData
  if (!result === 'success') return

  container.innerHTML = `<table class='${targetClass}__table'></table>`
  const table = document.querySelector(`.${targetClass}__table`)

  const row = document.createElement('tr')
  row.classList.add(`${targetClass}__row`)
  row.innerHTML = `<th class="${targetClass}__header">id</th>`
  const properties = Object.values(data)[0]
  Object.keys(properties).forEach((property) => {
    row.innerHTML += `<th class="${targetClass}__header">${property}</th>`
  })
  table.appendChild(row)

  Object.entries(data).forEach((keyValue) => {
    const [key, properties] = keyValue
    const row = document.createElement('tr')
    row.classList.add(`${targetClass}__row`)
    row.innerHTML = `<td class="${targetClass}__cell">${key}</td>`

    Object.values(properties).forEach((property) => {
      row.innerHTML += `<td class="${targetClass}__cell">${property}</td>`
    })
    table.appendChild(row)
  })
}
