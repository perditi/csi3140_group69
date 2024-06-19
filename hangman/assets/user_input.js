function str_input(){
    var input = document.getElementById("input").value;
    if (!gameActive){//if the game hasn't started
        mysteryString = input;
        console.log("mysteryString received \"%s\"",mysteryString);
        gameArray = Array.from(mysteryString);
        initGame();
    } else {
        guess(input);
    }
    
}

function guess(str){
    var letterOrWord = -1;
    var correct = null;
    //TODO: cross ref with guessed list,  set letterOrWord to 0 if guessed already
    if (length.str > 1){//guesses the whole word/phrase
        letterOrWord = 2;
        correct = equalsIgnoringCase(mysteryString, mysteryString.trim());
    } else if (length.str == 1){// is just one letter, i.e. is a guess
        letterOrWord = 1;
    }
    updateGame(letterOrWord, correct);
}

function equalsIgnoringCase(text, other) {
    return text.localeCompare(other, undefined, { sensitivity: 'base' }) === 0;
}