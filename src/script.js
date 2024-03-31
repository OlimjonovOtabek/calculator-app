class Calculator {
  constructor(screenElementId) {
    this.screen = document.getElementById(screenElementId);
    this.buttons = document.querySelectorAll("button");
    this.screenValue = "";

    this.initialize();
  }

  initialize() {
    this.screen.readOnly = true;
    this.addEventListeners();
    this.addKeyboardListeners();
  }

  addEventListeners() {
    this.buttons.forEach((button) => {
      button.addEventListener("click", this.handleButtonClick.bind(this));
    });
  }
  addKeyboardListeners() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace') {
        this.handleBackspace();
      } else if (event.key === 'Enter') {
        this.evaluateExpression();
      } //ask teacher for help why enter and backspace are not working
    });
  }

  handleBackspace() {
    this.screenValue = this.screenValue.slice(0, -1);
    this.updateScreenValue();
  }

  handleButtonClick(e) {
    console.log(e);
    const buttonText = e.target.innerText;
    if (buttonText === "=") {
      this.evaluateExpression();
    } else if (buttonText === "C") {
      this.clearScreen();
    } else {
      this.updateScreen(buttonText);
    }
  }

  evaluateExpression() {
    try {
      const result = eval(this.screenValue);
      this.screenValue = result.toString();
      this.updateScreenValue();
    } catch (error) {
      this.handleError();
    }
  }

  clearScreen() {
    this.screenValue = "";
    this.updateScreenValue();
  }

  updateScreen(buttonText) {
    this.screenValue += buttonText;
    this.updateScreenValue();
  }

  updateScreenValue() {
    this.screen.value = this.screenValue;
  }

  handleError() {
    alert("Please input a valid expression");
    this.clearScreen();
  }
}

const calculator = new Calculator("answer");
