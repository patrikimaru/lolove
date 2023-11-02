const words = ["kantutansexiyot","pengejabi","galunggong","labyulolove"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array(selectedWord.length).fill("_");
let remainingAttempts = 6;
let hintsLeft = 3;
let gameOver = false;

const wordDisplay = document.getElementById("word-display");
wordDisplay.textContent = guessedWord.join(" ");

const livesDisplay = document.getElementById("remaining-lives");
livesDisplay.textContent = `Lives: ${remainingAttempts}`;

const hintsDisplay = document.getElementById("hints");
hintsDisplay.textContent = `Hints left: ${hintsLeft}`;

const alphabetButtons = document.getElementById("alphabet-buttons");
const buttons = [];

for (let letter of "abcdefghijklmnopqrstuvwxyz") {
    const button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", () => {
        if (!gameOver) {
            handleGuess(letter, button);
            checkWinCondition();
        }
    });
    alphabetButtons.appendChild(button);
    buttons.push(button);
}

const hintButton = document.getElementById("hint-button");
hintButton.addEventListener("click", () => {
    useHint();
    checkWinCondition();
});

const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", () => {
    restartGame();
});

function handleGuess(letter, button) {
    button.disabled = true;

    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
        wordDisplay.textContent = guessedWord.join(" ");
    } else {
        remainingAttempts--;
        livesDisplay.textContent = `Lives: ${remainingAttempts}`;
        if (remainingAttempts === 0) {
            gameOver = true;
            restartButton.style.display = "block";
            hintButton.style.display = "none";
            alert("Game over! The word was: " + selectedWord);
        }
    }
}

function useHint() {
    if (hintsLeft > 0) {
        const hiddenIndices = [];
        for (let i = 0; i < selectedWord.length; i++) {
            if (guessedWord[i] === "_") {
                hiddenIndices.push(i);
            }
        }

        if (hiddenIndices.length > 0) {
            const randomIndex = hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];
            guessedWord[randomIndex] = selectedWord[randomIndex];
            wordDisplay.textContent = guessedWord.join(" ");
            hintsLeft--;
            hintsDisplay.textContent = `Hints left: ${hintsLeft}`;
        }
    }
}

function checkWinCondition() {
    if (guessedWord.join("") === selectedWord) {
        gameOver = true;
        restartButton.style.display = "block";
        hintButton.style.display = "none";
        alert("Happy Monthsary lolove ko! Congrats po hehe " + selectedWord);
    }
}

function restartGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(selectedWord.length).fill("_");
    remainingAttempts = 6;
    hintsLeft = 3;
    gameOver = false;
    wordDisplay.textContent = guessedWord.join(" ");
    livesDisplay.textContent = `Lives: ${remainingAttempts}`;
    hintsDisplay.textContent = `Hints left: ${hintsLeft}`;
    restartButton.style.display = "none";
    for (let button of buttons) {
        button.disabled = false;
    }
}