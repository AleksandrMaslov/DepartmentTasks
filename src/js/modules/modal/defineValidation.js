export default function defineValidation() {
  defineTextValidation()
  defineSelectValidation()
}

function defineTextValidation() {
  const validationMessage = "Remark can't be blank"
  const textArea = document.querySelector('.comment-form__textarea')
  textArea.oninvalid = (e) => {
    e.target.setCustomValidity(validationMessage)
  }
  textArea.oninput = (e) => {
    e.target.setCustomValidity('')
  }
}

function defineSelectValidation() {
  const validationMessage = 'Select Remark type'
  const selectInput = document.querySelector('.comment-form__select')
  selectInput.oninvalid = (e) => {
    e.target.setCustomValidity(validationMessage)
  }
  selectInput.oninput = (e) => {
    e.target.setCustomValidity('')
  }
}
