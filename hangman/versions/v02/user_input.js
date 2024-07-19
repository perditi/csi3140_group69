//file for handling certain UI functions in the html
var mysteryString;
var gameActive = false;

function str_input() { //input handler
    var input = document.getElementById("input").value.trim();
    if (input.length < 1) {
        window.alert("Invalid input!");
        clearTextBox();
        return;
    } else if (input.length == 1 && (input.toLowerCase() < "a" || input.toLowerCase() > "z")){
        console.log("does this work?)");
        window.alert("Invalid input!");
        clearTextBox();
        return;
    }
    clearTextBox();
    if (!gameActive) {
        initGame(input);
    } else {
        guess(input);
    }
}

function changeTextBox(){
    if (!gameActive){
        document.getElementById("input").placeholder = "set word...";
        clearTextBox();
        document.getElementById("guess_button").innerHTML= "submit";
    } else {
        document.getElementById("input").placeholder = "guess...";
        clearTextBox();
        document.getElementById("guess_button").innerHTML= "go on, guess";
    }
}

function initGame(word) { 
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'hangman.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
            var response = JSON.parse(xhr.responseText);
            if (response.gameActive) {  //if game is active (from the php logic)
                gameActive = true;
                mysteryString = word;
                updateDisplay(response.mStringBlanksIndices);
            }
        }
    };

    var data = JSON.stringify({ "action": "init", "word": word });
    xhr.send(data);
    changeTextBox();
}

function guess(str) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'hangman.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.error) {
                window.alert(response.error);
                return;
            }
            updateDisplay(response.mStringBlanksIndices);
            if (response.gameOver) {
                gameActive = false;
                window.alert("You " + response.gameOver + "!");
            }
        }
    };

    var data = JSON.stringify({ "action": "guess", "guess": str });
    xhr.send(data);
}

//everything after this point is about the same

function updateDisplay(mStringBlanksIndices) {
    var result = "";
    for (var i = 0; i < mStringBlanksIndices.length; i++) {
        if (mStringBlanksIndices[i] == 1) {
            result += mysteryString[i];
        } else {
            result += "_";
        }
    }
    document.getElementById("display-text").innerText = result;
}

//allows for enter key to be used to submit
document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        str_input();
    }
});

function clearTextBox() {
    document.getElementById("input").value = "";
    document.getElementById("input").focus();
}

