# Hangman
## By Timothy Mao (300218237) & Meriem Mostefai (300255443)

see design system [here](docs/design_system.md)

intended for Assignment 2; CSI3140

### How the game works
Play with two players (you can play with one player if you want, but why would you do that?).

One player will pick a secret word or phrase and input it into the text box. The secret phrase will then appear on screen with all letters (a-z) omitted (special characters and spaces will remain).

The other player will then submit guesses in the text box. The guesser can guess individual letters (a-z), which will reveal all occurences of that letter in the secret phrase if correct. The guesser can also guess entire words or phrases, but no letters will be revealed if the guess is incorrect!

For every incorrect guess, one of eric's body parts is added to the gallows. When eric's entire body is completed (one head, one torso, two arms, two legs), the guesser immediately loses the game and the secret phrase is revealed.

In the event that the guesser discovers the secret phrase (either by individually guessing every letter, or by guessing the entire phrase), the guesser immediately wins and the game is over.

Restart the game by pressing the restart button.