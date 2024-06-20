var mStringAsArray; //ex: ["t","h","e"," ","w","o","r","d"]
var mStringBlanksIndices = Array(); //ex: [0, 0, 1, 1, 0, 0, 0]
//mStringBlanksIndices would be rendered as  _ _ e   _ _ _ _
//spaces are always revealed

const GUESSES = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var guessed = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];

function reset_data(){//is called whenever a game restarts
    guessed = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
    mStringBlanksIndices = Array();
}

function generateBlanks(){//for game start
    for (var i = 0; i < mStringAsArray.length; i++){
        if (!GUESSES.includes(mStringAsArray[i])){
            mStringBlanksIndices[i] = 1;
        } else {
            mStringBlanksIndices[i] = 0;
        }
    }
    console.log("blanks generated:", mStringBlanksIndices);
}

function revealLetter(x){
    markGuessed(x);
    var result = false;
    for (var i = 0; i < mStringAsArray.length; i++){
        if (equalsIgnoringCase(mStringAsArray[i],x)){
            mStringBlanksIndices[i] = 1;
            result = true;
        }
    }
    console.log("new blanks:", mStringBlanksIndices);
    return result;
}

function markGuessed(x){
    guessed[GUESSES.indexOf(x)] = true;
}

function checkIfGuessed(x){
    return guessed[GUESSES.indexOf(x)];
}

function updateDisplay(){
    var result = "";
    for (var i = 0; i < mStringAsArray.length; i++){
        if (mStringBlanksIndices[i] == 1){
            result += mStringAsArray[i];
        } else {
            result += "_";
        }
    }
    document.getElementById("display-text").innerHTML=result;
}

