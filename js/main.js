const inputNumber = document.querySelector(".inputNumber")
const resetButton = document.querySelector(".resetButton")
const equalButton = document.querySelector(".equalButton")
const addButton = document.querySelector("#addButton")
const substractButton = document.querySelector("#substractButton")
const multiplicationButton = document.querySelector("#multiplicationButton")
const divisionButton = document.querySelector("#divisionButton")
const resultValue = document.querySelector("#resultValue")
const logInformation = document.querySelector("#logInformation")

let result = null
let firstnumber = 0
let operationLogBuffer = ""
let lastOp = null

function pipeInputToBuffer() {
  operationLogBuffer += inputNumber.value

}

function commitOperationBuffer() {
  logInformation.textContent += `\n${operationLogBuffer}`
  operationLogBuffer = ""
}

function resetCalculator() {
  inputNumber.value = ""
  resultValue.value = ""
  result = null
  lastOp = null
  operationLogBuffer = ""
}

function handleOperation(operationType) {
  if (inputNumber.value == "" && result == null) {
    return
  }

  if (result == null) {
    result = Number(inputNumber.value)
  }

  compute()

  lastOp = operationType

  pipeInputToBuffer()

  operationLogBuffer += " " + operationType
  inputNumber.value = ""
}

function compute() {
  const numericValue = Number(inputNumber.value)

  if (lastOp != null) {
    switch (lastOp) {
      case '+':
        result += numericValue
        break;
      case '-':
        result -= numericValue
        break;
      case '*':
        result *= numericValue
        break;
      case '/':
        result /= numericValue
        break;
    }
  }
}

function handleEqualsClicks() {
  if (lastOp != null) {
    compute()
  } else {
    result = Number(inputNumber.value)
  }

  lastOp = null

  pipeInputToBuffer()

  operationLogBuffer += " = " + result
  commitOperationBuffer()
  operationLogBuffer += result
  resultValue.value = result
  inputNumber.value = ""
}

addButton.addEventListener('click', () => handleOperation('+'))
substractButton.addEventListener('click', () => handleOperation('-'))
multiplicationButton.addEventListener('click', () => handleOperation('*'))
divisionButton.addEventListener('click', () => handleOperation('/'))
resetButton.addEventListener('click', resetCalculator)
equalButton.addEventListener('click', handleEqualsClicks)