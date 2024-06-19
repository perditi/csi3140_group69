var mysteryString;

function str_input(){
    var input = document.getElementById("input").value.trim();
    if (!gameActive){//if the game hasn't started
        mysteryString = input;
        console.log("mysteryString received \"%s\"",mysteryString);
        mStringAsArray = Array.from(mysteryString);
        initGame();
    } else {
        guess(input);
    }
    
}

function guess(str){
    console.log("guess: %s",str)
    var letterOrWord = -1;
    var correct = null;
    if (checkIfGuessed(str)){
        updateGame(0, correct);
        return;
    }
    if (str.length > 1){//guesses the whole word/phrase
        letterOrWord = 2;
        correct = equalsIgnoringCase(mysteryString, str);
    } else if (str.length == 1){// is just one letter, i.e. is a guess
        if (GUESSES.indexOf(str) == -1){
            updateGame(-1, correct);
            return;
        }
        letterOrWord = 1;
        correct = revealLetter(str);
    }
    console.log("sending", letterOrWord, correct, "to hangman_game.js");
    updateGame(letterOrWord, correct);
}

function equalsIgnoringCase(text, other) {
    return text.localeCompare(other, undefined, { sensitivity: 'base' }) === 0;
}