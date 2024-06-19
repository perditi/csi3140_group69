var mStringAsArray; //ex: ["t","h","e"," ","w","o","r","d"]
var mStringBlanksIndices = Array(); //ex: [0, 0, 1, 1, 0, 0, 0]
//mStringBlanksIndices would be rendered as  _ _ e   _ _ _ _
//spaces are always revealed

var guesses = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var guessed= [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];

function generateBlanks(){//for game start
    for (var i = 0; i < mStringAsArray.length; i++){
        if (!guesses.includes(mStringAsArray[i])){
            mStringBlanksIndices[i] = 1;
        } else {
            mStringBlanksIndices[i] = 0;
        }
    }
    console.log("blanks generated:", mStringBlanksIndices);
}

function revealLetter(x){
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

function checkIfGuessed(x){
    var ind = -1;

}

function reset(){
    guesses = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    guessed = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
    mStringBlanksIndices = Array();
}