const button1 = document.querySelector("#button-1");
const button2 = document.querySelector("#button-2");
const button3 = document.querySelector("#button-3");
const button4 = document.querySelector("#button-4");
const button5 = document.querySelector("#button-5");
const button6 = document.querySelector("#button-6");
const button7 = document.querySelector("#button-7");
const button8 = document.querySelector("#button-8");
const button9 = document.querySelector("#button-9");
const numberButtons = [
    button1,
    button2,
    button3,
    button4,
    button5,
    button6,
    button7,
    button8,
    button9,
];

const buttonPlus = document.querySelector("#button-plus");
const buttonMinus = document.querySelector("#button-minus");
const buttonMultiply = document.querySelector("#button-multiply");
const operationButtons = [
    buttonPlus,
    buttonMinus,
    buttonMultiply,
];

const screen = document.querySelector(".screen");

let step = 0;
let calcNumber1;
let calcOperation;
let calcNumber2;

for (const numberButton of numberButtons) {
    numberButton.addEventListener("click", () => {
        const number = Number(numberButton.innerHTML);
        if (step === 0) {
            calcNumber1 = number;
            step++;
            screen.innerHTML = "";
            screen.innerHTML += number;
        }
        if (step === 2) {
            calcNumber2 = number;
            step = 0;
            screen.innerHTML += number;
            screen.innerHTML += "=";
            screen.innerHTML += calculateResult();
        }
    });
}

for (const operationButton of operationButtons) {
    operationButton.addEventListener("click", () => {
        const operation = operationButton.innerHTML;
        if (step === 1) {
            calcOperation = operation;
            step++;
            screen.innerHTML += operation;
        }
    });
}

const calculateResult = () => {
    if (calcOperation === "+") {
        return calcNumber1 + calcNumber2;
    }
    if (calcOperation === "-") {
        return calcNumber1 - calcNumber2;
    }
    if (calcOperation === "x") {
        return calcNumber1 * calcNumber2;
    }
};