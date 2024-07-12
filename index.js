const ids = ['ground', 'head', 'scaffold', 'legs', 'arms', 'body'];
let result;
let letters = [];
let chances = 0;
let guesses = [];

StartHangman();
StartLetterBoxes();


function StartHangman() {
    document.addEventListener('DOMContentLoaded', function () {
        ids.forEach(id => {
            ChangeOpacity(id, 0);
        });
    });
}

function StartLetterBoxes() {
    document.addEventListener('DOMContentLoaded', () => {
        const word = GetRandomWord();
        document.getElementById("letterbox-container").innerHTML = GenerateLetterBoxes(letters, word);
        AskPlayer(word);
    });
}

function GenerateLetterBoxes(letter, word) {
    let letterBoxes = Array(word.length).fill('');
    for (let i = 0; i < word.length; i++) {

        if (letter[i] === word[i]) {
            letterBoxes.push(`<div class="letter-box">${letter[i]}</div>`);
        } else {
            letterBoxes.push(`<div class="letter-box"></div>`);
        }


    }
    return letterBoxes.join('');
}

function ChangeOpacity(id, newOpacity) {
    let svgDocument = document.querySelector("#hangman-game").contentWindow.document;
    let element = svgDocument.getElementById(id);

    if (element) {
        element.setAttribute('opacity', newOpacity);
    }
}

function GetRandomWord() {
    const fooWords = ["monitor", "program", "application", "keyboard", "javascript", "autogenerated", "network"];
    const randomIndex = Math.floor(Math.random() * fooWords.length);
    return fooWords[randomIndex];

}

function AskPlayer(word) {
    const userInputForm = document.querySelector('.input-field-form');
    const userInput = document.querySelector("input[name='user-input']");
    userInput.addEventListener('input', function () {
        result = this.value;
    });
    userInputForm.addEventListener('submit', function (e) {
        e.preventDefault();
        result = result ? result.toLowerCase().trim() : '';
        let duplicate = CheckAnswer(result)
        if (!duplicate) {
            RevealWord(result, word);
        }
    });
}

function RevealWord(guess, word) {
    let incorrectGuess = true;
    if (guess.match(word)) {
        let letters = [...guess];
        document.getElementById("letterbox-container").innerHTML = GenerateLetterBoxes(letters, word);
        incorrectGuess = false;
    }
    for (let i = 0; i < word.length; i++) {
        if (guess === word[i]) {
            letters[i] = guess
            document.getElementById("letterbox-container").innerHTML = GenerateLetterBoxes(letters, word);
            incorrectGuess = false;
        }
    }
    guesses.push(guess);
    if (incorrectGuess) {
        ProceedHangman(ids[chances], 1)
        chances += 1;
    }
    GameOver();
}

function ProceedHangman(id, opacity) {
    ChangeOpacity(id, opacity)
}

function CheckAnswer(answer) {
    return guesses.some((guess) => guess.match(answer));
}

function GameOver() {
    const submitButton = document.querySelector("button[type='submit']");

    if (chances === 6) {
        submitButton.disabled = true;
    }
}