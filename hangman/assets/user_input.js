var mysteryString;
var gameArray;

function str_input(){
    var input = document.getElementById("input").value.trim();
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
    console.log("guess: %s",str)
    var letterOrWord = -1;
    var correct = null;
    //TODO: cross ref with guessed list,  set letterOrWord to 0 if guessed already
    if (str.length > 1){//guesses the whole word/phrase
        letterOrWord = 2;
        correct = equalsIgnoringCase(mysteryString, str);
    } else if (str.length == 1){// is just one letter, i.e. is a guess
        letterOrWord = 1;
        //TODO: find letter in mysteryString
    }
    console.log("sending", letterOrWord, correct, "to hangman_game.js");
    updateGame(letterOrWord, correct);
}

function equalsIgnoringCase(text, other) {
    return text.localeCompare(other, undefined, { sensitivity: 'base' }) === 0;
}