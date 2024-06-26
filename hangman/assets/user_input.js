var mysteryString;

function str_input(){
    var input = document.getElementById("input").value.trim();
    if (input.length < 1){
        window.alert("Invalid input!");
        return;
    }
    clearTextBox();
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
    if (checkIfGuessed(str.toLowerCase())){
        updateGame(0, correct);
        return;
    }
    if (str.length > 1){//guesses the whole word/phrase
        letterOrWord = 2;
        correct = equalsIgnoringCase(mysteryString, str);
        var testForInvalidChar = Array.from(str);
        for (var i = 0; i < testForInvalidChar.length; i++){//if the string guess has an invalid character in it
            if (GUESSES.indexOf(testForInvalidChar[i].toLowerCase()) == -1){
                letterOrWord = -1;
            }
        }
    } else if (str.length == 1){// is just one letter, i.e. is a guess
        if (GUESSES.indexOf(str.toLowerCase()) == -1){
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

// Execute a function when the user presses a key on the keyboard
document.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    str_input();
    }
});