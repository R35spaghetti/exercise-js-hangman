function GetRandomWord() {
    const fooWords = ["monitor", "program", "application", "keyboard", "javascript", "autogenerated", "network"];
    const randomIndex = Math.floor(Math.random() * fooWords.length);
    return fooWords[randomIndex];
}

function MakeWordHidden(word) {
    let hiddenWord = '';
    for (let i = 0; i < word.length; i++) {
        hiddenWord += ' _';
    }
    return hiddenWord;

}

function AskPlayer() {
    return prompt("Guess either with 1 letter or the whole word");
}