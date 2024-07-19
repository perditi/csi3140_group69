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
    console.log("changing txt box");
    if (!gameActive){
        console.log("game not active");
        document.getElementById("input").placeholder = "set word...";
        clearTextBox();
        document.getElementById("guess_button").innerHTML= "submit";
    } else {
        console.log("game active");
        document.getElementById("input").placeholder = "guess...";
        clearTextBox();
        document.getElementById("guess_button").innerHTML= "go on, guess";
    }
}

function initGame(word) { 
    ericInvisible();

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'hangman.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
            var response = JSON.parse(xhr.responseText);
            if (response.gameActive) {  //if game is active (from the php logic)
                gameActive = true;
                changeTextBox();
                mysteryString = word;
                updateDisplay(response.mStringBlanksIndices);
            }
        }
    };

    var data = JSON.stringify({ "action": "init", "word": word });
    xhr.send(data);
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
            updateEricVisiblity(response.hangmanState);
            if (response.gameOver) {
                gameActive = false;
                changeTextBox();
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

//UI utility functions
function clearTextBox() {
    document.getElementById("input").value = "";
    document.getElementById("input").focus();
}

function ericInvisible(){
    document.getElementById("eric-head").style.visibility = "hidden";
    document.getElementById("eric-torso").style.visibility = "hidden";
    document.getElementById("eric-leftarm").style.visibility = "hidden";
    document.getElementById("eric-rightarm").style.visibility = "hidden";
    document.getElementById("eric-leftleg").style.visibility = "hidden";
    document.getElementById("eric-rightleg").style.visibility = "hidden";
    document.getElementById("eric-leftfoot").style.visibility = "hidden";
    document.getElementById("eric-rightfoot").style.visibility = "hidden";
}

function updateEricVisiblity(n){
    console.log("updating eric");

    switch (n){
        case 0:
            ericInvisible();
            break;
        case 1:
            document.getElementById("eric-head").style.visibility = "visible";
            break;
        case 2:
            document.getElementById("eric-torso").style.visibility = "visible";
            break;
        case 3:
            document.getElementById("eric-leftarm").style.visibility = "visible";
            break;
        case 4:
            document.getElementById("eric-rightarm").style.visibility = "visible";
            break;
        case 5:
            document.getElementById("eric-leftleg").style.visibility = "visible";
            document.getElementById("eric-leftfoot").style.visibility = "visible";
            break;
        case 6:
            document.getElementById("eric-rightleg").style.visibility = "visible";
            document.getElementById("eric-rightfoot").style.visibility = "visible";
            break;
    }
}