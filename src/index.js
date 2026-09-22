import "./styles.css";

//entry point file

//------------ general --------------
//use fire emoji to signify successful hit
//use red X emoji to signify unsuccessful hit
//NEED AN ADDITIONAL CLASS FOR WHEN A SHIP IS FULLY SUNK
//decide how to design boat for player
//enforce the fact that every player has to play all their ships!


import { createBoards, updateBoard } from "./render-board.js";
import GameController from "./game-controller.js";
import initApp from "./ui-controller.js";

initApp();
createBoards();

// const controller = new GameController("John");
// const players = controller.players;
// console.log(players);

// const p1board = document.getElementById("leftPlayerBoard");
// const p2board = document.getElementById("rightPlayerBoard");

// const myShip = players[0].board.ships[3];
// players[0].board.placeShip(0, 0, "right", myShip);

// const yourShip = players[1].board.ships[2];
// players[1].board.placeShip(0, 0, "up", yourShip);

// updateBoard(players[0], p1board, true);
// updateBoard(players[1], p2board, false);

// controller.playTurn(0, 0); //p1 attacks p2
// controller.playTurn(0, 1);
// controller.playTurn(2, 0); //p1 attacks p2
// controller.playTurn(0, 3);
// controller.playTurn(1, 0); //p1 attacks p2
// controller.playTurn(5, 3);
// controller.playTurn(3, 0); //p1 attacks p2


// updateBoard(players[0], p1board, true);
// updateBoard(players[1], p2board, false);

// console.log(controller.players[0].board.board);
// console.log(controller.players[1].board.board);



//IMMEDIATE TO-DO:
//1. ask if all human ships are placed in startGameBtn event
//2. change players.board to players.gameboard for clarity: replace everywhere
//3. update all text elements properly like turnText and gameText
//4. Fix cpuBoard event listener
//5. Add cool-down to cpuBoard event listener. Prevent numerous clicks. 
//enforce game over and add conditionals to control turn-based flow
//6. disable placeShip() button when game is active (same as startBtn)


//CSS updating::
//gameOverModal and overlay logic
//style both placeship modal and gameover modal properly
//"grey-out" the startGameBtn by default and only make it clickable when the game is ready to be begun. Once the human has placed all of their ships, change the class on the button. Once the game is started, change the class back and revert it to it's "unclickable" state again


//add mandatory form validation for placing ships 
//(set limits on ship length, only allow coordinates from 0-9, etc)
//handle all the error messages correctly for form feedback. consider better ways to display!
//(REVISIT HANDLING ERRORS LESSON IF NEEDED)