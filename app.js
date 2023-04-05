class Calculator {
  constructor(result) {
    this.result = result;
    this.reset();
  }

  reset() {
    this.currentOperation = "";
    this.previousOperation = "";
    this.operator = undefined;
  }

  chooseOperation(operation) {
    if (this.currentOperation == "") return;
    if (this.operator) this.compute();
    this.operator = operation;
    this.previousOperation = this.currentOperation; //
    this.currentOperation = "";
  }

  compute() {
    let computedResult;
    const prev = parseFloat(this.previousOperation);
    const current = parseFloat(this.currentOperation);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operator) {
      case "+":
        computedResult = prev + current;
        break;

      case "-":
        computedResult = prev - current;
        break;

      case "/":
        computedResult = prev / current;
        break;

      case "×":
        computedResult = prev * current;
        break;

      default:
        break;
    }
    // this.operator = undefined;
    this.currentOperation = computedResult.toString();
    this.previousOperation = "";
  }

  delete() {
    this.currentOperation = this.currentOperation.toString().slice(0, -1);
  }

  updateInput(number) {
    if (number == "." && this.currentOperation.includes(".")) return; // return if dot is already in the equation
    this.currentOperation = this.currentOperation.toString() + number; // add selected number to currentOperation
  }

  displayInput() {
    if (this.previousOperation && this.operator) {
      this.result.innerText = `${this.previousOperation} ${this.operator} ${this.currentOperation}`;
    } else if (this.previousOperation && !this.operator) {
      this.result.innerText = this.previousOperation;
    } else {
      this.result.innerText = this.currentOperation;
    }
  }
}

// selectors
const numberBtn = document.querySelectorAll("[data-number]");
const operationBtn = document.querySelectorAll("[data-operend]");
const screenOutput = document.querySelector(".calculator-output h1");
const deleteBtn = document.querySelector("[data-delete]");
const resetBtn = document.querySelector("[data-reset]");
const equalsBtn = document.querySelector("[data-equals]");
const switchBtn = document.querySelectorAll("input[type='radio']");

const calculator = new Calculator(screenOutput);

numberBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.updateInput(btn.innerText);
    calculator.displayInput();
  });
});

operationBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.chooseOperation(btn.innerText);
    calculator.displayInput();
  });
});

equalsBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.displayInput();
});

resetBtn.addEventListener("click", () => {
  calculator.reset();
  calculator.displayInput();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.displayInput();
});

const changeTheme = () => {
  switchBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.body.className = btn.id;
    });
  });
};

window.addEventListener("DOMContentLoaded", () => {
  changeTheme();
});
