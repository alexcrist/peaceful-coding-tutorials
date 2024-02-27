const correctWord = "often";

const containerElement = document.querySelector(".container");
const numRows = 6;
const numCols = 5;
for (let i = 0; i < numRows; i++) {
    const rowElement = document.createElement("div");
    for (let j = 0; j < numCols; j++) {
        const cellElement = document.createElement("div");
        rowElement.appendChild(cellElement);
    }
    containerElement.appendChild(rowElement);
}

let guessIndex = 0;

const buttonElement = document.querySelector("button");
const inputElement = document.querySelector("input");
buttonElement.addEventListener("click", () => {
    const guess = inputElement.value;
    inputElement.value = "";
    if (guess.length !== 5) {
        alert("Invalid guess length.");
        return;
    }
    const rows = document.querySelectorAll(".container > div");
    const row = rows[guessIndex];
    const cells = row.querySelectorAll("div");
    const colorMap = determineGuessColorMap(guess, correctWord);
    for (let i = 0; i < guess.length; i++) {
        const letter = guess[i];
        const color = colorMap[i];
        const cell = cells[i];
        cell.innerText = letter;
        cell.style.backgroundColor = color;
    }
    guessIndex++;
});

const determineGuessColorMap = (guess, correctWord) => {

    // Start letters as grey
    const colorMap = ["grey", "grey", "grey", "grey", "grey"];

    for (let i = 0; i < guess.length; i++) {
        const guessLetter = guess[i];
        const correctLetter = correctWord[i];
        
        // Look for greens
        if (guessLetter === correctLetter) {
            colorMap[i] = "green";
        }
        
        // Look for yellows
        else {
            let numGreyLettersForGuessLetter = 0;
            for (let j = 0; j < guess.length; j++) {
                if (guess[j] === guessLetter && colorMap[j] === "grey") {
                    numGreyLettersForGuessLetter++;
                }
            }
            if (
                correctWord.includes(guessLetter) &&
                numGreyLettersForGuessLetter > 0
            ) {
                colorMap[i] = "yellow";
            }
        }
    }
    return colorMap;
};
