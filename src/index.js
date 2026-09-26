import "./styles.css";

//entry point file

// feature updates:
// make it so that when an attack successfully hits a ship, it remains that players move.
// make CPU targetting smarter by attacking adjacent tiles
// create ship drag-and-drop logic
// make the game 2-player possible
// add sound effects to the game (like for hitting a ship, explosion sound)



//------------ general --------------
//use fire emoji to signify successful hit
//use red X emoji to signify unsuccessful hit
//Style fully sunk ships a better way to make it obvious
//decide how to design boat for player
//enforce the fact that every player has to play all their ships!


import { createBoards, updateBoard } from "./render-board.js";
import GameController from "./game-controller.js";
import initApp from "./ui-controller.js";

initApp();
createBoards();





//IMMEDIATE TO-DO:
//4. Fix cpuBoard event listener (sometimes gets stuck on CPU move)
//6. disable placeShip() button when game is active (same as startBtn)


//CSS updating::
//gameOverModal and overlay logic
//style both placeship modal and gameover modal properly
//"grey-out" the startGameBtn by default and only make it clickable when the game is ready to be begun. Once the human has placed all of their ships, change the class on the button. Once the game is started, change the class back and revert it to it's "unclickable" state again


//add mandatory form validation for placing ships 
//(set limits on ship length, only allow coordinates from 0-9, etc)
//handle all the error messages correctly for form feedback. consider better ways to display!
//(REVISIT HANDLING ERRORS LESSON IF NEEDED)