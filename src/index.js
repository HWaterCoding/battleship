import "./styles.css";

import { createBoards } from "./render-board.js";
import initApp from "./ui-controller.js";

initApp();
createBoards();



// Small future updates:
//1. disable placeShip() button when game is active (same as startBtn) (make it so while isGameActive === true, these cannot be clicked)
//2. Write protection on tile click listener so it has to be a tile
//3. fix getBoard() function to not be a shallow copy


//FEATURES TO IMPLEMENT:
// 1. make it so that when an attack successfully hits a ship, it remains that players move.
// 3. create ship drag-and-drop logic




//CURRENT: Make the game 2-player possible
//THREE MAIN THINGS TO ADDRESS:
//1: Game mode selection (modal CPU vs 2-player mode)
//2: Game set up (Both players need to place their ships one at a time)
//3: Game flow (player1 attacks --> privacy --> player2 attacks --> privacy)

//1:
//load page with a modal open: "CPU" or "2-Player"
//have user choose between vs. CPU or 2-player mode.
//initialize a game based on which the option the user chose
//if 2 player is selected:

//2:
//player 1 places ships --> pass the screen to player 2
//player 2 places ships --> pass the screen to player 1

//3:
//player 1 attacks --> show result (5 sec) --> hide both boards / show tranisition screen
//player 2 clicks "ready" on transition screen
//player 2 attacks --> show result (5 sec) --> hide both boards / show tranisition screen
//repeat...




//CSS UPDATING:
//Add a volume icon button to the header that allows people to toggle sfx
//Add winner/loser screen once game ends
//gameOverModal and overlay logic
//style both placeship modal and gameover modal properly
//"grey-out" the startGameBtn by default and only make it clickable when the game is ready to be begun. Once the human has placed all of their ships, change the class on the button. Once the game is started, change the class back and revert it to it's "unclickable" state again

//use fire emoji to signify successful hit
//use red X emoji to signify unsuccessful hit
//Style fully sunk ships a better way to make it obvious
//decide how to design boat for player


//OTHER:
//add mandatory form validation for placing ships 
//(set limits on ship length, only allow coordinates from 0-9, etc)
//handle all the error messages correctly for form feedback. consider better ways to display!
//(REVISIT HANDLING ERRORS LESSON IF NEEDED)