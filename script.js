const display = document.querySelector("#display");
const calculation = document.querySelector("#calculation");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const clearKey = document.querySelector("#clear");
const backspaceKey = document.querySelector("#backspace");

let displayIsResettable = false;
let previousValue;
let currentValue;
let operator;
let result;

const operate = (a, b, operator) => {
  switch (operator) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      return b == 0 ? "ERROR" : a / b;
  }
};

const appendToDisplay = (num) => {
  if (display.textContent.replace(".", "").length < 9) {
    if (display.textContent == "0" || displayIsResettable) {
      display.textContent = num === "." ? "0." : num;
    } else {
      if (num === ".")
        display.textContent += display.textContent.includes(".") ? "" : num;
      else display.textContent += num;
    }
    displayIsResettable = false;
  }
};

const format = (num) => {
  max = 9 - num.toString().split(".")[0].length;
  return num === "" ? "" : Math.round(num * 10 ** max) / 10 ** max;
};

const setCalculation = (a, b = "") => {
  calculation.textContent = `${format(a)} ${
    document.getElementById(operator).textContent
  } ${format(b)}`;
};

const setValues = () => {
  currentValue = Number(display.textContent);

  if (previousValue == null) result = currentValue;
  else result = operate(previousValue, currentValue, operator);

  displayIsResettable = true;
};

const evaluate = (nextOperator) => {
  if (result === "ERROR") {
    display.textContent = result;
    calculation.textContent = "";
    reset();
  } else {
    if (nextOperator === "equals") {
      setCalculation(previousValue, currentValue);
      display.textContent = format(result);
      reset();
    } else {
      operator = nextOperator;
      setCalculation(result);
      display.textContent = "0";
      previousValue = result;
    }
  }
};

const reset = () => {
  currentValue = null;
  previousValue = null;
  operator = null;
};

const clear = () => {
  reset();
  calculation.textContent = "";
  display.textContent = "0";
};

const erase = () => {
  display.textContent =
    display.textContent.length === 1 ? 0 : display.textContent.slice(0, -1);
};

numbers.forEach((number) => {
  number.addEventListener("click", () => appendToDisplay(number.id));
});

operations.forEach((operation) => {
  operation.addEventListener("click", () => {
    setValues();
    evaluate(operation.id);
  });
});

clearKey.addEventListener("click", clear);
backspaceKey.addEventListener("click", erase);
