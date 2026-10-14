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



//use a two shared buttons for ship placements nad confirmations
//Extend displayPrivacy() conditional. Current conditional only needs to appear when players are attacking
//create an else if() statement that appears between players placing ships, as well.



//Change and update all texts/errors on screen during ship placement process
//ones to fix later:
//Player 1 clicking his own board says "its not your turn"
//make sure gameText and turnText reset properly after resetting/restarting game
//


// IMPORTANT FIX:::
//reset/restart game logic:
//Update it to fully reset all game logic:
//Re-enable placement buttons
//Reset isTransitioning
//set the activePlayer to player 1
//re-disable the startGameBtn


//placementStage starts as Player 1
//when Player 1 has confirmed their ships, it updates to Player 2
//when Player 2 confirms their ships, it updates to "complete"
//only allow "start game" to be pressed when placementStage = "complete"
//disable the "start game" button when the app first initializes (do in css)
//When placementStage = "complete", activate the start button.
//After the start button is pressed, re-deactivate it.
//when the reset button is pressed, reset placementStage = "player 1"
