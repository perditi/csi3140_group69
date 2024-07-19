<?php 
/* You will expose the Yatzy game functionality through a JSON API, 
and update your JavaScript to make AJAX calls to your newly created API.
All game state should be stored on the PHP server (you can store that information 
in the PHP $_SESSION) and your HTML/CSS/JavaScript should focus on displaying the current 
state of the game (the JavaScript should NOT calculate scores or track progress, just display the current state).

You will track a game leaderboard showing your top 10 scores. For simplicity, this information 
can also be stored in the PHP $_SESSION. */

//gonna have this change so that there is a streak counter
//so it becomes a streak of correctly answered hangmen

session_start();
header('Content-Type: application/json');

$_SESSION['streak'] = 0;
$_SESSION['leaderboard'] = []; //so as to not reset every game

// json reading
$request = json_decode(file_get_contents('php://input'), true); //turns the info from the json into a php associative array

if (isset($request['action'])) {
    $action = $request['action']; // Line 19: 'action' key accessed here
} else {
    error_log("Action key not found in request");
    echo json_encode(['error' => 'Invalid request']);
    exit;
}

//$action = $request['action']; //eg; 'init' and 'guess'

//game state stuff
//the logic from the old js goes here essentially
function initializeGame($word) {
    $_SESSION['gameActive'] = true;
    $_SESSION['hangmanState'] = 0;
    $_SESSION['mysteryString'] = $word;
    $_SESSION['mStringAsArray'] = str_split($word);
    $_SESSION['guessed'] = array_fill(0, 26, false); //isn't this neat?
    $_SESSION['mStringBlanksIndices'] = array_map(function($char) {
        return ctype_alpha($char) ? 0 : 1;
    }, $_SESSION['mStringAsArray']);
}

function updateGame($guess) {
    $guess = strtolower($guess);
    if ($_SESSION['guessed'][ord($guess) - ord('a')] == true) {
        return ['error' => 'Repeated guess!'];
    }

    $correct = false;
    if (strlen($guess) > 1) {
        $correct = strcasecmp($_SESSION['mysteryString'], $guess) === 0;
        if ($correct) {
            $_SESSION['mStringBlanksIndices'] = array_fill(0, count($_SESSION['mStringAsArray']), 1);
        }
    } else {
        $_SESSION['guessed'][ord($guess) - ord('a')] = true;
        foreach ($_SESSION['mStringAsArray'] as $i => $char) {
            if (strcasecmp($char, $guess) === 0) {
                $_SESSION['mStringBlanksIndices'][$i] = 1;
                $correct = true;
            }
        }
    }

    if (!$correct) {
        $_SESSION['hangmanState']++;
    }

    return ['correct' => $correct];
}

//action handling

$response = [];

switch ($action) {
    case 'init':
        initializeGame($request['word']);
        $response = [
            'gameActive' => $_SESSION['gameActive'],
            'mStringBlanksIndices' => $_SESSION['mStringBlanksIndices']
        ];
        break;
    case 'guess':
        if ($_SESSION['gameActive']) {
            $result = updateGame($request['guess']);
            $response = array_merge($result, [
                'gameActive' => $_SESSION['gameActive'],
                'hangmanState' => $_SESSION['hangmanState'],
                'mStringBlanksIndices' => $_SESSION['mStringBlanksIndices']
            ]);
            if ($_SESSION['hangmanState'] >= 6) {
                $_SESSION['gameActive'] = false;
                $response['gameOver'] = 'lose';
                
                //leaderboard updates if a streak exists
                if($_SESSION['streak'] != 0){
                    
                    if(!isset($_SESSION['leaderboard'][0])){ //auto place if empty leaderboard
                        $_SESSION['leaderboard'][0] = $_SESSION['streak'];
                        break;
                    } else { //actually find its position
                        for($i=0; $i<10 ; $i++ ){
                            if ($_SESSION['leaderboard'][$i]<$_SESSION['streak']) {

                            }

                        }
                    }

                    $streakpos;
                    for($i = 0; $i < 10; $i++){
                        if ($_SESSION['streak'] > $_SESSION['leaderboard'][$i]){
                            $streakpos = $i;
                            break;
                        }
                    }
                    $temp = $_SESSION['leaderboard'][$streakpos];
                    $_SESSION['leaderboard'][$streakpos] = $_SESSION['streak'];
                    for ($i = $streakpos + 1; $i < 10; $i++){
                        $newtemp = $_SESSION['leaderboard'][$i];
                        $_SESSION['leaderboard'][$i] = $temp;
                        $temp = $newtemp;
                    }
                    

                }


                //streak reset :()
                $_SESSION['streak'] = 0; 

                

            } elseif (!in_array(0, $_SESSION['mStringBlanksIndices'])) {
                $_SESSION['gameActive'] = false;
                $response['gameOver'] = 'win';
                $_SESSION['streak']++; //streak gets added to :D
            }
        } else {
            $response['error'] = 'Game is not active';
        }
        break;
    case 'getState':
        $response = [
            'gameActive' => $_SESSION['gameActive'],
            'hangmanState' => $_SESSION['hangmanState'],
            'mStringBlanksIndices' => $_SESSION['mStringBlanksIndices']
        ];
        break;
    default:
        $response['error'] = 'Invalid action';
        break;
}

echo json_encode($response);


?>