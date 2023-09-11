export function isNotSuccess(response) {
  return response.result !== 'success'
}

export function isNotValidUser(response) {
  return response.data.status !== 'accepted'
}
