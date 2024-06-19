var gameActive = false;
var hangmanState = 0; //number of wrong guesses, basically.
// head (1), body (2), arm (3), arm (4), leg (5), leg (6). 6 wrong guesses.


function initGame(){
    gameActive = true;
    hangmanState = 0;
    generateBlanks();
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
        return;
    }
    if (letterOrWord == 0){
        console.log("repeated guess");
        return;
    }
    if (correct){//correct guess
        if (letterOrWord == 1){//correct letter guess
            //TODO: reveal letters. if all letters revealed, game win
        } else {//correct phrase guess
            //TODO: implement game win
        }
    } else {//incorrect guess
        if (letterOrWord == 1){//incorrect letter guess
            hangmanState++;
            //TODO: add letter to incorrect letter list.
        } else {//incorrect phrase guess
            hangmanState++;
        }
        if (hangmanState == 6){
            //TODO: implement game lose
        }
    }
}

function gameWin(){

}


function gameLose(){

}

function gameRestart(){
    gameActive = false;
    hangmanState = 0;
    mysteryString = null;
    reset_data();
}
