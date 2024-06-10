var dice = [0, 0, 0, 0, 0]; //5 dice
var roll; //0, 1, 2, or 3

function reroll(n){
    if (n > 6 || n < 0){
        console.log("invalid input");
        return 0;
    }

    var temp = roll();
    dice[n] = temp;
    return temp;
}