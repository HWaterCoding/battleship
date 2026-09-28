import "./styles.css";

import { createBoards } from "./render-board.js";
import initApp from "./ui-controller.js";

initApp();
createBoards();



//IMMEDIATE TO-DO:
//1. disable placeShip() button when game is active (same as startBtn) (make it so while isGameActive === true, these cannot be clicked)
//2. Write protection on tile click listener so it has to be a tile
//3. fix getBoard() function to not be a shallow copy


//FEATURES TO IMPLEMENT:
// 1. make it so that when an attack successfully hits a ship, it remains that players move.
// 2. make CPU targetting smarter by attacking adjacent tiles
// 3. create ship drag-and-drop logic
// 4. make the game 2-player possible
// 5. add sound effects to the game (like for hitting a ship, explosion sound)


//CSS UPDATING:
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