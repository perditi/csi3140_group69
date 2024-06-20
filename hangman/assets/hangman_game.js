var gameActive = false;
var hangmanState = 0; //number of wrong guesses, basically.
// head (1), body (2), arm (3), arm (4), leg (5), leg (6). 6 wrong guesses.


function initGame(){
    gameActive = true;
    hangmanState = 0;
    changeTextBox();
    reset_data();
    ericInvisible();
    generateBlanks();
    updateDisplay();
}

/*
letterOrWord:
-1 is invalid guess (only really happens with empty input)
0 is repeated guess
1 is letter
2 is word

correct:
false is a wrong guess
true is a correct guess

(whole word/phrase guesses don't reveal more letters)
*/
function updateGame(letterOrWord, correct){
    if (letterOrWord == -1){
        console.log("invalid input");
        window.alert("Invalid input!");
        return;
    }
    if (letterOrWord == 0){
        console.log("repeated guess");
        window.alert("Repeated guess!");
        return;
    }
    if (correct){//correct guess
        if (letterOrWord == 1){//correct letter guess
            updateDisplay();
            if (isAllGuessed()){
                gameWin();
            }
        } else {//correct phrase guess
            console.log("heere");
            document.getElementById("display-text").innerHTML=mysteryString;
            
            console.log("heere2");
            gameWin();
            console.log("heere3");
        }
    } else {//incorrect guess
        hangmanState++;
        updateEricVisiblity(hangmanState);
        if (hangmanState == 6){
            gameLose();
        }
    }
}

function gameWin(){
    console.log("gamewin called");
    gameActive = false;
    changeTextBox();
    console.log("middle");
    window.alert("You win!");
}

function gameLose(){
    console.log("gamelose called");
    gameActive = false;
    changeTextBox();
    window.alert("You lose!");
    document.getElementById("display-text").innerHTML=mysteryString;
}

function winAlert(){
    
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

function clearTextBox(){
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

function ericVisible(){
    document.getElementById("eric-head").style.visibility = "visible";
    document.getElementById("eric-torso").style.visibility = "visible";
    document.getElementById("eric-leftarm").style.visibility = "visible";
    document.getElementById("eric-rightarm").style.visibility = "visible";
    document.getElementById("eric-leftleg").style.visibility = "visible";
    document.getElementById("eric-rightleg").style.visibility = "visible";
    document.getElementById("eric-leftfoot").style.visibility = "visible";
    document.getElementById("eric-rightfoot").style.visibility = "visible";
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