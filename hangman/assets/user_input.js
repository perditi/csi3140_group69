function str_input(){
    mysteryString = document.getElementById("input").value;
    console.log("mysteryString received \"%s\"",mysteryString);
    gameArray = Array.from(mysteryString);
}

function guess(str){
    if (length.str > 1){

    } else if (length.str == 1){

    } else {

    }
}

function equalsIgnoringCase(text, other) {
    return text.localeCompare(other, undefined, { sensitivity: 'base' }) === 0;
}