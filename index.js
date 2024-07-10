const ids = ['head', 'body', 'arms', 'legs', 'scaffold', 'ground'];
document.addEventListener('DOMContentLoaded', function () {
    ids.forEach(id => {
        ChangeOpacity(id, 0);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const {word, hiddenWord} = GetRandomWord();
    document.getElementById("letterbox-container").innerHTML = GenerateLetterBoxes(hiddenWord);

    //TODO steg att sedan fixa
    AskPlayer();
    RevealWord(word, hiddenWord);
});

function GenerateLetterBoxes(hiddenWord) {
    return hiddenWord.map(_ => '<div class="letter-box"></div>').join('');
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
    const word = fooWords[randomIndex];
    const hiddenWord = MakeWordHidden(word);
    return {word, hiddenWord};

}

function MakeWordHidden(word) {
    return Array(word.length).fill('_');
}

function AskPlayer() {
    let result = prompt("Guess either with 1 letter or the whole word");
    result = result.toLowerCase();
    return result.trim();
}

function RevealWord(guess, word, hiddenWord) {
    if (guess.match(word)) {
        return guess;
    }
    for (let i = 0; i < word.length; i++) {
        if (guess === word[i]) {
            hiddenWord = hiddenWord.slice(0, i) + guess + hiddenWord.slice(i + 1);
        }
    }
    return hiddenWord;


}