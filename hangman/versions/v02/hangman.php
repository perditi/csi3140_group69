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

$db = new mysqli("127.0.0.1", "root", "password", "hangman", 3306);
$db->query("CREATE TABLE IF NOT EXISTS Leaderboard (EntryID int NOT NULL AUTO_INCREMENT PRIMARY KEY,Score int);");
$db->query("INSERT INTO Leaderboard (EntryID, Score)
            SELECT null, 0
            WHERE (SELECT COUNT(*) FROM Leaderboard) = 0;");
$db->close();

$_SESSION['streak'] = 0;
$_SESSION['leaderboard'];

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
    updateLeaderboard();
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
            'mStringBlanksIndices' => $_SESSION['mStringBlanksIndices'],
            'leaderboard' => $_SESSION['leaderboard']
        ];
        updateLeaderboard();
        break;
    case 'guess':
        if ($_SESSION['gameActive']) {
            $result = updateGame($request['guess']);
            $response = array_merge($result, [
                'gameActive' => $_SESSION['gameActive'],
                'hangmanState' => $_SESSION['hangmanState'],
                'mStringBlanksIndices' => $_SESSION['mStringBlanksIndices'],
                'leaderboard' => $_SESSION['leaderboard']
            ]);
            
            if ($_SESSION['hangmanState'] >= 6) {
                $_SESSION['gameActive'] = false;
                $response['gameOver'] = 'lose';


                
                $db = new mysqli("127.0.0.1", "root", "password", "hangman", 3306);
                $db->query("DELETE FROM Leaderboard WHERE Score = 0;");
                $db->query("INSERT INTO Leaderboard VALUE (null, 0)");

                

            } elseif (!in_array(0, $_SESSION['mStringBlanksIndices'])) {
                $_SESSION['gameActive'] = false;
                $response['gameOver'] = 'win';
                $_SESSION['streak']++; //streak gets added to :D
                $q = "WITH MaxID AS (
                            SELECT MAX(EntryID) AS id
                            FROM Leaderboard
                        )
                            UPDATE Leaderboard
                            JOIN MaxID ON Leaderboard.EntryID = MaxID.id
                            SET Score = Score + 1;
                        ";
                $db = new mysqli("127.0.0.1", "root", "password", "hangman", 3306);
                $db->query($q);
            }
        } else {
            $response['error'] = 'Game is not active';
        }
        break;
    case 'getState':
        $response = [
            'gameActive' => $_SESSION['gameActive'],
            'hangmanState' => $_SESSION['hangmanState'],
            'mStringBlanksIndices' => $_SESSION['mStringBlanksIndices'],
            'leaderboard' => $_SESSION['leaderboard']
        ];
        break;
    default:
        $response['error'] = 'Invalid action';
        break;
}

function updateLeaderboard(){
    $db = new mysqli("127.0.0.1", "root", "password", "hangman", 3306);
    $s = $db->query("SELECT * FROM Leaderboard ORDER BY Score DESC LIMIT 10;");

    $_SESSION['leaderboard'] = array();

    if ($s->num_rows > 0) {
        while($row = $s->fetch_assoc()) {
            $_SESSION['leaderboard'][] = $row['Score'];
        }
    }
}

echo json_encode($response);
?>